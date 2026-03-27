import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || 'selfie.jpg';

  if (!request.body) {
    return NextResponse.json({ error: 'No hay imagen' }, { status: 400 });
  }

  try {
    const blob = await put(`selfies_tulum/${filename}`, request.body, {
      access: 'public',
      allowOverwrite: true, // 🔓 ¡LA CURA PARA EL ERROR 500 DE VERCEL BLOB!
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al subir al casillero' }, { status: 500 });
  }
}