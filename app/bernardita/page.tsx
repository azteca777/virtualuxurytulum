'use client';

import React, { useState } from 'react';

// === 1. CATÁLOGO PRINCIPAL (3x3, Cambio de imagen en hover, Sin probador) ===
// 💡 NOTA: Ajusta 'urlAtras' con el nombre correcto de la foto trasera de cada bikini.
const CATALOGO_PRINCIPAL = [
  { id: 1, nombreEs: 'Bikini Rosa', nombreEn: 'Pink Bikini', precio: '$ 1,120.00', urlFrente: '/bernardita/traje3.jpeg', urlAtras: '/bernardita/traje2.jpeg' },
  { id: 2, nombreEs: 'Bikini Arena', nombreEn: 'Sand Bikini', precio: '$ 1,129.00', urlFrente: '/bernardita/traje5.jpeg', urlAtras: '/bernardita/traje4.jpeg' },
  { id: 3, nombreEs: 'Bikini Noche', nombreEn: 'Night Bikini', precio: '$ 1,234.00', urlFrente: '/bernardita/traje7.jpeg', urlAtras: '/bernardita/traje14.jpeg' },
  { id: 4, nombreEs: 'Bikini Mar', nombreEn: 'Sea Bikini', precio: '$ 1,329.00', urlFrente: '/bernardita/traje8.jpeg', urlAtras: '/bernardita/traje6.jpeg' },
  { id: 5, nombreEs: 'Bikini Coral', nombreEn: 'Coral Bikini', precio: '$ 1,189.00', urlFrente: '/bernardita/traje9.jpeg', urlAtras: '/bernardita/traje10.jpeg' },
  { id: 6, nombreEs: 'Bikini Sol', nombreEn: 'Sun Bikini', precio: '$ 1,272.00', urlFrente: '/bernardita/traje12.jpeg', urlAtras: '/bernardita/traje13.jpeg' },
  { id: 7, nombreEs: 'Bikini Luna', nombreEn: 'Moon Bikini', precio: '$ 1,150.00', urlFrente: '/bernardita/traje17.jpeg', urlAtras: '/bernardita/traje18.jpeg' },
  { id: 8, nombreEs: 'Bikini Brisa', nombreEn: 'Breeze Bikini', precio: '$ 1,199.00', urlFrente: '/bernardita/traje11.jpeg', urlAtras: '/bernardita/traje20.jpeg' },
  { id: 9, nombreEs: 'Bikini Palmera', nombreEn: 'Palm Bikini', precio: '$ 1,250.00', urlFrente: '/bernardita/traje19.jpeg', urlAtras: '/bernardita/traje15.jpeg' },
];

