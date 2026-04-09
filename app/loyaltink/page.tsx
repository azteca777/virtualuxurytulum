"use client";

import { useState, useEffect, Suspense } from "react";
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useVideoTexture } from '@react-three/drei';
import SensorTrafico from '../components/SensorTrafico';

// === ASSETS METAVERSO LOYALTINK ===
const URL_INTRO = "https://izuozfbhtyvjwrckummr.supabase.co/storage/v1/object/public/modelos-3d/video_entrada_loyaltink.mp4";
const URL_ENTRADA = "https://izuozfbhtyvjwrckummr.supabase.co/storage/v1/object/public/modelos-3d/entrada_loyaltink.mp4";
const URL_LOBY = "https://izuozfbhtyvjwrckummr.supabase.co/storage/v1/object/public/modelos-3d/loby_loyaltink.mp4";
const URL_DISENOS = "https://izuozfbhtyvjwrckummr.supabase.co/storage/v1/object/public/modelos-3d/disenos_loyaltink.mp4";
const URL_PRODUCCION = "https://izuozfbhtyvjwrckummr.supabase.co/storage/v1/object/public/modelos-3d/produccion_loyaltink.mp4";

// === ENTORNOS 360 (R3F) ===
function EntornoVideo360({ urlVideo, rotacion = [0, 0, 0] }: { urlVideo: string, rotacion?: [number, number, number] }) {
  const textura = useVideoTexture(urlVideo, { muted: true, loop: true, start: true });
  return (
    <mesh rotation={rotacion}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={textura} side={THREE.BackSide} />
    </mesh>
  );
}

