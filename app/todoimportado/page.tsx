'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF } from '@react-three/drei';
import SensorTrafico from '../components/SensorTrafico';

// === 1. MODELO 3D HERO ===
function ModeloHero() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/todoimportado/todoimportado_3d.glb');

  useFrame((state) => {
    if (groupRef.current) {
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

// === 2. MODELO DEL AVIÓN (PARALLAX) ===
function ModeloAvion() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/todoimportado/avion_todoimportado.glb');

  useFrame(() => {
    if (groupRef.current) {
      const scrollY = window.scrollY;
      const parallaxY = (scrollY - 400) * 0.005;
      const time = Date.now() * 0.001;
      groupRef.current.position.y = parallaxY;
      groupRef.current.rotation.z = Math.sin(time) * 0.05; 
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={4} rotation={[0, 1.7, 0.1]} />
    </group>
  );
}

// === 3. PASARELA CONTINUA 3D ===

// Componente individual para cargar y rotar cada modelo sobre su propio eje
function ModeloPasarela({ url, index, total, radio }: { url: string, index: number, total: number, radio: number }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  // Calcula la posición en el círculo usando trigonometría
  const angulo = (index / total) * Math.PI * 2;
  const posX = Math.sin(angulo) * radio;
  const posZ = Math.cos(angulo) * radio;

  useFrame(() => {
    if (modelRef.current) {
      // Rotación suave del modelo sobre su propio eje para lucir la prenda
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={[posX, -2, posZ]}>
      <primitive ref={modelRef} object={scene} scale={2.5} />
    </group>
  );
}

// Componente que agrupa a todos los modelos y los hace girar
function EscenaPasarela({ isPaused }: { isPaused: boolean }) {
  const carruselRef = useRef<THREE.Group>(null);
  const modelos = [
    '/todoimportado/modelo1.glb',
    '/todoimportado/modelo2.glb',
    '/todoimportado/modelo3.glb',
    '/todoimportado/modelo4.glb',
    '/todoimportado/modelo5.glb',
    
  ];

  // Configuración de la rueda
  const RADIO = 6; // Qué tan separados están los modelos del centro
  const VELOCIDAD = 0.005; // Velocidad de la pasarela

  useFrame(() => {
    if (carruselRef.current && !isPaused) {
      // Gira la rueda completa
      carruselRef.current.rotation.y += VELOCIDAD;
    }
  });

  return (
    <group ref={carruselRef}>
      {modelos.map((url, i) => (
        <ModeloPasarela key={i} url={url} index={i} total={modelos.length} radio={RADIO} />
      ))}
    </group>
  );
}

// === 4. BOTÓN ESTILO DICH ===
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
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  
  // Estado para pausar la pasarela al pasar el mouse
  const [pasarelaPausada, setPasarelaPausada] = useState(false);

  // Pre-cargar modelos de la pasarela
  useEffect(() => {
    const modelos = [
      '/todoimportado/modelo1.glb', '/todoimportado/modelo2.glb', '/todoimportado/modelo3.glb',
      '/todoimportado/modelo4.glb', '/todoimportado/modelo5.glb', '/todoimportado/modelo6.glb'
    ];
    modelos.forEach(url => useGLTF.preload(url));
  }, []);

  // Simulación del Loader
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

      <style dangerouslySetInnerHTML={{__html: `
        .bg-dich-grid { background-image: radial-gradient(#000 1px, transparent 1px); background-size: 24px 24px; }
        .scanlines { background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2)); background-size: 100% 4px; }
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Space+Mono:wght@400;700&display=swap');
        .font-syncopate { font-family: 'Syncopate', sans-serif; }
        .font-space { font-family: 'Space Mono', monospace; }
      `}} />

      {/* ========================================================= */}
      {/* PANTALLA DE CARGA (INTRO) */}
      {/* ========================================================= */}
      <div className={`fixed inset-0 z-[100] bg-[#050505] text-white flex items-center justify-center transition-all duration-[1500ms] ease-in-out ${hasEntered ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'}`}>
        
        {/* Esquinas y textos HUD */}
        <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/50"></div>
        <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white/50"></div>
        <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white/50"></div>
        <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/50"></div>

        <div className="absolute left-10 font-space text-[8px] md:text-[10px] text-white/50 tracking-widest hidden md:block">
          C://SYSTEM_FILES<br/>...PROTOCOL_BL/S<br/>///// ...2045<br/>&lt;ACCESS GRANTED&gt;
        </div>
        <div className="absolute right-10 font-space text-[8px] md:text-[10px] text-white/50 tracking-widest text-right hidden md:block">
          D://DATA_CORE<br/>...TODO_IMPORTADO<br/>///// ...2045<br/>&lt;FILE DECRYPTED&gt;
        </div>

        {/* Porcentaje */}
        <div className="absolute top-16 md:top-20 font-space text-3xl md:text-5xl font-bold tracking-widest">
          {Math.floor(progress)} <span className="text-xl md:text-3xl">%</span>
        </div>

        {/* Círculo Central Intro */}
        <button onClick={() => isReady && setHasEntered(true)} className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full flex flex-col items-center justify-center group transition-all duration-1000 ${isReady ? 'cursor-pointer opacity-100' : 'opacity-80 pointer-events-none'}`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d946ef] via-[#111] to-[#fcd34d] opacity-80 animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute inset-[15%] bg-[#0a0a0a] rounded-full flex flex-col items-center justify-center z-10 border border-white/5">
            <img src="/todoimportado/logo_todo_importado.png" alt="Logo" className="w-16 md:w-20 object-contain" />
            <span className="mt-3 text-[#fcd34d] text-[8px] font-space tracking-widest uppercase transition-all duration-500 group-hover:text-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              &lt;&lt;&lt; DISCOVER &gt;&gt;&gt;
            </span>
          </div>
        </button>

        <div className="absolute bottom-16 md:bottom-20 font-space text-[8px] md:text-[10px] text-white/70 tracking-[0.2em] uppercase text-center animate-pulse">
          TURN UP THE VOLUME, BABY. THE FUTURE WON'T WAIT.
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECCIÓN 1: HERO PRINCIPAL */}
      {/* ========================================================= */}
      <section className="relative w-full min-h-[1000px] h-[120vh] flex flex-col bg-gradient-to-b from-[#e3eaff] via-[#ffdae4] to-[#f4d1f9]">
        <div className="absolute inset-0 bg-dich-grid opacity-20 pointer-events-none"></div>

        {/* Navbar */}
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

        {/* Título Fragmentado */}
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

        {/* Canvas 3D Hero */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <Canvas camera={{ position: [0, 0, 9], fov: 40 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <Suspense fallback={null}>
              <ModeloHero />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        {/* Textos inferiores Hero */}
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
        </div>
      </section>

      {/* ========================================================= */}
      {/* ✈️ SECCIÓN 2: TRANSICIÓN AVIÓN + NUBES ✈️ */}
      {/* ========================================================= */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center z-30 -mt-20 -mb-20 overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4d1f9] to-[#f472b6] overflow-hidden">
            <img 
                src="https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2000&auto=format&fit=crop" 
                alt="Clouds background"
                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-dich-grid opacity-20"></div>
        </div>

        <div className="absolute w-full flex justify-center pointer-events-none opacity-20 z-10">
          <h2 className="font-syncopate font-bold text-[12vw] tracking-tighter text-black whitespace-nowrap">
            Todo Importado
          </h2>
        </div>

        <div className="absolute inset-0 pointer-events-none z-40">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 10, 5]} intensity={2} />
                <Suspense fallback={null}>
                    <ModeloAvion />
                    <Environment preset="night" />
                </Suspense>
            </Canvas>
        </div>

        <div className="absolute bottom-20 left-10 text-black font-space text-[10px] font-bold tracking-widest z-50 uppercase hidden md:block">
          &gt; DESTINATION: UNKNOWN<br/>&gt; FLIGHT: EM-2045<br/>&gt; STATUS: ASCENDING
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECCIÓN 3: PASARELA 3D CONTINUA (AMARILLO PASTEL) */}
      {/* ========================================================= */}
      <section className="relative w-full min-h-screen py-32 flex flex-col bg-gradient-to-b from-[#f472b6] via-[#ffe7cd] to-[#ffe7cd] border-t-2 border-black z-20">
        <div className="absolute inset-0 bg-dich-grid opacity-30 pointer-events-none"></div>

        <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col h-full">
          
          <div className="flex justify-between items-start mb-4 text-[10px] font-space tracking-widest font-bold uppercase border-b-2 border-black pb-4">
            <div className="flex flex-col gap-1">
              <span>✦ ✦ ✦</span>
              <span>DARE_TO_DISRUPT</span>
              <span>&lt;META CHARSET=...&gt;</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-black animate-pulse"></div>
               <span>PASARELA EM</span>
            </div>
          </div>
          
          <p className="text-right text-[8px] font-space tracking-widest text-gray-500 uppercase mb-8">
            {pasarelaPausada ? '> MODO DETALLE ACTIVO' : '> SISTEMA EN ROTACIÓN'}
          </p>

          {/* CONTENEDOR DE LA PASARELA 3D */}
          <div className="relative w-full flex-grow flex items-center justify-center mb-8 mt-4">
            
            <div className="absolute top-10 left-4 md:left-10 text-3xl md:text-5xl font-syncopate font-bold text-black/10 z-20 pointer-events-none">
              COLLECTION.01
            </div>
            
            {/* Canvas de la Pasarela Continua */}
            <div 
              className="w-full md:w-full h-[60vh] md:h-[70vh] relative z-10 cursor-crosshair"
              onPointerEnter={() => setPasarelaPausada(true)}
              onPointerLeave={() => setPasarelaPausada(false)}
            >
              <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 10, 5]} intensity={2} />
                <directionalLight position={[-5, 5, -5]} intensity={1} color="#f472b6" />
                <Suspense fallback={null}>
                  <EscenaPasarela isPaused={pasarelaPausada} />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>
          </div>

          <h2 className="font-syncopate font-bold text-4xl md:text-8xl tracking-tighter text-center uppercase text-black relative z-20 pointer-events-none -mt-16">
            IMPORTADO
          </h2>

          <div className="mt-8 flex justify-center z-30">
             <DichButton text="SHOP COLLECTION" />
          </div>

        </div>
      </section>

    </main>
  );
}