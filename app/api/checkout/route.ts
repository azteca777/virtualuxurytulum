import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// 1. Inicializamos la conexión a tu bóveda
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any, // Mantenemos tu truco para silenciar a TypeScript
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, serviceName } = body; 
    // amount debe venir en centavos. Ej: $1000 pesos = 100000

    console.log(`Iniciando cobro por: ${serviceName} - $${amount / 100}`);

    // --- LA MAGIA DEL SPLIT (PREPARADA PARA EL FUTURO) ---
    
    // 1. Aquí defines tu comisión. Hoy es 0, mañana puede ser 0.10 (10%)
    const comisionPorcentaje = 0; 
    const feeDeViosCode = Math.round(amount * comisionPorcentaje);

    // 2. Este ID te lo dará Stripe cuando Loyaltink se registre con tu link
    // Por ahora lo dejamos como una variable lista para usarse
    const loyaltinkStripeAccountId = "acct_1XXXXXXXXXXXXX"; 

    // 3. Creamos la ventana de pago (Checkout Session)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: serviceName, // Ej: "Anticipo Tatuaje - Loyaltink"
            },
            unit_amount: amount, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        // Aquí le decimos a Stripe cuánto dinero es para ti (HOY ES CERO)
        application_fee_amount: feeDeViosCode, 
        // Y aquí le decimos a qué cuenta mandar el resto del dinero
        transfer_data: {
          destination: loyaltinkStripeAccountId,
        },
      },
      // A dónde mandamos al cliente después de pagar
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/loyaltink/reserva/exito`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/loyaltink/reserva`,
    });

    // Le devolvemos el link de pago al Frontend para que abra la ventana
    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("Error en el pago:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}