'use client';

import React, { useState } from 'react';

// === EL CATÁLOGO DE MAGNOLIA (Conectado a tu Matrix Blob) ===
const CATALOGO = [
  { id: 1, nombre: 'Set Triángulo - Pistacchio', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_pistacho.png' },
  { id: 2, nombre: 'Set Triángulo - Negro', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/bikini_dos_piezas_negro.png' },
  { id: 3, nombre: 'Set Coco+ - Café', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_cafe_dos_piezas.png' },
  { id: 4, nombre: 'Set Coco+ - Negro', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_completo_dos_piezas.png' },
  { id: 5, nombre: 'Completo 90 - Café', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_cafe.png' },
  { id: 6, nombre: 'Completo 90 - Lila', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_lila.png' },
  { id: 7, nombre: 'Completo 90 - Negro', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_completo_negro.png' },
  { id: 8, nombre: 'Edición Especial - Rojo', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_rojo.png' },
];

export default function MagnoliaBoutique() {
  // ESTADOS DEL ESPEJO MÁGICO
  const [fotoUsuarioUrl, setFotoUsuarioUrl] = useState<string | null>(null); 
  const [prendaSeleccionada, setPrendaSeleccionada] = useState<any | null>(null);
  const [estaProcesando, setEstaProcesando] = useState(false);
  const [estaSubiendoFoto, setEstaSubiendoFoto] = useState(false); 
  const [resultadoTryOnUrl, setResultadoTryOnUrl] = useState<string | null>(null);
  const [errorTryOn, setErrorTryOn] = useState<string | null>(null);

  // --- 👇 MOTOR DE CONEXIÓN A VIOS CODE 👇 ---
  const ejecutarPruebaVirtual = async () => {
    if (!fotoUsuarioUrl || !prendaSeleccionada) {
      setErrorTryOn('Falta tu foto o la prenda.');
      return;
    }
    setEstaProcesando(true);
    setErrorTryOn(null);
    setResultadoTryOnUrl(null);

    try {
      const URL_API_VIOS_CODE = 'https://vios-code.vercel.app/api/youcam-tryon'; 

      const response = await fetch(URL_API_VIOS_CODE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          src_file_url: fotoUsuarioUrl,       
          ref_file_url: prendaSeleccionada.url, 
          tipoPrenda: 'cloth'               
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error de conexión.');

      const taskId = data.data?.task_id;
      if (!taskId) throw new Error('Error al generar el ticket.');

      let terminado = false;
      let intentos = 0;

      while (!terminado && intentos < 20) { 
        await new Promise(res => setTimeout(res, 2000)); 
        const pollRes = await fetch(`${URL_API_VIOS_CODE}?taskId=${taskId}`);
        const pollData = await pollRes.json();
        
        if (pollData.data?.task_status === 'done' || pollData.data?.task_status === 'success') {
          terminado = true;
          setResultadoTryOnUrl(pollData.data?.results?.url);
          break;
        } else if (pollData.data?.task_status === 'failed') {
          throw new Error('La IA no pudo procesar esta foto.');
        }
        intentos++;
      }
      if (!terminado) throw new Error('Tiempo de espera agotado.');
    } catch (err: any) {
      setErrorTryOn(err.message);
    } finally {
      setEstaProcesando(false);
    }
  };

  // --- 👇 MOTOR DE SUBIDA A BLOB 👇 ---
  const manejarSubidaFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setErrorTryOn(null);
      setEstaSubiendoFoto(true); 
      setFotoUsuarioUrl(null); 
      try {
        const response = await fetch(`/api/upload?filename=${file.name}`, {
          method: 'POST',
          body: file,
        });
        const blob = await response.json();
        if (!response.ok) throw new Error('Error en Vercel Blob');
        setFotoUsuarioUrl(blob.url); 
      } catch (err: any) {
        setErrorTryOn('Error al subir tu selfie. Intenta de nuevo.');
      } finally {
        setEstaSubiendoFoto(false); 
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F8F6] text-[#333] font-serif selection:bg-[#E2D5C5]">
      
      {/* HEADER MINIMALISTA */}
      <header className="w-full py-10 px-8 flex flex-col items-center border-b border-[#E2D5C5]">
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.3em] uppercase mb-3">Magnolia</h1>
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-400">Swimwear / Moda Atemporal</p>
      </header>

      {/* HISTORIA DE LA MARCA */}
      <section className="max-w-3xl mx-auto text-center py-16 px-8">
        <p className="text-base md:text-lg leading-loose text-gray-500 italic font-light">
          "Creemos en el consumo consciente y responsable. Cada prenda se fabrica en pocas cantidades, reutilizando sobrantes de tela de grandes marcas, cerrando así el ciclo de producción sin generar desperdicios."
        </p>
      </section>

      {/* CATÁLOGO GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {CATALOGO.map((item) => (
          <div key={item.id} className="group cursor-pointer flex flex-col items-center" onClick={() => setPrendaSeleccionada(item)}>
            <div className="w-full aspect-[3/4] overflow-hidden bg-[#f0eee9] rounded-xl mb-5 shadow-sm relative">
              <img src={item.url} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out p-4"/>
              
              {/* CAPA HOVER PARA PROBAR */}
              <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="bg-white/90 text-black px-6 py-3 text-[10px] uppercase tracking-widest rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  Probar Prenda ✨
                </span>
              </div>
            </div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-gray-600 text-center px-4 leading-relaxed">{item.nombre}</h3>
          </div>
        ))}
      </section>

      {/* --- EL ESPEJO MÁGICO (MODAL) --- */}
      {prendaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
          
          <div className="bg-white w-full max-w-sm md:max-w-md p-8 md:p-10 rounded-3xl shadow-2xl relative flex flex-col items-center">
            
            {/* BOTÓN CERRAR */}
            <button 
              onClick={() => {setPrendaSeleccionada(null); setResultadoTryOnUrl(null); setFotoUsuarioUrl(null); setErrorTryOn(null);}} 
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-400 hover:text-black hover:bg-gray-200 transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-lg md:text-xl uppercase tracking-[0.3em] mb-1 mt-2 font-light">Probador Virtual</h2>
            <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-8">Powered by ViOs Code Matrix</p>

            {/* VISTA 1: SUBIR FOTO Y PROBAR */}
            {!resultadoTryOnUrl ? (
              <>
                <div className="w-32 h-40 bg-[#f0eee9] rounded-xl mb-8 p-2 shadow-inner">
                  <img src={prendaSeleccionada.url} alt="Prenda" className="w-full h-full object-cover rounded-lg"/>
                </div>
                
                <div className="w-full mb-8">
                  <label className="block text-[10px] text-gray-500 tracking-widest uppercase mb-3 text-center font-semibold">1. Sube tu foto de cuerpo completo</label>
                  
                  {estaSubiendoFoto ? (
                    <div className="w-full p-4 bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400 text-center animate-pulse border border-gray-100 rounded-2xl">
                      Cargando al casillero...
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <input type="file" accept="image/*" onChange={manejarSubidaFoto} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                      <div className={`w-full p-4 border border-dashed rounded-2xl text-[10px] uppercase tracking-widest text-center transition-colors ${fotoUsuarioUrl ? 'border-green-300 bg-green-50 text-green-700' : 'border-[#E2D5C5] bg-[#F9F8F6] text-gray-500 hover:bg-[#f2efe9]'}`}>
                        {fotoUsuarioUrl ? '✅ Selfie Guardada' : '📸 Seleccionar Archivo'}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <label className="block text-[10px] text-gray-500 tracking-widest uppercase mb-3 text-center font-semibold">2. Generar Magia</label>
                  <button 
                    onClick={ejecutarPruebaVirtual} 
                    disabled={estaProcesando || estaSubiendoFoto || !fotoUsuarioUrl} 
                    className={`w-full py-4 rounded-2xl text-[10px] tracking-[0.2em] font-bold uppercase transition-all flex items-center justify-center ${estaProcesando ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#2A2A2A] text-white hover:bg-black shadow-lg hover:shadow-xl hover:-translate-y-1'}`}
                  >
                    {estaProcesando ? 'Procesando (Aprox 20s)...' : 'PROBARME ESTA PIEZA'}
                  </button>
                </div>

                {errorTryOn && <p className="text-red-500 text-[10px] mt-4 text-center uppercase tracking-widest">{errorTryOn}</p>}
              </>
            ) : (
              // VISTA 2: RESULTADO FINAL
              <div className="flex flex-col items-center w-full animate-in zoom-in-95 duration-500">
                <div className="relative w-full max-h-[50vh] flex justify-center bg-gray-50 rounded-2xl p-2 mb-6 border border-gray-100">
                  <img src={resultadoTryOnUrl} alt="Resultado Magnolia" className="max-w-full max-h-[50vh] object-contain rounded-xl shadow-sm"/>
                </div>
                
                <div className="flex gap-4 w-full">
                  <button onClick={() => setResultadoTryOnUrl(null)} className="flex-1 py-4 bg-[#F9F8F6] text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-200 transition-colors">
                    Reintentar
                  </button>
                  <a href={resultadoTryOnUrl} download="Magnolia_TryOn.jpg" target="_blank" rel="noreferrer" className="flex-1 py-4 bg-[#2A2A2A] text-white text-[10px] font-bold text-center uppercase tracking-[0.2em] rounded-2xl hover:bg-black transition-colors shadow-lg">
                    Descargar
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </main>
  );
} 