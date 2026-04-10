import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// 1. Inicializamos Stripe (Tu Bóveda Maestra de ViOs Code)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Novedad: Recibimos 'negocioSlug' desde el botón de pago del cliente
    // Ej: Si compran en Magnolia, negocioSlug = 'magnolia'
    const { amount, serviceName, proveedor, negocioSlug } = body; 

    // URLs dinámicas: El sistema sabe a qué carpeta regresar al usuario
    const urlExito = `${process.env.NEXT_PUBLIC_SITE_URL}/${negocioSlug}/reserva/exito`;
    const urlCancelado = `${process.env.NEXT_PUBLIC_SITE_URL}/${negocioSlug}/reserva`;

    // --- RUTA A: STRIPE ---
    if (proveedor === 'stripe') {
      console.log(`Cobro Stripe | Negocio: ${negocioSlug} | Monto: $${amount}`);
      
      // PRÓXIMO PASO PARA TU GOD MODE:
      // Aquí harás un await supabase.from('negocios').select('stripe_account_id, comision').eq('slug', negocioSlug)
      
      // Por ahora, usamos variables de prueba
      const comisionPorcentaje = 0; 
      const feeDeViosCode = Math.round((amount * 100) * comisionPorcentaje);
      const destinoStripeAccountId = "acct_1XXXXXXXXXXXXX"; // Esto vendrá de tu DB después

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
        success_url: urlExito,
        cancel_url: urlCancelado,
      });

      return NextResponse.json({ url: session.url });
    }

    // --- RUTA B: MERCADO PAGO ---
    if (proveedor === 'mercadopago') {
      console.log(`Cobro MercadoPago | Negocio: ${negocioSlug} | Monto: $${amount}`);
      
      // PRÓXIMO PASO PARA TU GOD MODE:
      // Aquí sacarás el mp_access_token de la base de datos según el negocioSlug
      const tokenDelNegocio = process.env.MP_ACCESS_TOKEN || 'APP_USR-llave-prueba';
      
      const mpClient = new MercadoPagoConfig({ accessToken: tokenDelNegocio });
      const preference = new Preference(mpClient);
      
      const result = await preference.create({
        body: {
          items: [
            {
              id: 'anticipo',
              title: serviceName,
              quantity: 1,
              unit_price: amount 
            }
          ],
          back_urls: {
            success: urlExito,
            failure: urlCancelado,
            pending: urlCancelado,
          },
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