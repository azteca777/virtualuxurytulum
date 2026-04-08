'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// 🛡️ Conexión a tu Bóveda Central
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SensorTrafico({ marca }: { marca: string }) {
  const registrado = useRef(false);

  useEffect(() => {
    // Evita que el radar cuente doble cuando estás programando (React Strict Mode)
    if (registrado.current) return; 
    registrado.current = true;

    async function registrarVisita() {
      // Manda el "ping" silencioso a tu tabla en Supabase
      await supabase.from('trafico_diario').insert([{ tienda_id: marca }]);
    }
    
    registrarVisita();
  }, [marca]);

  return null; // 🥷 100% Invisible en la pantalla
}