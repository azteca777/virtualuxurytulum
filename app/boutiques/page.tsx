'use client';

import React, { Suspense, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useVideoTexture } from '@react-three/drei';

// === COMPONENTE: LA ESFERA GIGANTE 360 DE LAS BOUTIQUES ===
function Entorno360Boutiques({ urlVideo, audioActivado }: { urlVideo: string, audioActivado: boolean }) {
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

export default function BoutiquesHub() {
  const [audioActivado, setAudioActivado] = useState(false);

  // ⚠️ AQUÍ PONDRÁS LA URL DE TU NUEVO VIDEO 360 PARA LA ZONA DE BOUTIQUES
  const URL_ZONA_BOUTIQUES_360 = "/boutiques_360_aldea_zama.mp4";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden font-inter selection:bg-yellow-500/30">
      
      {/* 🌍 EL METAVERSO 360 */}
      <div className="absolute inset-0 z-0 bg-black">
        <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={-0.4} />
          <Suspense fallback={<Html center><div className="text-yellow-500 text-xs tracking-[0.3em] animate-pulse">CARGANDO ZONA COMERCIAL...</div></Html>}>
             <Entorno360Boutiques urlVideo={URL_ZONA_BOUTIQUES_360} audioActivado={audioActivado} />
             
             {/* 📍 PIN 3D HACIA MAGNOLIA BOUTIQUE */}
             <Html position={[10, -2, -20]} center>
                <div className="flex flex-col items-center animate-bounce">
                  <div className="bg-black/80 backdrop-blur-md border border-yellow-500/50 p-4 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.3)] text-center cursor-pointer hover:bg-black transition-colors"
                       onClick={() => window.location.href = '/magnolia'}>
                    <p className="text-white font-montserrat font-bold text-sm tracking-widest uppercase mb-1">Magnolia</p>
                    <p className="text-yellow-500 text-[9px] tracking-[0.2em] uppercase">Entrar a Boutique ✨</p>
                  </div>
                  <div className="w-1 h-8 bg-gradient-to-b from-yellow-500/80 to-transparent mt-2"></div>
                </div>
             </Html>
             
          </Suspense>
        </Canvas>
      </div>

      {/* 🎛️ INTERFAZ SUPERIOR */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-10">
        <header className="w-full p-6 md:p-10 flex justify-between items-start">
          <button 
            onClick={() => window.location.href = 'https://viosvirtualmetra.com'} // O LA URL DE TU SPLAT AÉREO
            className="pointer-events-auto px-5 py-2.5 rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all backdrop-blur-md border bg-black/60 text-white border-white/20 hover:bg-white/20 flex items-center gap-2"
          >
            ← Volver al Mapa Aéreo
          </button>
          
          <div className="text-right">
            <h1 className="font-montserrat text-2xl md:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">DISTRITO DE MODA</h1>
            <p className="font-inter text-yellow-500 text-[9px] md:text-[11px] tracking-[0.3em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1">Boutiques & Accesorios Tulum</p>
          </div>
        </header>

        <div className="w-full p-6 flex justify-center pb-10">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-2xl">
            <p className="text-white/80 text-[10px] md:text-xs font-medium tracking-wide">🖱️ Arrastra la pantalla para buscar boutiques</p>
          </div>
        </div>
      </div>

    </main>
  );
}