// === NAVEGACIÓN (Flechas R3F) ===
function FlechaStreetView({ posicion, angulo = 0, onClick, hoverText = '' }: { posicion: [number, number, number], angulo?: number, onClick: () => void, hoverText?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <group 
      position={posicion} 
      rotation={[-Math.PI / 2, 0, angulo]}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={onClick}
    >
      <mesh>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial color="white" transparent opacity={hovered ? 0.3 : 0.1} />
      </mesh>
      <mesh position={[0, 0.3, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[0.4, 3]} />
        <meshBasicMaterial color="#10b981" transparent opacity={hovered ? 1 : 0.8} /> 
      </mesh>
      {hovered && hoverText && (
        <Html center style={{ pointerEvents: 'none' }}>
          <div className="px-4 py-2 bg-black/90 text-white font-mono text-xs rounded-lg border border-white/20 translate-y-[-60px] whitespace-nowrap">
            {hoverText.toUpperCase()}
          </div>
        </Html>
      )}
    </group>
  );
}

// === MOTOR DE RECORRIDO LOYALTINK ===
function RecorridoLoyaltink() {
  const [nodoActual, setNodoActual] = useState(1);

  return (
    <Canvas camera={{ position: [0, 0, 0.1], fov: 70 }}>
      <OrbitControls enableZoom={true} rotateSpeed={-0.5} minDistance={0.1} maxDistance={4} />
      <Suspense fallback={
        <Html center>
          <div className="text-[#06b6d4] font-mono animate-pulse tracking-[0.2em] bg-black/80 px-6 py-3 rounded-full backdrop-blur-md border border-[#06b6d4]/30 whitespace-nowrap">
            SINCRONIZANDO ENTORNO...
          </div>
        </Html>
      }>
        
        {/* NODO 1: ENTRADA */}
        {nodoActual === 1 && (
          <group>
            <EntornoVideo360 urlVideo={URL_ENTRADA} rotacion={[0, -Math.PI / 2, 0]} />
            <FlechaStreetView posicion={[5, -4, 4]} onClick={() => setNodoActual(2)} hoverText="Entrar al Lobby" />
          </group>
        )}

        {/* NODO 2: LOBBY */}
        {nodoActual === 2 && (
          <group>
            <EntornoVideo360 urlVideo={URL_LOBY} rotacion={[0, -Math.PI / 2, 0]} />
            <FlechaStreetView posicion={[3, -4, -7]} angulo={Math.PI} onClick={() => setNodoActual(1)} hoverText="Volver a la Entrada" />
            <FlechaStreetView posicion={[-1, -4, 8]} onClick={() => setNodoActual(3)} hoverText="Zona de Diseños" />
          </group>
        )}

        {/* NODO 3: DISEÑOS */}
        {nodoActual === 3 && (
          <group>
            <EntornoVideo360 urlVideo={URL_DISENOS} rotacion={[0, -Math.PI / 2, 0]} />
            <FlechaStreetView posicion={[6, -4, -8]} angulo={Math.PI} onClick={() => setNodoActual(2)} hoverText="Volver al Lobby" />
            <FlechaStreetView posicion={[-4, -4, 6]} onClick={() => setNodoActual(4)} hoverText="Zona de Producción" />
          </group>
        )}

        {/* NODO 4: PRODUCCIÓN */}
        {nodoActual === 4 && (
          <group>
            <EntornoVideo360 urlVideo={URL_PRODUCCION} rotacion={[0, -Math.PI / 2, 0]} />
            <FlechaStreetView posicion={[-5, -4, 7]} angulo={Math.PI} onClick={() => setNodoActual(3)} hoverText="Volver a Diseños" />
          </group>
        )}

      </Suspense>
    </Canvas>
  );
}

export default function LoyaltinkBrigade() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  // === ESTADOS DEL METAVERSO ===
  const [mostrarMetaverso, setMostrarMetaverso] = useState(false);
  const [introMetaversoTerminada, setIntroMetaversoTerminada] = useState(false); // Controla la transición de la intro
  const [mostrarFotos, setMostrarFotos] = useState(false); // Transición de video a fotos en el Hero

  // === ESTADOS DE LA CALCULADORA PRO ===
  const [calcTab, setCalcTab] = useState("cost");
  const [location, setLocation] = useState("Tulum Centro");
  const [colorType, setColorType] = useState("Blanco y Negro");
  const [size, setSize] = useState(15);
  const [style, setStyle] = useState("Neo-Japonés");
  const [experience, setExperience] = useState("Establecido");
  const [painTolerance, setPainTolerance] = useState("Promedio");
  const [complexity, setComplexity] = useState("Moderada");

  // Temporizador para la transición de fotos en el home
  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarFotos(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // --- LÓGICA DE CÁLCULO DE COSTO ---
  const getEstimatedCost = () => {
    let base = 80;
    let sizeMultiplier = size * 8;
    let colorMult = colorType === "Color" ? 1.3 : 1;
    let expMult = 1;
    if (experience === "Aprendiz") expMult = 0.6;
    if (experience === "Junior") expMult = 1.0;
    if (experience === "Establecido") expMult = 1.5;
    if (experience === "Master") expMult = 2.5;

    let total = (base + sizeMultiplier) * colorMult * expMult;
    let min = Math.floor(total * 0.85);
    let max = Math.floor(total * 1.15);

    return `$${min} - $${max}`;
  };

  // --- LÓGICA DE CÁLCULO DE TIEMPO ---
  const getEstimatedTime = () => {
    let baseTime = 1;
    let sizeTime = size * 0.15;
    let colorMult = colorType === "Color" ? 1.4 : 1;
    let compMult = 1;
    if (complexity === "Simple") compMult = 0.7;
    if (complexity === "Moderada") compMult = 1.0;
    if (complexity === "Compleja") compMult = 1.5;
    if (complexity === "Muy Compleja") compMult = 2.2;

    let painMult = 1;
    if (painTolerance === "Sensible") painMult = 1.3;
    if (painTolerance === "Alta") painMult = 0.9;

    let totalHrs = (baseTime + sizeTime) * colorMult * compMult * painMult;
    let minHrs = Math.max(1, Math.floor(totalHrs * 0.8));
    let maxHrs = Math.ceil(totalHrs * 1.2);

    return `${minHrs} - ${maxHrs} hrs`;
  };

  return (
    <div className="min-h-screen bg-[#111111] text-gray-200 font-sans selection:bg-[#8B5CF6] selection:text-white overflow-x-hidden relative">
      <SensorTrafico marca="LOYALTINK" />

      {/* 🔮 VENTANA INMERSIVA DEL METAVERSO (R3F) */}
      {mostrarMetaverso && (
        <div className="fixed inset-0 z-[1000] w-full h-full bg-black flex flex-col items-center justify-center animate-[fadeIn_0.5s_ease-in-out]">
          
          {/* BOTÓN DE CIERRE FLOTANTE */}
          <button 
            onClick={() => {
              setMostrarMetaverso(false);
              setIntroMetaversoTerminada(false); // Reinicia la intro por si vuelven a entrar
            }} 
            className="absolute top-6 right-6 md:top-10 md:right-10 z-[1010] flex items-center gap-2 px-6 py-3 bg-black/60 border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-900 transition-colors backdrop-blur-md"
          >
            ✕ Cerrar Metaverso
          </button>

          {/* SECUENCIA LÓGICA DEL METAVERSO */}
          {!introMetaversoTerminada ? (
            /* 1. VIDEO DE INTRODUCCIÓN LINEAL */
            <video 
              src={URL_INTRO}
              autoPlay 
              muted 
              playsInline
              onEnded={() => setIntroMetaversoTerminada(true)} // Cambia al entorno 360 al terminar
              className="w-full h-full object-cover"
            />
          ) : (
            /* 2. ENTORNO 360° INTERACTIVO CON REACT THREE FIBER */
            <div className="w-full h-full relative animate-[fadeIn_1s_ease-in-out]">
              {/* Overlay UI para guiar al usuario */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center opacity-80">
                <span className="text-white text-[10px] md:text-xs font-bold tracking-widest uppercase bg-black/60 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 shadow-xl">
                  👆 Arrastra para explorar / Clic a las flechas para caminar
                </span>
              </div>

              {/* El componente R3F que contiene el recorrido */}
              <RecorridoLoyaltink />
            </div>
          )}
          
        </div>
      )}

      {/* NAVEGACIÓN */}
      <nav className="fixed w-full z-50 bg-white/5 backdrop-blur-lg border-b border-white/10 flex justify-between items-center px-4 py-3 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 bg-[#8B5CF6] flex items-center justify-center overflow-hidden border-2 border-white/20 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.2)]">
             <img src="/loyaltink/logo_loyaltink.jpeg" alt="Loyaltink" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-white leading-tight uppercase tracking-[-0.1em]" style={{ fontFeatureSettings: '"kern" 0' }}>LOYALTINK BRIGADE</span>
            <span className="text-xs text-zinc-500 tracking-[0.2em] uppercase">Future Ink. Ancient Soul.</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => window.location.href = '/boutiques'} className="hidden md:block text-[10px] font-semibold tracking-widest text-zinc-400 hover:text-white uppercase transition-colors">
            ← VOLVER
          </button>
          <button className="text-white hover:text-[#8B5CF6] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-32 pb-24 px-6 flex flex-col items-center text-center min-h-[90vh] justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="w-full h-full relative transition-opacity duration-1000">
              <video 
                src="/loyaltink/hero_bg.mp4" 
                autoPlay 
                muted 
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${mostrarFotos ? 'opacity-0' : 'opacity-100'}`}
              />
              
              <div className={`absolute inset-0 w-full h-full flex transition-opacity duration-1000 ${mostrarFotos ? 'opacity-100' : 'opacity-0'}`}>
                 <img src="/loyaltink/chuloski.jpeg" alt="Chuloski" className="w-1/4 h-full object-cover border-r border-zinc-800" />
                 <img src="/loyaltink/rafa.jpeg" alt="Rafa" className="w-1/4 h-full object-cover border-r border-zinc-800" />
                 <img src="/loyaltink/prana.jpeg" alt="Plana" className="w-1/4 h-full object-cover border-r border-zinc-800" />
                 <img src="/loyaltink/nai.jpeg" alt="Nai" className="w-1/4 h-full object-cover" />
              </div>
            </div>
        </div>

        <div className="relative z-20 max-w-4xl flex flex-col items-center">
          <span className="inline-block py-1 px-6 rounded-full border border-[#06b6d4] text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-32 shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-black/50 backdrop-blur-sm">
            AGENDA ABIERTA
          </span>

          <div className="flex flex-col w-full sm:w-auto gap-4">
            <button className="w-full sm:w-80 bg-white text-[#8B5CF6] font-bold py-4 px-8 transition-all uppercase tracking-[0.2em] text-xs hover:bg-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              RESERVAR SESIÓN
            </button>
            <button 
              onClick={() => setMostrarMetaverso(true)} 
              className="w-full sm:w-80 border border-white hover:bg-white hover:text-black text-white font-bold py-4 px-8 transition-all uppercase tracking-[0.2em] text-xs shadow-lg backdrop-blur-sm"
            >
              VER GALERÍA 360
            </button>
          </div>
        </div>
      </header>

      {/* 🔥 CALCULADORA PRO TIPO SAAS 🔥 */}
      <section className="py-12 md:py-24 px-4 bg-[#0a0a0a] border-t border-[#222]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-2 md:mb-4">ESTIMADOR DE TATUAJES PRO</h2>
            <p className="text-xs md:text-sm text-zinc-400">Calcula el costo y tiempo de tu pieza en segundos.</p>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl border border-[#333] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            
            {/* PANEL IZQUIERDO: CONTROLES */}
            <div className="flex-1 border-r border-[#333]">
              <div className="flex border-b border-[#333] bg-[#141414]">
                <button 
                  onClick={() => setCalcTab('cost')}
                  className={`flex-1 py-3 md:py-5 text-xs md:text-sm font-bold tracking-wider transition-colors ${calcTab === 'cost' ? 'text-white border-b-2 border-[#06b6d4] bg-[#1a1a1a]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#1a1a1a]'}`}
                >
                  Costo del Tatuaje
                </button>
                <button 
                  onClick={() => setCalcTab('time')}
                  className={`flex-1 py-3 md:py-5 text-xs md:text-sm font-bold tracking-wider transition-colors ${calcTab === 'time' ? 'text-white border-b-2 border-[#8B5CF6] bg-[#1a1a1a]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#1a1a1a]'}`}
                >
                  Tiempo de Sesión
                </button>
              </div>

              <div className="p-4 sm:p-6 md:p-8 space-y-5 md:space-y-8">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {calcTab === 'cost' ? 'Calculadora de Costos' : 'Estimador de Tiempos'}
                  </h3>
                  <p className="text-[10px] md:text-xs text-zinc-500 leading-tight">
                    {calcTab === 'cost' 
                      ? 'Estima tu tatuaje basado en tamaño, estilo, color y experiencia del artista.' 
                      : 'Estima la duración basada en tamaño, complejidad, estilo y tolerancia al dolor.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {calcTab === 'cost' ? (
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold text-zinc-400 mb-2">Ubicación del Estudio</label>
                      <select 
                        value={location} onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-[#222] border border-[#333] text-white text-xs md:text-sm rounded-lg p-2 md:p-3 outline-none focus:border-[#06b6d4]"
                      >
                        <option>Playa del Carmen</option>
                        <option>Tulum</option>
                        <option>Cancún</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold text-zinc-400 mb-2">Tolerancia al Dolor</label>
                      <div className="flex bg-[#222] rounded-lg p-1 border border-[#333]">
                        {["Sensible", "Promedio", "Alta"].map((p) => (
                          <button 
                            key={p} onClick={() => setPainTolerance(p)}
                            className={`flex-1 py-1.5 md:py-2 text-[10px] md:text-xs font-bold rounded-md transition-colors ${painTolerance === p ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] md:text-xs font-bold text-zinc-400 mb-2">Tipo de Color</label>
                    <div className="flex bg-[#222] rounded-lg p-1 border border-[#333]">
                      {["Blanco y Negro", "Color"].map((c) => (
                        <button 
                          key={c} onClick={() => setColorType(c)}
                          className={`flex-1 py-1.5 md:py-2 text-[10px] md:text-xs font-bold rounded-md transition-colors ${colorType === c ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-[10px] md:text-xs font-bold text-zinc-400">Tamaño del Tatuaje</label>
                    <span className="text-[9px] md:text-[10px] text-zinc-600 border border-[#333] px-2 py-1 rounded">Usar cm</span>
                  </div>
                  <p className="text-white text-sm md:text-base font-bold mb-3 md:mb-4">Tamaño: {size} cm²</p>
                  
                  <input 
                    type="range" min="1" max="100" value={size} 
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#8B5CF6] mb-4 md:mb-6"
                  />
                  
                  <div className="w-full h-20 md:h-32 bg-[#222] border border-[#333] rounded-lg flex items-center justify-center relative overflow-hidden">
                     <div 
                        className="border-2 border-dashed border-[#06b6d4]/50 flex items-center justify-center transition-all"
                        style={{ width: `${Math.min(100, Math.max(10, size))}%`, height: `${Math.min(100, Math.max(10, size))}%` }}
                     >
                       <span className="text-zinc-600 text-[10px] md:text-xs">Área Visual</span>
                     </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-zinc-400 mb-2 md:mb-3">Estilo del Tatuaje ?</label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-1.5 md:gap-2">
                    {["Línea Fina", "Blackwork", "Tradicional", "Ilustrativo", "Realismo", "Acuarela", "Neo-Japonés", "Geométrico", "Tribal", "Biomecánico", "Retrato", "Puntillismo"].map((s) => (
                      <button 
                        key={s} onClick={() => setStyle(s)}
                        className={`py-2 md:py-3 text-[9px] md:text-[10px] font-bold rounded-lg border transition-all ${style === s ? 'bg-[#333] border-[#8B5CF6] text-white shadow-[0_0_10px_rgba(139,92,246,0.2)]' : 'bg-[#222] border-[#333] text-zinc-500 hover:border-[#444] hover:text-zinc-300'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  {calcTab === 'cost' ? (
                    <>
                      <label className="block text-[10px] md:text-xs font-bold text-zinc-400 mb-2 md:mb-3">Experiencia del Artista</label>
                      <div className="grid grid-cols-2 gap-2 md:gap-3">
                        {[
                          { n: "Aprendiz", t: "0-2 años" }, { n: "Junior", t: "2-5 años" }, 
                          { n: "Establecido", t: "5-10 años" }, { n: "Master", t: "10+ años" }
                        ].map((exp) => (
                          <button 
                            key={exp.n} onClick={() => setExperience(exp.n)}
                            className={`p-2 md:p-4 flex flex-col items-center rounded-lg border transition-all ${experience === exp.n ? 'bg-[#333] border-[#06b6d4] text-white shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'bg-[#222] border-[#333] text-zinc-500 hover:border-[#444]'}`}
                          >
                            <span className="text-xs md:text-sm font-bold">{exp.n}</span>
                            <span className="text-[9px] md:text-[10px] opacity-60">{exp.t}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <label className="block text-[10px] md:text-xs font-bold text-zinc-400 mb-2 md:mb-3">Complejidad del Diseño</label>
                      <div className="grid grid-cols-2 gap-2 md:gap-3">
                        {[
                          { n: "Simple", t: "Formas básicas, sin detalle" }, { n: "Moderada", t: "Varios elementos, sombras" }, 
                          { n: "Compleja", t: "Detalles finos, texturas" }, { n: "Muy Compleja", t: "Fotorrealismo, multicapa" }
                        ].map((comp) => (
                          <button 
                            key={comp.n} onClick={() => setComplexity(comp.n)}
                            className={`p-2 md:p-4 flex flex-col items-center text-center rounded-lg border transition-all ${complexity === comp.n ? 'bg-[#333] border-[#8B5CF6] text-white shadow-[0_0_10px_rgba(139,92,246,0.2)]' : 'bg-[#222] border-[#333] text-zinc-500 hover:border-[#444]'}`}
                          >
                            <span className="text-xs md:text-sm font-bold">{comp.n}</span>
                            <span className="text-[9px] md:text-[10px] opacity-60">{comp.t}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* PANEL DERECHO: RESULTADOS */}
            <div className="w-full lg:w-[380px] bg-[#141414] p-4 sm:p-6 md:p-8 flex flex-col">
              <div className="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 md:p-6 flex-1 flex flex-col shadow-inner">
                <h4 className="text-white font-bold mb-4 md:mb-8 text-sm md:text-base">
                  {calcTab === 'cost' ? 'Costo Estimado' : 'Tiempo Estimado'}
                </h4>
                
                <div className="flex-1 flex justify-center items-center mb-6 md:mb-8">
                  <div className="w-36 h-36 md:w-48 md:h-48 rounded-full border border-[#333] bg-[#222] flex flex-col items-center justify-center shadow-lg relative">
                     <div className={`absolute inset-0 rounded-full blur-xl opacity-20 ${calcTab === 'cost' ? 'bg-[#06b6d4]' : 'bg-[#8B5CF6]'}`}></div>
                     <span className="text-2xl md:text-3xl font-black text-white relative z-10">
                       {calcTab === 'cost' ? getEstimatedCost() : getEstimatedTime()}
                     </span>
                     <span className="text-[10px] md:text-xs text-zinc-500 mt-0 md:mt-1 relative z-10">
                       {calcTab === 'cost' ? 'USD' : 'Aprox'}
                     </span>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 text-[10px] md:text-xs">
                  <div className="flex justify-between border-b border-[#333] pb-2">
                    <span className="text-zinc-500">Tamaño</span><span className="text-white font-bold">{size} cm²</span>
                  </div>
                  <div className="flex justify-between border-b border-[#333] pb-2">
                    <span className="text-zinc-500">Estilo</span><span className="text-white font-bold">{style}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#333] pb-2">
                    <span className="text-zinc-500">Color</span><span className="text-white font-bold">{colorType}</span>
                  </div>
                  {calcTab === 'cost' ? (
                    <div className="flex justify-between border-b border-[#333] pb-2">
                      <span className="text-zinc-500">Artista</span><span className="text-white font-bold">{experience}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between border-b border-[#333] pb-2">
                        <span className="text-zinc-500">Complejidad</span><span className="text-white font-bold">{complexity}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#333] pb-2">
                        <span className="text-zinc-500">Tolerancia</span><span className="text-white font-bold">{painTolerance}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#333]">
                  <p className="text-[9px] md:text-[10px] text-white font-bold mb-2 md:mb-3 uppercase tracking-wider">
                    {calcTab === 'cost' ? 'Factores de Precio' : 'Factores de Tiempo'}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 md:gap-2 text-[8px] md:text-[9px] text-zinc-500">
                    {calcTab === 'cost' ? (
                      <>
                        <p>• Tarifas y popularidad</p>
                        <p>• Ubicación del estudio</p>
                        <p>• Complejidad del diseño</p>
                        <p>• Ubicación en el cuerpo</p>
                        <p>• Número de sesiones</p>
                        <p>• Cargo mínimo local</p>
                      </>
                    ) : (
                      <>
                        <p>• Velocidad del artista</p>
                        <p>• Tolerancia al dolor</p>
                        <p>• Número de descansos</p>
                        <p>• Tipo y estado de piel</p>
                        <p>• Aplicación de stencil</p>
                        <p>• Cambios de tintas</p>
                      </>
                    )}
                  </div>
                  <p className="text-[8px] md:text-[9px] text-zinc-600 text-center mt-4 md:mt-6">Powered by ViOs Code</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MEET THE ARTISTS */}
      <section className="py-24 px-6 bg-[#111111] border-t border-[#222]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">EL COLECTIVO</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#8B5CF6] uppercase tracking-tighter mb-6">CONOCE A LOS ARTISTAS</h2>
          <p className="text-zinc-400 mb-20 max-w-xl mx-auto">
            Artistas de élite. Visiones únicas. Una creencia compartida: el arte del tatuaje no tiene techo.
          </p>

          <div className="space-y-32">
            {/* ARTISTA 1: CHULOSKI */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#222] shadow-[0_0_30px_rgba(139,92,246,0.15)] mb-8 bg-zinc-800">
                <img src="/loyaltink/perfil_chuloski.png" alt="Chuloski" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">JOEL SKREPNIK "CHULOSKI"</h3>
              <p className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">BLACKWORK • NEO-JAPONÉS • TRADICIONAL</p>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-6">
                Originario de Buenos Aires, Argentina. Chuloski es un maestro del alto contraste, fusionando fondos de blackwork extremo con iconografía del tatuaje neo-japonés y tradicional. Sus piezas de gran escala destacan por deidades imponentes y máscaras Hannya, utilizando negros sólidos y profundos que hacen estallar colores clásicos.
              </p>
              <a href="https://www.instagram.com/chuloski_?igsh=MmZ4MXB0eXZzOGln" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-colors cursor-pointer">
                IG
              </a>
            </div>

            {/* ARTISTA 2: RAFA */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#222] shadow-[0_0_30px_rgba(6,182,212,0.15)] mb-8 bg-zinc-800">
                 <img src="/loyaltink/perfil_rafa.png" alt="Rafa Moldess" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">RAFA MOLDESS "RAFA"</h3>
              <p className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">BLACK & GREY • REALISMO • NEO-TRIBAL</p>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-6">
                Originario de Córdoba, Argentina. Rafa es un artista sumamente versátil que domina desde el Realismo en Black & Grey hasta el Blackwork y el Neo-Tribal. Su habilidad para adaptar la técnica le permite crear piezas con un nivel de detalle fotográfico o composiciones de trazos agresivos y alto contraste.
              </p>
              <a href="https://www.instagram.com/rafamoldess.tattooer?igsh=MWx5NnVoY2J3OXIyMQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-colors cursor-pointer">
                IG
              </a>
            </div>

            {/* ARTISTA 3: PRANA */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#222] shadow-[0_0_30px_rgba(139,92,246,0.15)] mb-8 bg-zinc-800">
                 <img src="/loyaltink/perfil_prana.png" alt="Lautaro Bordesse" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">LAUTARO BORDESSE "PRANA"</h3>
              <p className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">REALISMO ÉPICO • ESTATUARIA • MITOLOGÍA</p>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-6">
                Originario de Córdoba, Argentina. El trabajo de Prana eleva el realismo Black & Grey a una escala monumental. Se especializa en composiciones épicas inspiradas en la mitología nórdica y grecorromana, creando tatuajes que parecen esculpidos en piedra.
              </p>
              <a href="https://www.instagram.com/pranatattoo_?igsh=MThrMmdram02ZHkwNA==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-colors cursor-pointer">
                IG
              </a>
            </div>

            {/* ARTISTA 4: NAI */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#222] shadow-[0_0_30px_rgba(139,92,246,0.15)] mb-8 bg-zinc-800">
                 <img src="/loyaltink/perfil_nai.png" alt="Naiara" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">NAIARA "NAI"</h3>
              <p className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">FINE LINE • BOTÁNICO • RED INK</p>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-6">
                Originaria de Tierra del Fuego, Argentina. Nai se destaca por su extrema delicadeza y precisión. Su estilo se enfoca en el Fine Line, composiciones florales y piezas ilustrativas con sombras muy suaves. Domina la tendencia del Red Ink, creando diseños minimalistas y elegantes.
              </p>
              <a href="https://www.instagram.com/tattoonaink?igsh=ODV3ZTFxM2F0eDdx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-colors cursor-pointer">
                IG
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STYLES */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-t border-[#222]">
         <div className="max-w-5xl mx-auto text-center">
            <span className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">NUESTROS ESTILOS</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#8B5CF6] uppercase tracking-tighter mb-6 leading-none">
              DONDE LA<br/>TRADICIÓN<br/>SE ENCUENTRA CON EL<br/>MAÑANA
            </h2>
            <p className="text-zinc-400 mb-20 max-w-xl mx-auto">
              Estilos distintos unidos por una ejecución atrevida, raíces culturales y la negativa a ir a lo seguro.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                { title: 'FUSIÓN NEO-JAPONESA', desc: 'Sujetos tradicionales Irezumi reinventados con patrones de circuitos geométricos, efectos glitch y cambios de color holográficos.', icon: '☯' },
                { title: 'BIOMECÁNICA', desc: 'Ilusiones de piel rasgada que revelan maquinaria, circuitos y anatomía alienígena debajo. Profundidad hiperdetallada y texturas metálicas.', icon: '👁' },
                { title: 'REALISMO ÉPICO', desc: 'Composiciones monumentales en Black & Grey inspiradas en estatuaria clásica, mitología y figuras históricas con volumen tridimensional.', icon: '🏛' },
                { title: 'REALISMO CYBERPUNK', desc: 'Retratos futuristas y paisajes urbanos renderizados con precisión fotorrealista y atmósfera iluminada por neón.', icon: '♦' },
                { title: 'BLACKWORK', desc: 'Contraste extremo y saturación profunda de tinta negra. Trabajos geométricos, tribales modernos y texturas sólidas.', icon: '✒' },
                { title: 'PROYECTOS A GRAN ESCALA', desc: 'Mangas completas, piezas de espalda y trajes de cuerpo. Épicas de múltiples sesiones que cuentan historias a través de la piel.', icon: '★' },
              ].map((style, idx) => (
                <div key={idx} className="bg-[#111111] border border-[#222] p-8 hover:border-[#8B5CF6] transition-colors group">
                  <div className="w-12 h-12 border border-[#333] flex items-center justify-center text-xl mb-6 text-white group-hover:text-[#8B5CF6] transition-colors">
                    {style.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">{style.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{style.desc}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* CLIENT STORIES */}
      <section className="py-24 px-6 bg-[#111111] border-t border-[#222]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">TESTIMONIOS</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#8B5CF6] uppercase tracking-tighter mb-6">HISTORIAS DE CLIENTES</h2>
          <p className="text-zinc-400 mb-16">Mira lo que dicen nuestros clientes sobre su experiencia.</p>

          <div className="space-y-6 text-left">
            {[
              { text: "Chuloski convirtió mi espalda en una verdadera obra de arte. El contraste del blackwork con la máscara Hannya es increíble. La gente literalmente me detiene en la calle.", name: "Marcus L.", tag: "Espalda Completa Neo-Japonesa" },
              { text: "Rafa logró capturar la mirada exacta de mi perro en el retrato. El nivel de realismo en Black & Grey es de otro mundo, parece que la piel va a respirar.", name: "Tanya K.", tag: "Retrato Realista" },
              { text: "Volé desde Nueva York para hacerme una manga mitológica con Prana. Valió la pena cada milla. El volumen de las sombras y el Zeus que diseñó parecen tallados en mármol. Este tipo es de verdad.", name: "Jordan W.", tag: "Manga Estatuaria Clásica" }
            ].map((testi, idx) => (
              <div key={idx} className="bg-[#0a0a0a] p-10 border border-[#222] relative">
                <span className="text-[#06b6d4] text-6xl absolute top-6 left-6 font-serif opacity-30">"</span>
                <p className="text-zinc-300 italic leading-relaxed mb-8 relative z-10">{testi.text}</p>
                <div className="relative z-10">
                  <p className="text-white font-bold text-sm mb-1">{testi.name}</p>
                  <p className="text-zinc-600 text-[10px] uppercase tracking-widest">{testi.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-[#8B5CF6] text-center flex flex-col items-center">
         <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">¿LISTO PARA SUBIR DE NIVEL?</h2>
         <p className="text-white/80 max-w-lg mb-10 leading-relaxed">
           Nuestros libros están abiertos para consultas y sesiones. Trabajamos solo con cita previa para darle a cada cliente el enfoque y el tiempo que su pieza merece.
         </p>
         <button className="bg-white text-[#8B5CF6] font-bold py-4 px-10 uppercase tracking-[0.2em] text-xs hover:bg-zinc-100 transition-colors w-full sm:w-auto">
           SOLICITAR UNA CONSULTA
         </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] pt-20 pb-10 px-6 border-t border-[#222]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <span className="text-xl font-bold tracking-widest text-white block mb-4">NEON RONIN</span>
            <p className="text-zinc-500 text-xs leading-relaxed">Tatuajes personalizados premium y arte corporal. Artistas de élite, estudio profesional, resultados excepcionales.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">CONTACTO</h4>
            <div className="text-zinc-500 text-xs space-y-2">
              <p>777 Spring Street</p>
              <p>Unit B</p>
              <p>Arts District</p>
              <p>Tulum</p>
              <p>Quintana Roo</p>
              <p className="pt-4">(984) 555-0777</p>
              <p>book@loyaltink.example</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">HORARIOS</h4>
            <div className="text-zinc-500 text-xs space-y-2">
              <p>Lun: Cerrado</p>
              <p>Mar: 1pm-10pm</p>
              <p>Mié: 1pm-10pm</p>
              <p>Jue: 1pm-10pm</p>
              <p>Vie: 1pm-11pm</p>
              <p>Sáb: 12pm-11pm</p>
              <p>Dom: 12pm-8pm</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">ENLACES RÁPIDOS</h4>
            <div className="text-zinc-500 text-xs space-y-3 flex flex-col items-start">
              <button className="hover:text-white transition-colors">Sobre Nosotros</button>
              <button className="hover:text-white transition-colors">Portafolio</button>
              <button className="hover:text-white transition-colors">Servicios y Precios</button>
              <button className="hover:text-white transition-colors">Cuidados Posteriores</button>
              <button className="hover:text-white transition-colors">Políticas del Estudio</button>
              <button className="hover:text-white transition-colors">Agendar Consulta</button>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-[#222] pt-8">
          <p className="text-zinc-600 text-[10px]">© 2026 Loyaltink Brigade. Todos los derechos reservados. Creado por ViOs Code.</p>
        </div>
      </footer>

      {/* 🔮 ESFERA MULTIVERSO FLOTANTE */}
      <button 
        onClick={() => setMostrarMetaverso(true)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] group flex flex-col items-center hover:scale-105 transition-transform duration-300"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#06b6d4] shadow-[0_0_20px_rgba(6,182,212,0.5)] bg-black relative">
          <video 
            src="/loyaltink/esfera_vios_metaverso.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[#06b6d4]/40 mix-blend-screen pointer-events-none"></div>
        </div>
        
        <span className="absolute -bottom-8 bg-[#111] border border-[#333] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Entrar al Metaverso
        </span>
      </button>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  );
}