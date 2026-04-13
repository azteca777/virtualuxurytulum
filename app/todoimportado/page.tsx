'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF } from '@react-three/drei';
import SensorTrafico from '../components/SensorTrafico';

// === 1. MODELO 3D (TU GLB) ===
function ModeloHero() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/todoimportado/todoimportado_3d.glb');

  useFrame((state) => {
    if (groupRef.current) {
      // Movimiento suave siguiendo el mouse
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 12;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <primitive object={scene} scale={2} position={[0, -1, 0]} />
      </Float>
    </group>
  );
}

// === 2. BOTÓN ESTILO DICH FASHION (Página Principal) ===
const DichButton = ({ text }: { text: string }) => (
  <button className="flex items-center bg-black rounded-full border-2 border-black overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.2)] pointer-events-auto">
    <span className="px-6 py-3 text-white text-[10px] font-bold tracking-[0.2em] uppercase">
      {text}
    </span>
    <div className="bg-[#fbff00] h-full px-4 py-3 flex items-center justify-center border-l-2 border-black group-hover:bg-white transition-colors">
      <span className="text-black font-black tracking-tighter text-xs">》</span>
    </div>
  </button>
);

export default function TodoImportadoBoutique() {
  // Estados para el flujo de carga estilo DICH Fashion
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // Simulación del Loader del 0 al 100%
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return p + Math.random() * 5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white font-sans text-black relative overflow-x-hidden">
      <SensorTrafico marca="TODO_IMPORTADO" />

      {/* --- ESTILOS GLOBALES --- */}
      <style dangerouslySetInnerHTML={{__html: `
        .bg-dich-grid {
          background-image: radial-gradient(#000 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .scanlines {
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
          background-size: 100% 4px;
        }
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        .font-syncopate { font-family: 'Syncopate', sans-serif; }
        .font-space { font-family: 'Space Mono', monospace; }
      `}} />

      {/* ========================================================= */}
      {/* PANTALLA DE CARGA Y TRANSICIÓN (ESTILO DICH FASHION) */}
      {/* ========================================================= */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#050505] text-white flex items-center justify-center transition-all duration-[1500ms] ease-in-out ${hasEntered ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'}`}
      >
        {/* CRUCETAS DE ESQUINAS HUD */}
        <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/50"></div>
        <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white/50"></div>
        <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white/50"></div>
        <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/50"></div>

        {/* TEXTOS HUD LATERALES */}
        <div className="absolute left-10 font-space text-[8px] md:text-[10px] text-white/50 tracking-widest hidden md:block">
          C://SYSTEM_FILES<br/>
          ...PROTOCOL_BL/S<br/>
          ///// ...2045<br/>
          &lt;ACCESS GRANTED&gt;
        </div>
        <div className="absolute right-10 font-space text-[8px] md:text-[10px] text-white/50 tracking-widest text-right hidden md:block">
          D://DATA_CORE<br/>
          ...TODO_IMPORTADO<br/>
          ///// ...2045<br/>
          &lt;FILE DECRYPTED&gt;
        </div>

        {/* PORCENTAJE SUPERIOR */}
        <div className="absolute top-16 md:top-20 font-space text-3xl md:text-5xl font-bold tracking-widest">
          {Math.floor(progress)} <span className="text-xl md:text-3xl">%</span>
        </div>

        {/* CÍRCULO CENTRAL TECH */}
        <button 
          onClick={() => isReady && setHasEntered(true)}
          className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full flex flex-col items-center justify-center group transition-all duration-1000 ${isReady ? 'cursor-pointer opacity-100 scale-100' : 'opacity-80 scale-95 pointer-events-none'}`}
        >
          {/* Anillos de color rotando */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d946ef] via-[#111] to-[#fcd34d] opacity-80 animate-[spin_8s_linear_infinite]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
          <div className="absolute inset-1 rounded-full bg-gradient-to-bl from-[#a855f7] via-[#111] to-[#fef08a] opacity-80 animate-[spin_6s_linear_infinite_reverse]" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}></div>
          
          {/* Filtro de líneas de escaneo (Scanlines) */}
          <div className="absolute inset-0 rounded-full scanlines opacity-50"></div>

          {/* Círculo central oscuro (Donde va el logo) */}
          <div className="absolute inset-[15%] md:inset-[20%] bg-[#0a0a0a] rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,1)] flex flex-col items-center justify-center z-10 transition-all duration-500 group-hover:scale-95 group-hover:bg-black border border-white/5">
            
            {/* Logo de Todo Importado EM */}
            <img 
              src="/todoimportado/logo_todo_importado.png" 
              alt="Logo Todo Importado" 
              className={`w-16 md:w-20 object-contain transition-all duration-1000 ${isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
            />
            
            {/* Texto DISCOVER (Aparece cuando está al 100%) */}
            <span className={`mt-3 text-[#fcd34d] text-[8px] md:text-[10px] font-space tracking-widest uppercase transition-all duration-500 ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} group-hover:text-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]`}>
              &lt;&lt;&lt; DISCOVER &gt;&gt;&gt;
            </span>

            {/* Resplandor al Hover */}
            <div className="absolute inset-0 rounded-full bg-fuchsia-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </button>

        {/* TEXTO INFERIOR */}
        <div className="absolute bottom-16 md:bottom-20 font-space text-[8px] md:text-[10px] text-white/70 tracking-[0.2em] uppercase text-center animate-pulse">
          TURN UP THE VOLUME, BABY. THE FUTURE WON'T WAIT.
        </div>
      </div>


      {/* ========================================================= */}
      {/* SECCIÓN 1: HERO PRINCIPAL (El que armamos anteriormente) */}
      {/* ========================================================= */}
      <section className="relative w-full h-screen min-h-[800px] flex flex-col bg-gradient-to-b from-[#e3eaff] via-[#ffdae4] to-[#f4d1f9]">
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-dich-grid opacity-20 pointer-events-none"></div>

        {/* NAVEGACIÓN SUPERIOR */}
        <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-auto border-b border-black/10">
          <div className="flex items-center gap-2">
            <div className="w-16 h-4 bg-black rounded-full flex items-center justify-center gap-0.5 px-2">
              <div className="w-1 h-2 bg-[#fbff00] animate-pulse"></div>
              <div className="w-1 h-1 bg-[#fbff00] animate-pulse delay-75"></div>
              <div className="w-1 h-2.5 bg-[#fbff00] animate-pulse delay-150"></div>
              <div className="w-1 h-1.5 bg-[#fbff00] animate-pulse delay-300"></div>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase">ON</span>
          </div>
          <button className="text-xs font-bold tracking-[0.2em] uppercase hover:underline">
            MENU
          </button>
        </nav>

        {/* MARCOS HUD (Esquinas) */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-black z-40 hidden md:block"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-black z-40 hidden md:block"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-black z-40 hidden md:block"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-black z-40 hidden md:block"></div>

        {/* TÍTULO GIGANTE FRAGMENTADO */}
        <div className="absolute top-[15%] w-full z-20 flex flex-col items-center pointer-events-none text-center px-4">
          <h1 className="font-syncopate font-bold text-5xl md:text-[8vw] leading-[0.8] tracking-tighter text-black uppercase flex flex-col items-center">
            <span className="flex items-center gap-4">
              FUTURE <span className="text-[10px] md:text-sm font-sans font-normal tracking-widest mt-4">G_021</span>
            </span>
            <span className="flex items-center gap-4 ml-[-10vw]">
              MODE OF <span className="text-[10px] md:text-sm font-sans font-normal tracking-widest mt-4">G_034</span>
            </span>
            <span className="flex items-center gap-4 ml-[15vw]">
              E.M. <span className="text-[10px] md:text-sm font-sans font-normal tracking-widest mt-4">G_004</span>
            </span>
          </h1>
        </div>

        {/* CANVAS 3D (TU MODELO) */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <Suspense fallback={null}>
              <ModeloHero />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        {/* TEXTOS INFERIORES Y BOTÓN */}
        <div className="absolute bottom-0 w-full p-6 md:p-12 z-20 pointer-events-none flex flex-col">
          <div className="flex justify-between w-full text-[9px] md:text-[11px] font-bold tracking-[0.2em] uppercase mb-12">
            <div className="flex flex-col gap-2 text-left">
              <span className="tracking-[0.4em]">✦ ✦ ✦</span>
              <span>SHIFT THE VISION</span>
              <span>EVOLVE</span>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <span className="tracking-[0.4em]">✦ ✦ ✦</span>
              <span>TOUCH THE VOID</span>
              <span>TRANSCEND</span>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <DichButton text="DISCOVER" />
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* SECCIÓN 2: ORANITHS / COLECCIÓN (Color Beige/Naranja) */}
      {/* ========================================================= */}
      <section className="relative w-full py-24 flex flex-col bg-[#ffe7cd] border-t-2 border-black z-20">
        <div className="absolute inset-0 bg-dich-grid opacity-30 pointer-events-none"></div>

        <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-start mb-12 text-[10px] font-space tracking-widest font-bold uppercase border-b-2 border-black pb-4">
            <div className="flex flex-col gap-1">
              <span>✦ ✦ ✦</span>
              <span>DARE_TO_DISRUPT</span>
              <span>&lt;META CHARSET=...&gt;</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-black"></div>
               <span>COLECCIONES EM</span>
            </div>
          </div>

          <div className="relative w-full md:w-3/4 aspect-square mx-auto mb-16 mt-8">
            <div className="absolute top-0 -left-10 text-5xl font-syncopate font-bold text-black">.01</div>
            <div className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-black"></div>
            <div className="absolute -top-4 -right-4 w-6 h-6 border-t-2 border-r-2 border-black"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 border-b-2 border-l-2 border-black"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-black"></div>

            <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-black bg-white shadow-2xl p-2 relative group cursor-pointer">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                 {/* Aquí irá la foto de la primera colección de Todo Importado */}
                 <img src="/todoimportado/logo_todo_importado.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Colección" />
              </div>
            </div>
          </div>

          <h2 className="font-syncopate font-bold text-4xl md:text-8xl tracking-tighter text-center uppercase text-black">
            IMPORTADO
          </h2>

        </div>
      </section>

    </main>
  );
}