// === 2. CATÁLOGO INTERACTIVO (Los 8 elegidos CON probador virtual) ===
// 👇 ACTUALIZADO CON URLs PÚBLICAS DE VERCEL BLOB 👇
const CATALOGO_PROBADOR = [
  { id: 10, nombreEs: 'Traje de Baño 5', nombreEn: 'Swimsuit 5', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje5.jpeg' },
  { id: 11, nombreEs: 'Traje de Baño 7', nombreEn: 'Swimsuit 7', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje7.jpeg' },
  { id: 12, nombreEs: 'Traje de Baño 8', nombreEn: 'Swimsuit 8', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje8.jpeg' },
  { id: 13, nombreEs: 'Traje de Baño 9', nombreEn: 'Swimsuit 9', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje9.jpeg' },
  { id: 14, nombreEs: 'Traje de Baño 15', nombreEn: 'Swimsuit 15', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje15.jpeg' },
  { id: 15, nombreEs: 'Traje de Baño 16', nombreEn: 'Swimsuit 16', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje16.jpeg' },
  { id: 16, nombreEs: 'Traje de Baño 3', nombreEn: 'Swimsuit 3', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje3.jpeg' },
  { id: 17, nombreEs: 'Traje de Baño 11', nombreEn: 'Swimsuit 11', url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje11.jpeg' },
];

// === DICCIONARIO DE IDIOMAS ===
const TEXTOS = {
  es: {
    volver: "← Volver a la Calle",
    subtitulo: "Swimwear / Moda Exclusiva",
    historia: '"Diseños únicos pensados para resaltar la belleza natural. Cada pieza de Bernardita es una declaración de estilo, comodidad y confianza para disfrutar del sol."',
    vistaRapida: "Vista rápida",
    tituloProbador: "Pruébatelos Virtualmente",
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
    subtitulo: "Swimwear / Exclusive Fashion",
    historia: '"Unique designs meant to highlight natural beauty. Each Bernardita piece is a statement of style, comfort, and confidence to enjoy the sun."',
    vistaRapida: "Quick view",
    tituloProbador: "Try Them On Virtually",
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

export default function BernarditaBoutique() {
  const [idioma, setIdioma] = useState<'es' | 'en'>('es');
  const t = TEXTOS[idioma];

  // ESTADOS DEL ESPEJO MÁGICO
  const [fotoUsuarioUrl, setFotoUsuarioUrl] = useState<string | null>(null); 
  const [prendaSeleccionada, setPrendaSeleccionada] = useState<any | null>(null);
  const [estaProcesando, setEstaProcesando] = useState(false);
  const [estaSubiendoFoto, setEstaSubiendoFoto] = useState(false); 
  const [resultadoTryOnUrl, setResultadoTryOnUrl] = useState<string | null>(null);
  const [errorTryOn, setErrorTryOn] = useState<string | null>(null);

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
      // 👇 Como la URL de la prenda ya es absoluta (Vercel Blob), la pasamos directo
      const prendaPublicUrl = prendaSeleccionada.url;

      const response = await fetch(URL_API_VIOS_CODE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src_file_url: fotoUsuarioUrl, ref_file_url: prendaPublicUrl, tipoPrenda: 'cloth' }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error.');

      const taskId = data.data?.task_id;
      if (!taskId) throw new Error('Error al generar ticket.');

      let terminado = false;
      let intentos = 0;

      while (!terminado && intentos < 40) { 
        await new Promise(res => setTimeout(res, 3000)); 
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

  const generarLinkWhatsApp = () => {
    if (!prendaSeleccionada || !resultadoTryOnUrl) return "#";
    const nombrePrenda = idioma === 'es' ? prendaSeleccionada.nombreEs : prendaSeleccionada.nombreEn;
    const urlFoto = encodeURIComponent(resultadoTryOnUrl);
    const numeroWhatsApp = "5217774492296"; 
    let mensaje = t.waMensaje.replace('[PRENDA]', nombrePrenda).replace('[URL]', urlFoto);
    return `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  };

  return (
    <main className="min-h-screen bg-white text-[#333] font-serif selection:bg-[#EAE0D5]">
      
      {/* 👇 HEADER MODIFICADO CON FONDO ROSA Y LOGO GIGANTE 👇 */}
      <header className="relative w-full py-16 px-8 flex flex-col items-center bg-[#EBD4D4] border-b border-[#d8b8b8]">
        
        {/* Botón Volver */}
        <button onClick={() => window.location.href = '/boutiques'} className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-[#6e5a5a] hover:text-black text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
          {t.volver}
        </button>

        {/* Botón Idioma (Ajustado para verse bien en el fondo rosa) */}
        <button 
          onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')} 
          className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 border border-[#d8b8b8] px-4 py-2 rounded-full text-[#6e5a5a] bg-white/50 hover:bg-white hover:text-black text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-all shadow-sm"
        >
          {idioma === 'es' ? '🇺🇸 EN' : '🇲🇽 ES'}
        </button>

        {/* Logotipo Gigante */}
        <img 
          src="/bernardita.jpeg" 
          alt="Bernardita Swimwear" 
          className="h-40 md:h-48 object-contain mb-4 mix-blend-multiply drop-shadow-md transition-transform duration-500 hover:scale-105" 
        />
        
        {/* Subtítulo */}
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#8e7a7a] font-bold text-center">
          {t.subtitulo}
        </p>
      </header>

      {/* HISTORIA DE LA MARCA */}
      <section className="max-w-3xl mx-auto text-center py-12 px-8">
        <p className="text-sm md:text-base leading-loose text-gray-500 italic font-light">{t.historia}</p>
      </section>

      {/* === SECCIÓN 1: CATÁLOGO PRINCIPAL (3x3 con Hover) === */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATALOGO_PRINCIPAL.map((item) => (
            <div key={item.id} className="group cursor-pointer flex flex-col items-center">
              
              {/* Contenedor de Imagen con Efecto Hover */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                {/* Etiqueta de Oferta (Opcional, estilo Cherry Pink) */}
                <div className="absolute top-3 right-3 bg-[#9e1c1c] text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-full z-10 font-sans shadow-md">
                  ¡OFERTA!
                </div>

                {/* Imagen Frontal (Desaparece en hover) */}
                <img 
                  src={item.urlFrente} 
                  alt={item.nombreEs} 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
                />
                
                {/* Imagen Trasera (Aparece en hover) */}
                <img 
                  src={item.urlAtras} 
                  alt={`${item.nombreEs} atrás`} 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                />
                
                {/* Botón Vista Rápida (Aparece en hover abajo) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-sans tracking-widest uppercase px-8 py-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {t.vistaRapida}
                </div>
              </div>

              {/* Textos: Nombre y Precio */}
              <h3 className="text-xs font-sans text-gray-800 text-center px-4 mb-1">
                {idioma === 'es' ? item.nombreEs : item.nombreEn}
              </h3>
              <p className="text-xs font-sans text-[#9e1c1c] tracking-wider">{item.precio}</p>
            </div>
          ))}
        </div>
      </section>


      {/* === SECCIÓN 2: CATÁLOGO CON PROBADOR VIRTUAL (Los 8 elegidos) === */}
      <section className="max-w-6xl mx-auto px-6 pb-24 bg-[#FDFBF7] pt-16 rounded-t-3xl border-t border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl uppercase tracking-[0.2em] font-light text-gray-800">{t.tituloProbador}</h2>
          <div className="w-12 h-px bg-[#EBD4D4] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATALOGO_PROBADOR.map((item) => (
            <div key={item.id} className="group cursor-pointer flex flex-col items-center" onClick={() => setPrendaSeleccionada(item)}>
              <div className="w-full aspect-[3/4] overflow-hidden bg-[#F4EFEB] rounded-xl mb-5 shadow-sm relative border border-transparent group-hover:border-[#EBD4D4] transition-colors duration-300">
                <img src={item.url} alt={item.nombreEs} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"/>
                
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="bg-white/95 text-black px-6 py-3 text-[10px] uppercase tracking-widest rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-sans">
                    {t.probarBtn}
                  </span>
                </div>
              </div>
              <h3 className="text-[10px] font-sans tracking-[0.2em] uppercase text-gray-600 text-center px-4 leading-relaxed">
                {idioma === 'es' ? item.nombreEs : item.nombreEn}
              </h3>
            </div>
          ))}
        </div>
      </section>


      {/* --- EL ESPEJO MÁGICO (MODAL PARA LOS 8 TRAJES) --- */}
      {prendaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm md:max-w-md p-8 md:p-10 rounded-3xl shadow-2xl relative flex flex-col items-center border border-[#EBD4D4]">
            
            <button onClick={() => {setPrendaSeleccionada(null); setResultadoTryOnUrl(null); setFotoUsuarioUrl(null); setErrorTryOn(null);}} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-400 hover:text-black hover:bg-gray-200 transition-colors">✕</button>
            
            <h2 className="text-lg md:text-xl uppercase tracking-[0.3em] mb-1 mt-2 font-light text-center">{t.probadorTitulo}</h2>
            <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-8 text-center font-sans">Powered by ViOs Code Matrix</p>

            {!resultadoTryOnUrl ? (
              <>
                <div className="w-32 h-40 bg-[#F4EFEB] rounded-xl mb-8 p-2 shadow-inner">
                  <img src={prendaSeleccionada.url} alt="Prenda" className="w-full h-full object-cover rounded-lg"/>
                </div>
                
                <div className="w-full mb-8">
                  <label className="block text-[10px] text-gray-500 tracking-widest uppercase mb-3 text-center font-bold font-sans">{t.paso1}</label>
                  
                  {estaSubiendoFoto ? (
                    <div className="w-full p-4 bg-[#FDFBF7] text-[10px] uppercase tracking-widest text-gray-400 text-center animate-pulse border border-gray-100 rounded-2xl font-sans">{t.cargandoFoto}</div>
                  ) : (
                    <div className="relative w-full">
                      <input type="file" accept="image/*" onChange={manejarSubidaFoto} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                      <div className={`w-full p-4 border border-dashed rounded-2xl text-[10px] uppercase tracking-widest font-sans text-center transition-colors ${fotoUsuarioUrl ? 'border-green-300 bg-green-50 text-green-700' : 'border-[#EAE0D5] bg-[#FDFBF7] text-gray-500 hover:bg-[#F4EFEB]'}`}>
                        {fotoUsuarioUrl ? t.fotoGuardada : t.seleccionarArchivo}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <label className="block text-[10px] text-gray-500 tracking-widest uppercase mb-3 text-center font-bold font-sans">{t.paso2}</label>
                  <button onClick={ejecutarPruebaVirtual} disabled={estaProcesando || estaSubiendoFoto || !fotoUsuarioUrl} className={`w-full py-4 rounded-2xl text-[10px] tracking-[0.2em] font-bold font-sans uppercase transition-all flex items-center justify-center ${estaProcesando ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#2A2A2A] text-white hover:bg-black shadow-lg hover:shadow-xl hover:-translate-y-1'}`}>
                    {estaProcesando ? t.procesando : t.probarEstaPieza}
                  </button>
                </div>
                {errorTryOn && <p className="text-red-500 text-[10px] mt-4 text-center uppercase tracking-widest font-sans">{errorTryOn}</p>}
              </>
            ) : (
              <div className="flex flex-col items-center w-full animate-in zoom-in-95 duration-500">
                <div className="relative w-full max-h-[45vh] flex justify-center bg-gray-50 rounded-2xl p-2 mb-5 border border-gray-100">
                  <img src={resultadoTryOnUrl} alt="Resultado Bernardita" className="max-w-full max-h-[45vh] object-contain rounded-xl shadow-sm"/>
                </div>
                
                <div className="flex flex-col gap-3 w-full">
                  <a href={generarLinkWhatsApp()} target="_blank" rel="noreferrer" className="w-full py-4 bg-[#EBD4D4] text-black text-[10px] font-bold font-sans text-center uppercase tracking-[0.2em] rounded-2xl hover:bg-[#d8b8b8] transition-colors shadow-md flex items-center justify-center">
                    {t.pedirInfo}
                  </a>
                  
                  <div className="flex gap-3 w-full">
                    <button onClick={() => setResultadoTryOnUrl(null)} className="flex-1 py-3 bg-[#FDFBF7] text-gray-600 text-[9px] font-bold font-sans uppercase tracking-[0.2em] rounded-2xl hover:bg-[#EBD4D4] transition-colors">
                      {t.reintentar}
                    </button>
                    <a href={resultadoTryOnUrl} download="Bernardita_TryOn.jpg" target="_blank" rel="noreferrer" className="flex-1 py-3 bg-[#2A2A2A] text-white text-[9px] font-bold font-sans text-center uppercase tracking-[0.2em] rounded-2xl hover:bg-black transition-colors shadow-lg">
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