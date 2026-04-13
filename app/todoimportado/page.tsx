'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF, ContactShadows } from '@react-three/drei';
import SensorTrafico from '../components/SensorTrafico';

// === 1. COMPONENTE 3D INTERACTIVO (Carga tu modelo real) ===
function ModeloInteractivo() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Cargamos tu archivo .glb desde la carpeta public/todoimportado/
  const { scene } = useGLTF('/todoimportado/todoimportado_3d.glb');

  useFrame((state) => {
    if (groupRef.current) {
      // El modelo sigue suavemente al mouse
      const targetX = (state.pointer.x * Math.PI) / 6; 
      const targetY = (state.pointer.y * Math.PI) / 8; 

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        {/* Renderizamos tu modelo. Ajusta 'scale' y 'position' según el tamaño original de tu GLB */}
        <primitive 
          object={scene} 
          scale={2.2} 
          position={[0, -2, 0]} 
          rotation={[0, 0, 0]} 
        />
      </Float>
    </group>
  );
}

// === 2. PANTALLA DE CARGA (Loader) ===
const LoaderScreen = ({ progress, onComplete }: { progress: number, onComplete: () => void }) => {
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(onComplete, 800); 
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303] text-white font-mono transition-opacity duration-1000" style={{ opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? 'none' : 'auto' }}>
      <div className="text-center relative">
        <div className="absolute -top-12 -left-12 w-6 h-6 border-t border-l border-fuchsia-500/50"></div>
        <div className="absolute -top-12 -right-12 w-6 h-6 border-t border-r border-fuchsia-500/50"></div>
        
        <p className="text-5xl md:text-7xl mb-6 font-black tracking-tighter italic">
          {Math.floor(progress)}<span className="text-fuchsia-500">%</span>
        </p>
        <div className="w-72 h-[1px] bg-zinc-800 overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent animate-pulse transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="mt-6 text-[7px] tracking-[0.6em] uppercase text-zinc-500 animate-pulse">Initializing Virtual Hub</p>
      </div>
    </div>
  );
};

// === 3. INTERFAZ PRINCIPAL ===
export default function TodoImportadoBoutique() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 12;
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  const handleEnterClick = () => {
    setShowMainContent(true);
  };

  return (
    <main className="min-h-screen bg-[#050505] font-sans text-white overflow-hidden relative selection:bg-fuchsia-500">
      <SensorTrafico marca="TODO_IMPORTADO" />

      {!isLoaded && <LoaderScreen progress={loadProgress} onComplete={() => setIsLoaded(true)} />}

      {isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
          
          {/* HUD ELEMENTS */}
          <div className="absolute top-6 left-6 flex flex-col gap-1 hidden md:flex">
             <div className="text-[7px] font-mono text-fuchsia-500/80 tracking-[0.3em]">CORE.STATUS // OPTIMAL</div>
             <div className="w-24 h-[1px] bg-fuchsia-500/30"></div>
          </div>
          
          <div className="absolute bottom-6 left-6 text-[7px] font-mono text-white/30 tracking-[0.2em] hidden md:block">
            SECURITY PROTOCOL: ACTIVE <br/>
            ENCRYPTION: AES-256
          </div>

          {/* HEADER CON TU LOGO */}
          <header className={`w-full p-6 md:p-10 flex justify-between items-center transition-all duration-1000 transform pointer-events-auto ${showMainContent ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
            <button 
              onClick={() => window.location.href = '/boutiques'} 
              className="px-6 py-2 rounded-full text-[9px] font-black tracking-[0.2em] uppercase backdrop-blur-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all flex items-center gap-2"
            >
              ← Volver
            </button>
            
            {/* LOGO TODO IMPORTADO */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <h1 className="font-black text-xl md:text-2xl tracking-tighter uppercase italic leading-none">TODO IMPORTADO</h1>
                <p className="text-fuchsia-500 text-[8px] font-bold tracking-[0.4em] uppercase">E-Commerce Matrix</p>
              </div>
              <img src="/todoimportado/logo_todo_importado.png" alt="Logo" className="h-10 md:h-14 w-auto object-contain brightness-110 drop-shadow-[0_0_10px_rgba(217,70,239,0.3)]" />
            </div>
          </header>

          {/* CÍRCULO CENTRAL */}
          <div className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 ${showMainContent ? 'scale-150 opacity-0 pointer-events-none' : 'scale-100 opacity-100 pointer-events-auto'}`}>
             
             <button 
               onClick={handleEnterClick}
               className="group relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 flex items-center justify-center hover:border-fuchsia-500/50 transition-all duration-700 bg-black/40 backdrop-blur-md"
             >
                <div className="absolute inset-[-10px] rounded-full border border-fuchsia-500/20 animate-[pulse_3s_infinite]"></div>
                <div className="absolute inset-[-2px] rounded-full border-t-2 border-fuchsia-500 animate-spin" style={{ animationDuration: '4s' }}></div>
                <div className="absolute inset-[6px] rounded-full border-b border-cyan-400 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
                
                <span className="text-[10px] font-black tracking-[0.4em] uppercase group-hover:text-fuchsia-400 transition-colors pl-1">
                  ENTRAR
                </span>
                
                <div className="absolute inset-0 rounded-full bg-fuchsia-600/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             </button>

             <p className="mt-12 text-[8px] text-zinc-500 tracking-[0.5em] uppercase font-bold animate-pulse">
               Click to de-materialize
             </p>
          </div>

          {/* CATÁLOGO (Se activa al entrar) */}
          {showMainContent && (
             <div className="absolute inset-0 z-20 bg-[#030303] flex flex-col items-center justify-center pointer-events-auto animate-in fade-in zoom-in duration-1000">
                <img src="/todoimportado/logo_todo_importado.png" alt="Logo" className="h-20 mb-8 animate-bounce" />
                <h2 className="text-4xl font-black tracking-tighter uppercase italic mb-2">Holographic Store</h2>
                <p className="text-zinc-500 text-xs tracking-widest uppercase mb-12">System update in progress...</p>
                <button onClick={() => setShowMainContent(false)} className="px-10 py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-fuchsia-500 hover:text-white transition-all transform hover:scale-110">
                  Cerrar Sesión
                </button>
             </div>
          )}

        </div>
      )}

      {/* ESCENARIO 3D INTERACTIVO */}
      <div className={`absolute inset-0 z-0 transition-all duration-1000 ${showMainContent ? 'blur-3xl opacity-30 scale-110' : 'opacity-100 scale-100'}`}>
        <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#d946ef" />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#06b6d4" />
          
          <Suspense fallback={null}>
            <ModeloInteractivo />
            <Environment preset="night" />
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
          </Suspense>
        </Canvas>

        {/* Efecto de ruido y niebla cinemática */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
      </div>

    </main>
  );
}