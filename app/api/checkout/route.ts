import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// 1. Inicializamos la conexión a tu bóveda usando la llave secreta blindada
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any, // Versión estable de la API
});

export async function POST(request: Request) {
  try {
    // 2. Aquí recibimos lo que el cliente quiere pagar (ej. Anticipo de $1000)
    const body = await request.json();
    const { amount, serviceName } = body;

    console.log(`Iniciando cobro por: ${serviceName} - $${amount}`);

    // 3. (PRÓXIMO PASO) Aquí crearemos la "Sesión de Checkout"
    // Es donde le diremos a Stripe: Cóbrale $1000, mándale el 90% a Loyaltink y deja mi 10% en ViOs Code.

    return NextResponse.json({ success: true, message: "Motor de pagos inicializado correctamente" });

  } catch (error: any) {
    console.error("Error en el pago:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}