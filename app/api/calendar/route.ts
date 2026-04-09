import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Función para leer la clave privada arreglando los saltos de línea
const getPrivateKey = () => {
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!key) return undefined;
  return key.replace(/\\n/g, '\n');
};

// Configuración de nuestro Bot (Cuenta de Servicio)
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: getPrivateKey(),
  },
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

// Vinculamos a cada artista con su correo real de Google Calendar
const getCalendarId = (artistaId: string) => {
  const ids: Record<string, string | undefined> = {
    chuloski: process.env.CALENDAR_ID_CHULOSKI,
    // Cuando los demás artistas te pasen sus correos, los agregas en tu .env.local y los descomentas aquí:
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
  if (!calendarId) return NextResponse.json({ fechasOcupadas: [] }); // Si no hay calendario, asume que está libre

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
// POST: Crear la reserva en el calendario (Después de pagar)
// -------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { artistaId, titulo, descripcion, inicioIso, finIso } = body;

    const calendarId = getCalendarId(artistaId);
    if (!calendarId) return NextResponse.json({ error: 'Calendario no encontrado' }, { status: 404 });

    const event = {
      summary: titulo,
      description: descripcion,
      start: { dateTime: inicioIso, timeZone: 'America/Cancun' }, // Ajustado a horario de Tulum/Cancún
      end: { dateTime: finIso, timeZone: 'America/Cancun' },
      colorId: '5', // Color amarillo en Google Calendar para destacar las citas de la web
    };

    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
    });

    return NextResponse.json({ success: true, eventId: response.data.id });
  } catch (error) {
    console.error("Error al crear evento:", error);
    return NextResponse.json({ error: 'Error al crear la reserva' }, { status: 500 });
  }
}