'use client';

import React, { useState, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useVideoTexture } from '@react-three/drei';

// === COMPONENTE: LA ESFERA GIGANTE 360 ===
function Entorno360({ urlVideo }: { urlVideo: string }) {
  // El video se reproduce en loop, 100% silenciado por defecto para evitar bloqueos del navegador
  const texture = useVideoTexture(urlVideo, { 
    muted: true, 
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

// === VISTA PRINCIPAL (Sucursal Tulum - Zona Restaurantes) ===
export default function Home() {
  const [introTerminada, setIntroTerminada] = useState(false);
  const [desvanecerIntro, setDesvanecerIntro] = useState(false);

  const URL_INTRO = "/aldea_zama_camino_intro.mp4"; 
  const URL_METAVERSO_360 = "/1er_meta_rest_zama.mp4"; 

  const finalizarIntro = () => {
    setDesvanecerIntro(true); 
    setTimeout(() => setIntroTerminada(true), 1000);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden font-inter selection:bg-yellow-500/30">
      
      {/* 🎬 1. INTRODUCCIÓN CINEMÁTICA */}
      {!introTerminada && (
        <div className={`absolute inset-0 z-50 bg-black transition-opacity duration-1000 ease-in-out ${desvanecerIntro ? 'opacity-0' : 'opacity-100'}`}>
          <video src={URL_INTRO} autoPlay playsInline muted className="w-full h-full object-cover" onEnded={finalizarIntro}/>
          <button onClick={finalizarIntro} className="absolute bottom-10 right-10 text-white/50 hover:text-white text-[10px] tracking-[0.3em] uppercase transition-colors z-50">Skip Intro ⏭️</button>
        </div>
      )}

      {/* 🌍 2. EL METAVERSO 360 (RESTAURANTES) */}
      <div className="absolute inset-0 z-0 bg-black">
        <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={-0.4} />
          <Suspense fallback={<Html center><div className="text-yellow-500 text-xs tracking-[0.3em] animate-pulse">CARGANDO ZONA DE RESTAURANTES...</div></Html>}>
             <Entorno360 urlVideo={URL_METAVERSO_360} />
          </Suspense>
        </Canvas>
      </div>

      {/* 🎛️ 3. INTERFAZ SUPERIOR */}
      {introTerminada && (
         <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-10">
           
           <header className="w-full p-6 md:p-10 flex justify-between items-start">
             
             {/* BOTÓN PARA VOLVER AL MAPA AÉREO */}
             <button 
               onClick={() => window.location.href = 'https://viosvirtualmetra.com'} 
               className="pointer-events-auto px-5 py-2.5 rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all backdrop-blur-md border bg-black/60 text-white border-white/20 hover:bg-white/20 flex items-center gap-2"
             >
               ← Volver al Mapa Aéreo
             </button>
             
             <div className="text-right pointer-events-auto">
               <h1 className="font-montserrat text-2xl md:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">ALDEA ZAMA</h1>
               <p className="font-inter text-yellow-500 text-[9px] md:text-[11px] tracking-[0.3em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1">Virtual Luxury Matrix Tulum</p>
             </div>
           </header>

           {/* INSTRUCCIONES INFERIORES */}
           <div className="w-full p-6 flex justify-center pb-10">
             <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-2xl pointer-events-auto">
               <p className="text-white/80 text-[10px] md:text-xs font-medium tracking-wide">🖱️ Arrastra la pantalla para explorar 360°</p>
             </div>
           </div>

         </div>
      )}

    </main>
  );
}