import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || 'foto.jpg';

  if (!request.body) {
    return NextResponse.json({ error: 'No hay imagen' }, { status: 400 });
  }

  try {
    // Usamos una carpeta genérica "tryon_uploads" para Magnolia y Mulata
    const blob = await put(`tryon_uploads/${filename}`, request.body, {
      access: 'public',
      multipart: true, // 🔥 LA CURA DEFINITIVA PARA EL ERROR 500 CON IMÁGENES PESADAS
      allowOverwrite: true,
    });

    return NextResponse.json(blob);
  } catch (error: any) {
    console.error("Error en Vercel Blob:", error);
    return NextResponse.json({ error: 'Error al subir al casillero' }, { status: 500 });
  }
}