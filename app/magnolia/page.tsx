'use client';

import React, { useState } from 'react';

// === EL CATÁLOGO DE MAGNOLIA (Bilingüe) ===
const CATALOGO = [
  { id: 1, nombreEs: 'Set Triángulo - Pistacchio', nombreEn: 'Triangle Set - Pistacchio', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_pistacho.png' },
  { id: 2, nombreEs: 'Set Triángulo - Negro', nombreEn: 'Triangle Set - Black', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/bikini_dos_piezas_negro.png' },
  { id: 3, nombreEs: 'Set Coco+ - Café', nombreEn: 'Coco+ Set - Brown', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_cafe_dos_piezas.png' },
  { id: 4, nombreEs: 'Set Coco+ - Negro', nombreEn: 'Coco+ Set - Black', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_completo_dos_piezas.png' },
  { id: 5, nombreEs: 'Completo 90 - Café', nombreEn: 'One Piece 90 - Brown', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_cafe.png' },
  { id: 6, nombreEs: 'Completo 90 - Lila', nombreEn: 'One Piece 90 - Lilac', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_lila.png' },
  { id: 7, nombreEs: 'Completo 90 - Negro', nombreEn: 'One Piece 90 - Black', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_completo_negro.png' },
  { id: 8, nombreEs: 'Edición Especial - Rojo', nombreEn: 'Special Edition - Red', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje_rojo.png' },
];

// === DICCIONARIO DE IDIOMAS ===
const TEXTOS = {
  es: {
    volver: "← Volver a la Calle",
    subtitulo: "Swimwear / Moda Atemporal",
    historia: '"Creemos en el consumo consciente y responsable. Cada prenda se fabrica en pocas cantidades, reutilizando sobrantes de tela de grandes marcas, cerrando así el ciclo de producción sin generar desperdicios."',
    probarBtn: "Probar Prenda ✨",
    probadorTitulo: "Probador Virtual",
    paso1: "1. Sube tu foto de cuerpo completo",
    cargandoFoto: "Cargando al casillero...",
    fotoGuardada: "✅ Selfie Guardada",
    seleccionarArchivo: "📸 Seleccionar Archivo",
    paso2: "2. Generar Magia",
    procesando: "Procesando (Aprox 20s)...",
    probarEstaPieza: "PROBARME ESTA PIEZA",
    pedirInfo: "Pedir Información",
    reintentar: "Reintentar",
    descargar: "Descargar",
    waMensaje: "Hola! Me probé el modelo *[PRENDA]* en tu probador virtual. %0A%0AMira cómo me queda: [URL]%0A%0A¡Quiero más información!"
  },
  en: {
    volver: "← Back to Street",
    subtitulo: "Swimwear / Timeless Fashion",
    historia: '"We believe in conscious and responsible consumption. Each garment is manufactured in small quantities, reusing fabric scraps from major brands, thus closing the production cycle without generating waste."',
    probarBtn: "Try On ✨",
    probadorTitulo: "Virtual Fitting Room",
    paso1: "1. Upload your full-body photo",
    cargandoFoto: "Uploading to locker...",
    fotoGuardada: "✅ Selfie Saved",
    seleccionarArchivo: "📸 Select File",
    paso2: "2. Generate Magic",
    procesando: "Processing (Approx 20s)...",
    probarEstaPieza: "TRY ON THIS PIECE",
    pedirInfo: "Request Information",
    reintentar: "Retry",
    descargar: "Download",
    waMensaje: "Hi! I tried on the *[PRENDA]* model in your virtual fitting room. %0A%0ALook how it fits me: [URL]%0A%0AI would like more information!"
  }
};

export default function MagnoliaBoutique() {
  // ESTADO DE IDIOMA
  const [idioma, setIdioma] = useState<'es' | 'en'>('es');
  const t = TEXTOS[idioma];

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
      setErrorTryOn(idioma === 'es' ? 'Falta tu foto o la prenda.' : 'Missing photo or garment.');
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
        body: JSON.stringify({ src_file_url: fotoUsuarioUrl, ref_file_url: prendaSeleccionada.url, tipoPrenda: 'cloth' }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error.');

      const taskId = data.data?.task_id;
      if (!taskId) throw new Error('Error.');

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
          throw new Error(idioma === 'es' ? 'La IA no pudo procesar esta foto.' : 'AI could not process this photo.');
        }
        intentos++;
      }
      if (!terminado) throw new Error(idioma === 'es' ? 'Tiempo de espera agotado.' : 'Timeout reached.');
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
        const response = await fetch(`/api/upload?filename=${file.name}`, { method: 'POST', body: file });
        const blob = await response.json();
        if (!response.ok) throw new Error('Error Blob');
        setFotoUsuarioUrl(blob.url); 
      } catch (err: any) {
        setErrorTryOn(idioma === 'es' ? 'Error al subir foto.' : 'Error uploading photo.');
      } finally {
        setEstaSubiendoFoto(false); 
      }
    }
  };

  // --- 👇 GENERADOR DE LINK WHATSAPP 👇 ---
  const generarLinkWhatsApp = () => {
    if (!prendaSeleccionada || !resultadoTryOnUrl) return "#";
    const nombrePrenda = idioma === 'es' ? prendaSeleccionada.nombreEs : prendaSeleccionada.nombreEn;
    const urlFoto = encodeURIComponent(resultadoTryOnUrl);
    
    // REEMPLAZA EL NÚMERO AQUÍ
    const numeroWhatsApp = "521XXXXXXXXXX"; 
    
    let mensaje = t.waMensaje.replace('[PRENDA]', nombrePrenda).replace('[URL]', urlFoto);
    return `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  };

  return (
    <main className="min-h-screen bg-[#F9F8F6] text-[#333] font-serif selection:bg-[#E2D5C5]">
      
      {/* HEADER MINIMALISTA Y LOGOTIPO */}
      <header className="relative w-full py-10 px-8 flex flex-col items-center border-b border-[#E2D5C5]">
        
        {/* BOTÓN DE REGRESO */}
        <button onClick={() => window.location.href = '/boutiques'} className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-gray-400 hover:text-[#2A2A2A] text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
          {t.volver}
        </button>

        {/* SELECTOR DE IDIOMA */}
        <button onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')} className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 border border-[#E2D5C5] px-4 py-2 rounded-full text-gray-500 hover:bg-[#E2D5C5] hover:text-black text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-all">
          {idioma === 'es' ? '🇺🇸 EN' : '🇲🇽 ES'}
        </button>

        {/* LOGOTIPO */}
        <img src="/magnolia.jpeg" alt="Magnolia Swimwear" className="h-16 md:h-20 object-contain mb-3 mix-blend-multiply" />
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-400 text-center">{t.subtitulo}</p>
      </header>

      {/* HISTORIA DE LA MARCA */}
      <section className="max-w-3xl mx-auto text-center py-16 px-8">
        <p className="text-base md:text-lg leading-loose text-gray-500 italic font-light">{t.historia}</p>
      </section>

      {/* CATÁLOGO GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {CATALOGO.map((item) => (
          <div key={item.id} className="group cursor-pointer flex flex-col items-center" onClick={() => setPrendaSeleccionada(item)}>
            <div className="w-full aspect-[3/4] overflow-hidden bg-[#f0eee9] rounded-xl mb-5 shadow-sm relative">
              <img src={item.url} alt={item.nombreEs} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out p-4"/>
              
              <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="bg-white/90 text-black px-6 py-3 text-[10px] uppercase tracking-widest rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {t.probarBtn}
                </span>
              </div>
            </div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-gray-600 text-center px-4 leading-relaxed">
              {idioma === 'es' ? item.nombreEs : item.nombreEn}
            </h3>
          </div>
        ))}
      </section>

      {/* --- EL ESPEJO MÁGICO (MODAL) --- */}
      {prendaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm md:max-w-md p-8 md:p-10 rounded-3xl shadow-2xl relative flex flex-col items-center">
            
            <button onClick={() => {setPrendaSeleccionada(null); setResultadoTryOnUrl(null); setFotoUsuarioUrl(null); setErrorTryOn(null);}} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-400 hover:text-black hover:bg-gray-200 transition-colors">✕</button>
            
            <h2 className="text-lg md:text-xl uppercase tracking-[0.3em] mb-1 mt-2 font-light text-center">{t.probadorTitulo}</h2>
            <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-8 text-center">Powered by ViOs Code Matrix</p>

            {!resultadoTryOnUrl ? (
              <>
                <div className="w-32 h-40 bg-[#f0eee9] rounded-xl mb-8 p-2 shadow-inner">
                  <img src={prendaSeleccionada.url} alt="Prenda" className="w-full h-full object-cover rounded-lg"/>
                </div>
                
                <div className="w-full mb-8">
                  <label className="block text-[10px] text-gray-500 tracking-widest uppercase mb-3 text-center font-semibold">{t.paso1}</label>
                  
                  {estaSubiendoFoto ? (
                    <div className="w-full p-4 bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400 text-center animate-pulse border border-gray-100 rounded-2xl">{t.cargandoFoto}</div>
                  ) : (
                    <div className="relative w-full">
                      <input type="file" accept="image/*" onChange={manejarSubidaFoto} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                      <div className={`w-full p-4 border border-dashed rounded-2xl text-[10px] uppercase tracking-widest text-center transition-colors ${fotoUsuarioUrl ? 'border-green-300 bg-green-50 text-green-700' : 'border-[#E2D5C5] bg-[#F9F8F6] text-gray-500 hover:bg-[#f2efe9]'}`}>
                        {fotoUsuarioUrl ? t.fotoGuardada : t.seleccionarArchivo}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <label className="block text-[10px] text-gray-500 tracking-widest uppercase mb-3 text-center font-semibold">{t.paso2}</label>
                  <button onClick={ejecutarPruebaVirtual} disabled={estaProcesando || estaSubiendoFoto || !fotoUsuarioUrl} className={`w-full py-4 rounded-2xl text-[10px] tracking-[0.2em] font-bold uppercase transition-all flex items-center justify-center ${estaProcesando ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#2A2A2A] text-white hover:bg-black shadow-lg hover:shadow-xl hover:-translate-y-1'}`}>
                    {estaProcesando ? t.procesando : t.probarEstaPieza}
                  </button>
                </div>
                {errorTryOn && <p className="text-red-500 text-[10px] mt-4 text-center uppercase tracking-widest">{errorTryOn}</p>}
              </>
            ) : (
              <div className="flex flex-col items-center w-full animate-in zoom-in-95 duration-500">
                <div className="relative w-full max-h-[45vh] flex justify-center bg-gray-50 rounded-2xl p-2 mb-5 border border-gray-100">
                  <img src={resultadoTryOnUrl} alt="Resultado Magnolia" className="max-w-full max-h-[45vh] object-contain rounded-xl shadow-sm"/>
                </div>
                
                <div className="flex flex-col gap-3 w-full">
                  <a href={generarLinkWhatsApp()} target="_blank" rel="noreferrer" className="w-full py-4 bg-[#D4C5B3] text-black text-[10px] font-bold text-center uppercase tracking-[0.2em] rounded-2xl hover:bg-[#c4b39e] transition-colors shadow-md flex items-center justify-center">
                    {t.pedirInfo}
                  </a>
                  
                  <div className="flex gap-3 w-full">
                    <button onClick={() => setResultadoTryOnUrl(null)} className="flex-1 py-3 bg-[#F9F8F6] text-gray-600 text-[9px] font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-200 transition-colors">
                      {t.reintentar}
                    </button>
                    <a href={resultadoTryOnUrl} download="Magnolia_TryOn.jpg" target="_blank" rel="noreferrer" className="flex-1 py-3 bg-[#2A2A2A] text-white text-[9px] font-bold text-center uppercase tracking-[0.2em] rounded-2xl hover:bg-black transition-colors shadow-lg">
                      {t.descargar}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}