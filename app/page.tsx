'use client';

import React, { useState, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useVideoTexture } from '@react-three/drei';

// === COMPONENTE: LA ESFERA GIGANTE 360 ===
function Entorno360({ urlVideo, audioActivado }: { urlVideo: string, audioActivado: boolean }) {
  const texture = useVideoTexture(urlVideo, { 
    muted: !audioActivado, 
    loop: true, 
    start: true,
    crossOrigin: "Anonymous"
  });
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

// === VISTA PRINCIPAL (Sucursal Tulum Calibrada para Producción) ===
export default function Home() {
  const [introTerminada, setIntroTerminada] = useState(false);
  const [desvanecerIntro, setDesvanecerIntro] = useState(false);
  const [audioActivado, setAudioActivado] = useState(false);

  // ESTADOS DEL ESPEJO MÁGICO
  const [fotoUsuarioUrl, setFotoUsuarioUrl] = useState<string | null>(null); 
  const [prendaSeleccionadaUrl, setPrendaSeleccionadaUrl] = useState<string | null>(null);
  const [estaProcesando, setEstaProcesando] = useState(false);
  const [estaSubiendoFoto, setEstaSubiendoFoto] = useState(false); 
  const [resultadoTryOnUrl, setResultadoTryOnUrl] = useState<string | null>(null);
  const [errorTryOn, setErrorTryOn] = useState<string | null>(null);

  const URL_INTRO = "/aldea_zama_camino_intro.mp4"; 
  const URL_METAVERSO_360 = "/1er_meta_rest_zama.mp4"; 

  const finalizarIntro = () => {
    setDesvanecerIntro(true); 
    setTimeout(() => setIntroTerminada(true), 1000);
  };

  // --- 👇 MOTOR DE CONEXIÓN A VIOS CODE (POLLING PARA EL TICKET) 👇 ---
  const ejecutarPruebaVirtual = async () => {
    if (!fotoUsuarioUrl || !prendaSeleccionadaUrl) {
      setErrorTryOn('¡Falta tu foto o la prenda! Súbela de nuevo.');
      return;
    }

    setEstaProcesando(true);
    setErrorTryOn(null);
    setResultadoTryOnUrl(null);

    try {
      const URL_API_VIOS_CODE = 'https://vios-code.vercel.app/api/youcam-tryon'; 

      // 1. Mandamos la foto y pedimos el ticket
      const response = await fetch(URL_API_VIOS_CODE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          src_file_url: fotoUsuarioUrl,       
          ref_file_url: prendaSeleccionadaUrl, 
          tipoPrenda: 'cloth'               
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error de conexión con la Matrix ViOs Code.');

      const taskId = data.data?.task_id;
      if (!taskId) throw new Error('YouCam no nos dio un ticket de procesamiento.');

      console.log("🎟️ Ticket recibido:", taskId, "Esperando procesamiento...");

      // 2. Esperamos en la ventanilla hasta que la foto esté lista (Polling)
      let terminado = false;
      let intentos = 0;

      while (!terminado && intentos < 20) { // Intentará por unos 40 segundos máximo
        await new Promise(res => setTimeout(res, 2000)); // Espera 2 segundos

        // Consulta el ticket
        const pollRes = await fetch(`${URL_API_VIOS_CODE}?taskId=${taskId}`);
        const pollData = await pollRes.json();
        
        console.log("🔍 Estado de la foto:", pollData);

        if (pollData.data?.status === 'done' || pollData.data?.status === 'success') {
          terminado = true;
          setResultadoTryOnUrl(pollData.data?.result_file_url || pollData.data?.result_url);
          break;
        } else if (pollData.data?.status === 'failed') {
          throw new Error('La IA de YouCam no pudo procesar esta foto. Intenta con otra pose.');
        }

        intentos++;
      }

      if (!terminado) throw new Error('Tiempo de espera agotado. La IA está muy ocupada.');

    } catch (err: any) {
      setErrorTryOn(err.message);
    } finally {
      setEstaProcesando(false);
    }
  };

  // --- 👇 MOTOR DE SUBIDA DE SELFIES A VERCEL BLOB 👇 ---
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

        if (!response.ok) throw new Error('Error en el puente Blob');

        console.log("Selfie subida con éxito a Blob Matrix:", blob.url);
        setFotoUsuarioUrl(blob.url); 

      } catch (err: any) {
        console.error("Error subiendo selfie:", err);
        setErrorTryOn('Error interdimensional al subir tu selfie. Intenta de nuevo.');
      } finally {
        setEstaSubiendoFoto(false); 
      }
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden font-inter selection:bg-yellow-500/30">
      
      {/* 🎬 1. INTRODUCCIÓN */}
      {!introTerminada && (
        <div className={`absolute inset-0 z-50 bg-black transition-opacity duration-1000 ease-in-out ${desvanecerIntro ? 'opacity-0' : 'opacity-100'}`}>
          <video src={URL_INTRO} autoPlay playsInline muted className="w-full h-full object-cover" onEnded={finalizarIntro}/>
          <button onClick={finalizarIntro} className="absolute bottom-10 right-10 text-white/50 hover:text-white text-[10px] tracking-[0.3em] uppercase transition-colors z-50">Skip Intro ⏭️</button>
        </div>
      )}

      {/* 🌍 2. EL METAVERSO 360 */}
      <div className="absolute inset-0 z-0 bg-black">
        <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={-0.4} />
          <Suspense fallback={<Html center><div className="text-yellow-500 text-xs tracking-[0.3em] animate-pulse">CARGANDO MATRIZ...</div></Html>}>
             <Entorno360 urlVideo={URL_METAVERSO_360} audioActivado={audioActivado} />
          </Suspense>
        </Canvas>
      </div>

      {/* 🎛️ 3. INTERFAZ Y ESPEJO MÁGICO DEFINTIVO */}
      {introTerminada && (
         <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-10">
           
           <header className="w-full p-6 md:p-10 flex justify-between items-start">
             <button onClick={() => setAudioActivado(!audioActivado)} className={`pointer-events-auto px-5 py-2.5 rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all backdrop-blur-md border ${audioActivado ? 'bg-yellow-500/80 text-black border-yellow-400' : 'bg-black/40 text-white border-white/20 hover:bg-white/20'}`}>
               {audioActivado ? '🔊 SILENCIAR AMBIENTE' : '🔇 ACTIVAR SONIDO'}
             </button>
             <div className="text-right">
               <h1 className="font-montserrat text-2xl md:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">ALDEA ZAMA</h1>
               <p className="font-inter text-yellow-500 text-[9px] md:text-[11px] tracking-[0.3em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1">Virtual Luxury Matrix Tulum</p>
             </div>
           </header>

           {/* PANEL DEL ESPEJO MÁGICO */}
           {prendaSeleccionadaUrl && !resultadoTryOnUrl && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[400px] pointer-events-auto bg-black/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl text-white z-20">
               <h2 className="font-montserrat text-xl font-bold tracking-tight mb-1">PROBADOR VIRTUAL DE LUJO</h2>
               <p className="text-yellow-500 text-[10px] tracking-[0.2em] uppercase mb-6">Powered by ViOs Code Blob Matrix</p>

               <div className="mb-6 flex justify-center">
                 <img src={prendaSeleccionadaUrl} alt="Traje de baño seleccionado" className="w-24 h-32 object-cover border border-white/10 rounded-lg p-1 bg-white/5"/>
               </div>

               <div className="mb-6">
                 <label className="block text-[11px] text-white/60 tracking-wider uppercase mb-2">Sube tu selfie</label>
                 {estaSubiendoFoto ? (
                   <div className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-[10px] text-yellow-500/70 tracking-widest uppercase text-center animate-pulse">Saliendo de tu teléfono a la nube...</div>
                 ) : (
                   <input type="file" accept="image/*" onChange={manejarSubidaFoto} className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-xs text-white/50 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400 cursor-pointer transition-colors"/>
                 )}
                 {fotoUsuarioUrl && <p className="text-green-400 text-[9px] mt-2 uppercase tracking-wider">¡Selfie guardada en tu casillero! ✅</p>}
               </div>

               <button 
                 onClick={ejecutarPruebaVirtual}
                 disabled={estaProcesando || estaSubiendoFoto || !fotoUsuarioUrl}
                 className={`w-full py-4 rounded-xl text-[11px] font-bold tracking-[0.3em] uppercase transition-all flex items-center justify-center ${estaProcesando ? 'bg-yellow-500/30 text-white/50 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]'}`}
               >
                 {estaProcesando ? (
                   <>
                     <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin mr-3"/>
                     PROCESANDO MATRIZ YOUCAM (aprox 20s)...
                   </>
                 ) : (
                   'PROBAR PRENDA'
                 )}
               </button>

               {errorTryOn && <p className="text-red-400 text-[10px] mt-4 text-center uppercase tracking-wider">{errorTryOn}</p>}
               <button onClick={() => setPrendaSeleccionadaUrl(null)} className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors">✕</button>
             </div>
           )}

           {/* --- RESULTADO FINAL --- */}
           {resultadoTryOnUrl && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-black/90 backdrop-blur-3xl p-4 rounded-2xl border border-yellow-500/30 z-30 flex flex-col items-center shadow-[0_0_30px_rgba(234,179,8,0.1)]">
               <img src={resultadoTryOnUrl} alt="Tu resultado mágico" className="max-w-[85vw] max-h-[70vh] rounded-xl object-contain mb-4"/>
               <div className="flex gap-4 w-full">
                 <button onClick={() => setResultadoTryOnUrl(null)} className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] tracking-widest uppercase transition-colors">Cerrar</button>
                 <a href={resultadoTryOnUrl} download="Mi_Prueba_Virtualuxury.jpg" target="_blank" rel="noreferrer" className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-black text-center rounded-xl text-[10px] tracking-widest font-bold uppercase transition-colors">Descargar</a>
               </div>
             </div>
           )}

           {/* --- BOTÓN DE PRUEBA --- */}
           {!prendaSeleccionadaUrl && !resultadoTryOnUrl && (
             <div className="absolute top-[20%] right-6 md:right-10 pointer-events-auto">
               <button 
                 onClick={() => setPrendaSeleccionadaUrl('https://virtualuxurytulum.com/traje_bano.jpeg')} 
                 className="px-6 py-3 bg-black/60 text-white rounded-full border border-yellow-500/50 hover:border-yellow-500 text-[10px] tracking-widest uppercase backdrop-blur-md transition-all shadow-[0_0_10px_rgba(234,179,8,0.2)]"
               >
                 ✨ PROBAR TRAJE DE BAÑO
               </button>
             </div>
           )}

           <div className="w-full p-6 flex justify-center pb-10">
             <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-2xl">
               <p className="text-white/80 text-[10px] md:text-xs font-medium tracking-wide">🖱️ Arrastra la pantalla para explorar 360°</p>
             </div>
           </div>

         </div>
      )}

    </main>
  );
}