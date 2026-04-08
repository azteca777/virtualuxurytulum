'use client';

import React, { Suspense, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useVideoTexture } from '@react-three/drei';
import SensorTrafico from '../components/SensorTrafico'; // 📡 IMPORTACIÓN DEL RADAR

// === COMPONENTE: ENTORNOS 360 ===
function Entorno360({ urlVideo }: { urlVideo: string }) {
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

// === COMPONENTE: NAVEGACIÓN (Flecha con Triángulo Negro y Emoji) ===
function FlechaNavegacion({ posicion, angulo = 0, onClick, hoverText, emoji }: { posicion: [number, number, number], angulo?: number, onClick: () => void, hoverText: string, emoji: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <group 
      position={posicion} 
      rotation={[-Math.PI / 2, 0, angulo]}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {/* Emoji Flotante */}
      <Html position={[0, 0, 1.5]} center>
        <div className={`text-4xl transition-all duration-500 ${hovered ? 'scale-125' : 'scale-100 animate-bounce'}`}>
          {emoji}
        </div>
      </Html>

      {/* Círculo Blanco */}
      <mesh>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial color="white" transparent opacity={hovered ? 0.3 : 0.1} />
      </mesh>
      
      {/* Triángulo Negro */}
      <mesh position={[0, 0.3, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[0.4, 3]} />
        <meshBasicMaterial color="black" transparent opacity={hovered ? 1 : 0.8} />
      </mesh>

      {hovered && (
        <Html center style={{ pointerEvents: 'none' }}>
          <div className="px-4 py-2 bg-black/90 text-white font-mono text-xs rounded-lg border border-white/20 translate-y-[-80px] whitespace-nowrap uppercase tracking-widest text-center">
            {hoverText}
          </div>
        </Html>
      )}
    </group>
  );
}

export default function BoutiquesHub() {
  const [nodoActual, setNodoActual] = useState<'conexion' | 'distrito'>('conexion');

  // URLs de Video
  const URL_CONEXION = "https://izuozfbhtyvjwrckummr.supabase.co/storage/v1/object/public/modelos-3d/conexion_tianguis_360.mp4";
  const URL_ZONA_BOUTIQUES = "/boutiques_360_aldea_zama.mp4"; 

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden font-inter selection:bg-yellow-500/30">
      
      {/* 📡 SENSOR DE TRÁFICO INYECTADO */}
      <SensorTrafico marca="BOUTIQUES_HUB" />

      {/* 🌍 EL METAVERSO 360 */}
      <div className="absolute inset-0 z-0 bg-black">
        <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={-0.4} />
          <Suspense fallback={<Html center><div className="text-white text-xs tracking-[0.3em] animate-pulse font-mono">INICIALIZANDO NODO...</div></Html>}>
             
             {/* --- NODO 1: CONEXIÓN INTERSECCIÓN --- */}
             {nodoActual === 'conexion' && (
               <group>
                 <Entorno360 urlVideo={URL_CONEXION} />
                 
                 {/* Flecha a Restaurantes (Tu ubicación guardada) */}
                 <FlechaNavegacion 
                    posicion={[5, -1.6, 7]} 
                    angulo={Math.PI / 4} 
                    emoji="🍷"
                    hoverText="Ir a Restaurantes"
                    onClick={() => window.location.href = 'https://virtualuxurytulum.com'}
                 />

                 {/* Flecha a Artesanías (Tu ubicación guardada + Nueva Ruta) */}
                 <FlechaNavegacion 
                    posicion={[10, -2.5, -6]} 
                    angulo={Math.PI} 
                    emoji="🤝🛒"
                    hoverText="Ir a Artesanías"
                    onClick={() => window.location.href = 'https://tianguistulum.com/artesanias'}
                 />

                 {/* Flecha a Avanzar Distrito de Moda (Tu ubicación guardada) */}
                 <FlechaNavegacion 
                    posicion={[10, -2, 2]} 
                    angulo={-Math.PI / 4} 
                    emoji="🛍️"
                    hoverText="Avanzar a Boutiques"
                    onClick={() => setNodoActual('distrito')}
                 />
               </group>
             )}

             {/* --- NODO 2: DISTRITO DE MODA (MAGNOLIA) --- */}
             {nodoActual === 'distrito' && (
               <group>
                 <Entorno360 urlVideo={URL_ZONA_BOUTIQUES} />
                 
                 {/* Pin de Magnolia Boutique */}
                 <Html position={[10, -2, -20]} center>
                    <div className="flex flex-col items-center animate-bounce cursor-pointer hover:scale-105 transition-all duration-300"
                         onClick={() => window.location.href = '/magnolia'}>
                      <div className="bg-[#F9F8F6]/95 backdrop-blur-md border border-[#E2D5C5] px-6 py-4 rounded-2xl shadow-2xl text-center">
                        <img 
                          src="/magnolia.jpeg" 
                          alt="Magnolia" 
                          className="h-8 md:h-12 w-auto object-contain mb-2 mx-auto mix-blend-multiply" 
                        />
                        <p className="text-gray-500 text-[9px] tracking-[0.2em] uppercase font-bold">Entrar a Boutique ✨</p>
                      </div>
                      <div className="w-1 h-8 bg-gradient-to-b from-[#F9F8F6]/90 to-transparent mt-2"></div>
                    </div>
                 </Html>

                 <FlechaNavegacion 
                    posicion={[0, -4, 8]} 
                    angulo={Math.PI} 
                    emoji="⬅️"
                    hoverText="Regresar a Intersección"
                    onClick={() => setNodoActual('conexion')}
                 />
               </group>
             )}
             
          </Suspense>
        </Canvas>
      </div>

      {/* 🎛️ INTERFAZ SUPERIOR */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-10">
        <header className="w-full p-6 md:p-10 flex justify-between items-start">
          <button 
            onClick={() => window.location.href = 'https://viosvirtualmetra.com'} 
            className="pointer-events-auto px-5 py-2.5 rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all backdrop-blur-md border bg-black/60 text-white border-white/20 hover:bg-white/20 flex items-center gap-2"
          >
            ← Volver al Mapa Aéreo
          </button>
          
          <div className="text-right">
            <h1 className="font-montserrat text-2xl md:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase">
              {nodoActual === 'conexion' ? 'Intersección Zama' : 'Distrito de Moda'}
            </h1>
            <p className="font-inter text-yellow-500 text-[9px] md:text-[11px] tracking-[0.3em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1">
              {nodoActual === 'conexion' ? 'Nodo de Conexión 0.2' : 'Boutiques & Accesorios Tulum'}
            </p>
          </div>
        </header>

        <div className="w-full p-6 flex justify-center pb-10">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-2xl pointer-events-auto">
            <p className="text-white/80 text-[10px] md:text-xs font-medium tracking-wide uppercase font-mono text-center">
              {nodoActual === 'conexion' ? 'Selecciona una dirección para navegar' : 'Arrastra la pantalla para buscar boutiques'}
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}