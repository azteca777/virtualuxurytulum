import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

// 🛡️ 1. CONECTAMOS VIRTUAL LUXURY A TU MATRIZ (SUPABASE)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Ojo: necesitas esta llave en el .env de virtualuxurytulum
const supabase = createClient(supabaseUrl, supabaseKey);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Recibimos los datos del carrito de la boutique/tatuador
    const { amount, serviceName, proveedor, negocioSlug, carrito } = body; 

    const urlExito = `${process.env.NEXT_PUBLIC_SITE_URL}/${negocioSlug}/reserva/exito`;
    const urlCancelado = `${process.env.NEXT_PUBLIC_SITE_URL}/${negocioSlug}/reserva`;

    // 📡 2. REPORTAMOS AL GOD MODE (INTENTO DE COMPRA)
    // Calculamos tu comisión (ej. 10%)
    const comisionCalculada = amount * 0.10; 

    const { data: registroVenta, error: supabaseError } = await supabase
      .from('ventas')
      .insert([
        {
          tienda_id: negocioSlug.toUpperCase(), // Ej: 'MAGNOLIA'
          total: amount,
          metodo_pago: proveedor,
          comision_vios: comisionCalculada,
          estado: 'intento_de_pago', 
          carrito: carrito || [{ nombre: serviceName, precio: amount, cantidad: 1 }] // Guardamos qué querían comprar
        }
      ])
      .select()
      .single();

    if (supabaseError) {
      console.error("Error reportando al God Mode:", supabaseError);
    }

    // --- RUTA A: STRIPE (SPLIT PAYMENTS) ---
    if (proveedor === 'stripe') {
      console.log(`Cobro Stripe | Negocio: ${negocioSlug} | Monto: $${amount}`);
      
      const feeDeViosCode = Math.round(comisionCalculada * 100); // Centavos
      const destinoStripeAccountId = "acct_1XXXXXXXXXXXXX"; // ID de Stripe del negocio

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: { currency: 'mxn', product_data: { name: serviceName }, unit_amount: amount * 100 },
            quantity: 1,
        }],
        mode: 'payment',
        payment_intent_data: {
          application_fee_amount: feeDeViosCode, 
          transfer_data: { destination: destinoStripeAccountId },
        },
        client_reference_id: registroVenta?.id, // Le pasamos a Stripe el ID de la base de datos
        success_url: urlExito,
        cancel_url: urlCancelado,
      });

      return NextResponse.json({ url: session.url });
    }

    // --- RUTA B: MERCADO PAGO ---
    if (proveedor === 'mercadopago') {
      console.log(`Cobro MercadoPago | Negocio: ${negocioSlug} | Monto: $${amount}`);
      
      const tokenDelNegocio = process.env.MP_ACCESS_TOKEN || 'APP_USR-llave-prueba';
      const mpClient = new MercadoPagoConfig({ accessToken: tokenDelNegocio });
      const preference = new Preference(mpClient);
      
      const result = await preference.create({
        body: {
          items: [{ id: 'anticipo', title: serviceName, quantity: 1, unit_price: amount }],
          external_reference: registroVenta?.id, // Le pasamos a Mercado Pago el ID de la base de datos
          back_urls: { success: urlExito, failure: urlCancelado, pending: urlCancelado },
          auto_return: 'approved',
        }
      });

      return NextResponse.json({ url: result.init_point });
    }

    return NextResponse.json({ error: "Proveedor de pago no válido" }, { status: 400 });

  } catch (error: any) {
    console.error("Error en el pago:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}