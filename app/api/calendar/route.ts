import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN DE SUPABASE ---
// Usamos las variables que ya tienes en tu .env.local / Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- CONFIGURACIÓN DE GOOGLE CALENDAR ---
const getPrivateKey = () => {
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!key) return undefined;
  return key.replace(/\\n/g, '\n');
};

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: getPrivateKey(),
  },
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

const getCalendarId = (artistaId: string) => {
  const ids: Record<string, string | undefined> = {
    chuloski: process.env.CALENDAR_ID_CHULOSKI,
    // rafa: process.env.CALENDAR_ID_RAFA,
    // prana: process.env.CALENDAR_ID_PRANA,
    // nai: process.env.CALENDAR_ID_NAI,
    // boris: process.env.CALENDAR_ID_BORIS,
  };
  return ids[artistaId];
};

// -------------------------------------------------------------
// GET: Buscar los días que el artista ya tiene ocupados
// -------------------------------------------------------------
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artistaId = searchParams.get('artistaId');
  const timeMin = searchParams.get('timeMin'); 
  const timeMax = searchParams.get('timeMax'); 

  if (!artistaId || !timeMin || !timeMax) {
    return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
  }

  const calendarId = getCalendarId(artistaId);
  if (!calendarId) return NextResponse.json({ fechasOcupadas: [] }); 

  try {
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: timeMin,
      timeMax: timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const eventos = response.data.items || [];
    const fechasOcupadas = eventos.map(evento => evento.start?.dateTime || evento.start?.date);

    return NextResponse.json({ fechasOcupadas });
  } catch (error) {
    console.error("Error al consultar Google Calendar:", error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// -------------------------------------------------------------
// POST: Crear la reserva (Calendar) + Guardar reporte (Supabase) + ManyChat
// -------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      artistaId, nombreArtista, nombreCliente, telefonoCliente, 
      titulo, descripcion, inicioIso, finIso, costoTotal, anticipo 
    } = body;

    const calendarId = getCalendarId(artistaId);
    if (!calendarId) return NextResponse.json({ error: 'Calendario no encontrado' }, { status: 404 });

    // 1. CREAR EVENTO EN GOOGLE CALENDAR
    const event = {
      summary: titulo,
      description: descripcion,
      start: { dateTime: inicioIso, timeZone: 'America/Cancun' },
      end: { dateTime: finIso, timeZone: 'America/Cancun' },
      colorId: '5', // Color amarillo
    };

    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
    });

    const googleEventId = response.data.id;

    // 2. GUARDAR REPORTE EN SUPABASE PARA TU PANEL DE ADMINISTRADOR
    const comisionEstudio = anticipo; // En este ejemplo, el estudio se queda el 20% (el anticipo)
    const faltaPorPagar = costoTotal - anticipo;

    const { error: dbError } = await supabase
      .from('reservas_loyaltink')
      .insert([
        {
          cliente_nombre: nombreCliente,
          cliente_whatsapp: telefonoCliente,
          artista: nombreArtista,
          fecha_cita: inicioIso,
          costo_total: costoTotal,
          anticipo_pagado: anticipo,
          falta_por_pagar: faltaPorPagar,
          comision_estudio: comisionEstudio,
          google_event_id: googleEventId
        }
      ]);

    if (dbError) {
      console.error("Error guardando en Supabase:", dbError);
      // No rompemos el flujo si Supabase falla, lo importante es que Calendar ya guardó la cita
    }

    // 3. ENVIAR WHATSAPP AUTOMÁTICO VÍA MANYCHAT
    // ⚠️ Descomentar cuando generes tu Token en Configuración > API de ManyChat y lo pongas en Vercel
    /*
    const MANYCHAT_TOKEN = process.env.MANYCHAT_API_TOKEN;
    
    if (MANYCHAT_TOKEN) {
      await fetch('https://api.manychat.com/wa/messages/sendTemplate', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${MANYCHAT_TOKEN}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          phone: telefonoCliente, // El número que el cliente ingresó
          template_name: "reserva_loyaltink", // El nombre de la plantilla aprobada en ManyChat
          language: "es_MX",
          parameters: [
            { type: "text", text: nombreCliente },
            { type: "text", text: nombreArtista },
            { type: "text", text: anticipo.toString() }
          ]
        })
      });
    }
    */

    return NextResponse.json({ success: true, eventId: googleEventId });
  } catch (error) {
    console.error("Error en el POST del calendario:", error);
    return NextResponse.json({ error: 'Error al crear la reserva' }, { status: 500 });
  }
}