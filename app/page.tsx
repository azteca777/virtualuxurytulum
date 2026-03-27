'use client';

import React, { useState, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useVideoTexture } from '@react-three/drei';

// === COMPONENTE: LA ESFERA GIGANTE DE VIDEO 360 ===
function Entorno360({ urlVideo, audioActivado }: { urlVideo: string, audioActivado: boolean }) {
  // useVideoTexture convierte tu video de Insta360 en el mundo virtual
  const texture = useVideoTexture(urlVideo, { 
    muted: !audioActivado, // Depende del botón de la interfaz
    loop: true, 
    start: true,
    crossOrigin: "Anonymous"
  });

  return (
    <mesh>
      {/* Esfera gigante. El usuario estará en el centro [0,0,0] */}
      <sphereGeometry args={[500, 60, 40]} />
      {/* Pintamos el video por ADENTRO de la esfera */}
      <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

// === VISTA PRINCIPAL ===
export default function Home() {
  // Estados para controlar la transición del intro
  const [introTerminada, setIntroTerminada] = useState(false);
  const [desvanecerIntro, setDesvanecerIntro] = useState(false);
  
  // Estado para el audio del metaverso
  const [audioActivado, setAudioActivado] = useState(false);

  // 👇 AQUÍ ESTÁN TUS ARCHIVOS DE LA CARPETA PUBLIC 👇
  const URL_INTRO = "/aldea_zama_camino_intro.mp4"; 
  const URL_METAVERSO_360 = "/1er_meta_rest_zama.mp4"; 

  // Función que hace la magia de transición
  const finalizarIntro = () => {
    setDesvanecerIntro(true); // CSS: opacity a 0
    setTimeout(() => {
      setIntroTerminada(true); // Quita el video por completo después de 1 segundo
    }, 1000);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden font-inter selection:bg-yellow-500/30">
      
      {/* 🎬 1. CAPA DE INTRODUCCIÓN LIMPIA (Z-50) 🎬 */}
      {/* Sin capas oscuras, sin letras grandes, puro video cinematográfico */}
      {!introTerminada && (
        <div className={`absolute inset-0 z-50 bg-black transition-opacity duration-1000 ease-in-out ${desvanecerIntro ? 'opacity-0' : 'opacity-100'}`}>
          <video 
            src={URL_INTRO}
            autoPlay 
            playsInline
            muted 
            className="w-full h-full object-cover"
            onEnded={finalizarIntro} // Cuando el video de 13 seg termina, inicia transición
          />
          
          {/* Botón Skip por si el usuario tiene prisa */}
          <button 
            onClick={finalizarIntro}
            className="absolute bottom-10 right-10 text-white/50 hover:text-white text-[10px] tracking-[0.3em] uppercase transition-colors z-50"
          >
            Skip Intro ⏭️
          </button>
        </div>
      )}

      {/* 🌍 2. EL METAVERSO 360 (Z-0) 🌍 */}
      {/* Se carga silenciosamente en el fondo mientras el usuario ve la intro */}
      <div className="absolute inset-0 z-0 bg-black">
        <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
          <OrbitControls 
            enableZoom={false} // Desactivamos el zoom para no romper la esfera
            enablePan={false}
            rotateSpeed={-0.4} // Giro natural con el mouse/dedo
          />
          
          <Suspense fallback={<Html center><div className="text-yellow-500 text-xs tracking-[0.3em] animate-pulse">CARGANDO MATRIZ...</div></Html>}>
             <Entorno360 urlVideo={URL_METAVERSO_360} audioActivado={audioActivado} />
          </Suspense>
        </Canvas>
      </div>

      {/* 🎛️ 3. INTERFAZ DE LUJO (Z-10) - Aparece SOLO cuando termina la intro 🎛️ */}
      {introTerminada && (
         <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-10">
           
           {/* Header superior */}
           <header className="w-full p-6 md:p-10 flex justify-between items-start">
             {/* Botón de Sonido (Pointer events auto para que sea clickeable) */}
             <button 
               onClick={() => setAudioActivado(!audioActivado)}
               className={`pointer-events-auto px-5 py-2.5 rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all backdrop-blur-md border ${audioActivado ? 'bg-yellow-500/80 text-black border-yellow-400' : 'bg-black/40 text-white border-white/20 hover:bg-white/20'}`}
             >
               {audioActivado ? '🔊 SILENCIAR AMBIENTE' : '🔇 ACTIVAR SONIDO'}
             </button>

             {/* Título de la zona */}
             <div className="text-right">
               <h1 className="font-montserrat text-2xl md:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                 ALDEA ZAMA
               </h1>
               <p className="font-inter text-yellow-500 text-[9px] md:text-[11px] tracking-[0.3em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1">
                 Virtual Luxury Matrix
               </p>
             </div>
           </header>

           {/* Instrucciones inferiores */}
           <div className="w-full p-6 flex justify-center pb-10">
             <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-2xl">
               <p className="text-white/80 text-[10px] md:text-xs font-medium tracking-wide">
                 🖱️ Arrastra la pantalla para explorar 360°
               </p>
             </div>
           </div>

         </div>
      )}

    </main>
  );
}