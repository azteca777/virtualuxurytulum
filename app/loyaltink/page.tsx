"use client";

import { useState, useEffect, Suspense } from "react";
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useVideoTexture } from '@react-three/drei';
import Link from 'next/link';
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
  
  // === ESTADOS DE GLOBALIZACIÓN ===
  const [idioma, setIdioma] = useState("es");
  const [moneda, setMoneda] = useState("MXN");

  // === ESTADOS DEL METAVERSO ===
  const [mostrarMetaverso, setMostrarMetaverso] = useState(false);
  const [introMetaversoTerminada, setIntroMetaversoTerminada] = useState(false);
  const [mostrarFotos, setMostrarFotos] = useState(false);

  // === ESTADO DEL MENÚ HAMBURGUESA ===
  const [menuAbierto, setMenuAbierto] = useState(false);

  // === ESTADOS DE LA CALCULADORA PRO ===
  const [calcTab, setCalcTab] = useState("cost");
  const [location, setLocation] = useState("Tulum Centro");
  const [colorType, setColorType] = useState("Blanco y Negro");
  const [size, setSize] = useState(15);
  const [style, setStyle] = useState("Neo-Japonés");
  const [painTolerance, setPainTolerance] = useState("Promedio");
  const [complexity, setComplexity] = useState("Moderada");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarFotos(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Función para manejar el scroll suave al hacer clic en el menú
  const scrollToSection = (id: string) => {
    setMenuAbierto(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- LÓGICA DE CÁLCULO DE COSTO MULTIMONEDA ---
  const getEstimatedCost = () => {
    let baseUSD = 80;
    let sizeMultiplierUSD = size * 8;
    let colorMult = colorType === "Color" ? 1.3 : 1;

    let totalUSD = (baseUSD + sizeMultiplierUSD) * colorMult;
    let minUSD = totalUSD * 0.85;
    let maxUSD = totalUSD * 1.15;

    // Tasa de cambio base
    const TASA_MXN = 18;

    if (moneda === 'MXN') {
      return `$${Math.floor(minUSD * TASA_MXN).toLocaleString()} - $${Math.floor(maxUSD * TASA_MXN).toLocaleString()}`;
    } else {
      return `$${Math.floor(minUSD).toLocaleString()} - $${Math.floor(maxUSD).toLocaleString()}`;
    }
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

  const whatsappNumber = "529984760310"; 
  const whatsappMessage = encodeURIComponent(idioma === 'es' ? "[NUEVO LEAD: LOYALTINK] Hola, me gustaría agendar una cita o recibir más información." : "[NEW LEAD: LOYALTINK] Hi, I would like to book an appointment or get more information.");

  // COMPONENTE DE BOTÓN DE IDIOMA
  const BotonIdioma = () => (
    <button 
      onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')} 
      className="flex items-center gap-2 px-4 py-1.5 border border-[#8B5CF6] rounded-full text-[10px] tracking-widest hover:bg-[#8B5CF6] hover:text-white transition-all bg-black/50 text-white font-bold z-10 backdrop-blur-md"
    >
      <span className="text-sm leading-none">{idioma === 'es' ? '🇬🇧' : '🇲🇽'}</span>
      <span>{idioma === 'es' ? 'ENG' : 'ESP'}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#111111] text-gray-200 font-sans selection:bg-[#8B5CF6] selection:text-white overflow-x-hidden relative">
      <SensorTrafico marca="LOYALTINK" />

      {/* 💬 BOTÓN FLOTANTE WHATSAPP */}
      <a 
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[100] flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 group"
        aria-label="Contactar por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10">
          <path d="M12.031 0C5.385 0 0 5.384 0 12.032c0 2.125.552 4.195 1.603 6.012L.266 24l6.104-1.583c1.745.941 3.738 1.442 5.661 1.442 6.646 0 12.031-5.384 12.031-12.031C24 5.384 18.677 0 12.031 0zm3.626 17.275c-.544 1.545-2.616 2.106-3.837 1.839-1.22-.266-3.228-1.39-5.46-3.62-2.23-2.23-3.353-4.24-3.619-5.46-.267-1.22.294-3.293 1.839-3.837.585-.205 1.258-.026 1.637.433l1.104 1.332c.38.46.402 1.108.053 1.59l-.49.658c-.145.195-.125.467.049.64.673.675 1.554 1.365 2.222 1.942.576.495 1.156.974 1.826 1.362.176.103.406.096.556-.021l.53-.414c.48-.376 1.144-.356 1.605.048l1.246 1.094c.44.388.583 1.036.34 1.583z"/>
        </svg>
        <span className="absolute -top-10 bg-[#111] border border-[#333] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {idioma === 'es' ? 'Hablar con un asesor' : 'Chat with us'}
        </span>
      </a>

      {/* 🔮 VENTANA INMERSIVA DEL METAVERSO (R3F) */}
      {mostrarMetaverso && (
        <div className="fixed inset-0 z-[1000] w-full h-full bg-black flex flex-col items-center justify-center animate-[fadeIn_0.5s_ease-in-out]">
          <button 
            onClick={() => {
              setMostrarMetaverso(false);
              setIntroMetaversoTerminada(false); 
            }} 
            className="absolute top-6 right-6 md:top-10 md:right-10 z-[1010] flex items-center gap-2 px-6 py-3 bg-black/60 border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-900 transition-colors backdrop-blur-md"
          >
            ✕ {idioma === 'es' ? 'Cerrar Metaverso' : 'Close Metaverse'}
          </button>

          {!introMetaversoTerminada ? (
            <video 
              src={URL_INTRO}
              autoPlay 
              muted 
              playsInline
              onEnded={() => setIntroMetaversoTerminada(true)} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full relative animate-[fadeIn_1s_ease-in-out]">
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center opacity-80">
                <span className="text-white text-[10px] md:text-xs font-bold tracking-widest uppercase bg-black/60 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 shadow-xl">
                  {idioma === 'es' ? '👆 Arrastra para explorar / Clic a las flechas para caminar' : '👆 Drag to explore / Click arrows to walk'}
                </span>
              </div>
              <RecorridoLoyaltink />
            </div>
          )}
        </div>
      )}

      {/* OVERLAY DEL MENÚ HAMBURGUESA */}
      <div className={`fixed inset-0 z-[2000] bg-[#0a0a0a]/95 backdrop-blur-lg transition-all duration-500 flex flex-col justify-center items-center ${menuAbierto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button onClick={() => setMenuAbierto(false)} className="absolute top-6 right-6 p-4 text-white hover:text-[#8B5CF6] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col items-center gap-8 md:gap-12 text-xl md:text-4xl font-black uppercase tracking-widest text-center">
          <button onClick={() => scrollToSection('calculadora')} className="text-white hover:text-[#8B5CF6] hover:scale-105 transition-all">
            {idioma === 'es' ? 'Costo del Tatuaje' : 'Tattoo Cost'}
          </button>
          <button onClick={() => scrollToSection('artistas')} className="text-white hover:text-[#8B5CF6] hover:scale-105 transition-all">
            {idioma === 'es' ? 'Los Artistas' : 'The Artists'}
          </button>
          <button onClick={() => scrollToSection('estilos')} className="text-white hover:text-[#8B5CF6] hover:scale-105 transition-all">
            {idioma === 'es' ? 'Portafolios' : 'Portfolios'}
          </button>
          <button onClick={() => scrollToSection('reservar')} className="text-white hover:text-[#8B5CF6] hover:scale-105 transition-all">
            {idioma === 'es' ? 'Reservar' : 'Book Session'}
          </button>
          <button onClick={() => { setMenuAbierto(false); setMostrarMetaverso(true); }} className="text-[#06b6d4] hover:text-white hover:scale-105 transition-all">
            {idioma === 'es' ? 'Conoce el Estudio' : 'Explore the Studio'}
          </button>
          <button onClick={() => scrollToSection('contacto')} className="text-white hover:text-[#8B5CF6] hover:scale-105 transition-all">
            {idioma === 'es' ? 'Dirección y Contacto' : 'Location & Contact'}
          </button>
        </div>
      </div>

      {/* NAVEGACIÓN (AHORA CON BOTÓN DE HAMBURGUESA) */}
      <nav className="fixed w-full z-50 bg-white/5 backdrop-blur-lg border-b border-white/10 flex justify-between items-center px-4 py-3 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 md:w-20 md:h-20 flex-shrink-0 bg-[#8B5CF6] flex items-center justify-center overflow-hidden border-2 border-white/20 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.2)]">
             <img src="/loyaltink/logo_loyaltink.jpeg" alt="Loyaltink" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-3xl font-extrabold text-white leading-tight uppercase tracking-[-0.1em]" style={{ fontFeatureSettings: '"kern" 0' }}>LOYALTINK BRIGADE</span>
            <span className="text-[10px] md:text-xs text-zinc-500 tracking-[0.2em] uppercase">Future Ink. Ancient Soul.</span>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <BotonIdioma />
          {/* Botón de Menú Hamburguesa en lugar del botón Volver */}
          <button onClick={() => setMenuAbierto(true)} className="text-white hover:text-[#8B5CF6] transition-colors cursor-pointer p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
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
                src="https://grutgbujoy4xc00c.public.blob.vercel-storage.com/hero_bg.mp4" 
                autoPlay 
                muted 
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${mostrarFotos ? 'opacity-0' : 'opacity-100'}`}
              />
              
              <div className={`absolute inset-0 w-full h-full flex transition-opacity duration-1000 ${mostrarFotos ? 'opacity-100' : 'opacity-0'}`}>
                 <img src="/loyaltink/chuloski.jpeg" alt="Chuloski" className="w-1/5 h-full object-cover border-r border-zinc-800" />
                 <img src="/loyaltink/rafa.jpeg" alt="Rafa" className="w-1/5 h-full object-cover border-r border-zinc-800" />
                 <img src="/loyaltink/prana.jpeg" alt="Plana" className="w-1/5 h-full object-cover border-r border-zinc-800" />
                 <img src="/loyaltink/nai.jpeg" alt="Nai" className="w-1/5 h-full object-cover border-r border-zinc-800" />
                 <img src="/loyaltink/boris.jpeg" alt="Boris" className="w-1/5 h-full object-cover" />
              </div>
            </div>
        </div>

        <div className="relative z-20 max-w-4xl flex flex-col items-center">
          <span className="inline-block py-1 px-6 rounded-full border border-[#06b6d4] text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-32 shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-black/50 backdrop-blur-sm">
            {idioma === 'es' ? 'AGENDA ABIERTA' : 'BOOKS OPEN'}
          </span>

          <div className="flex flex-col w-full sm:w-auto gap-4">
            <button 
              onClick={() => window.location.href = '/loyaltink/reserva'} 
              className="w-full sm:w-80 bg-white text-[#8B5CF6] font-bold py-4 px-8 transition-all uppercase tracking-[0.2em] text-xs hover:bg-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {idioma === 'es' ? 'RESERVAR SESIÓN' : 'BOOK SESSION'}
            </button>
            <button 
              onClick={() => setMostrarMetaverso(true)} 
              className="w-full sm:w-80 border border-white hover:bg-white hover:text-black text-white font-bold py-4 px-8 transition-all uppercase tracking-[0.2em] text-xs shadow-lg backdrop-blur-sm"
            >
              {idioma === 'es' ? 'VER GALERÍA 360' : 'VIEW 360 GALLERY'}
            </button>
          </div>
        </div>
      </header>

      {/* 🔥 CALCULADORA PRO TIPO SAAS 🔥 (Añadido ID calculadora) */}
      <section id="calculadora" className="py-12 md:py-24 px-4 bg-[#0a0a0a] border-t border-[#222]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-2 md:mb-4">
              {idioma === 'es' ? 'ESTIMADOR DE TATUAJES PRO' : 'PRO TATTOO ESTIMATOR'}
            </h2>
            <p className="text-xs md:text-sm text-zinc-400">
              {idioma === 'es' ? 'Calcula el costo y tiempo de tu pieza en segundos.' : 'Calculate the cost and time of your piece in seconds.'}
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl border border-[#333] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            
            {/* PANEL IZQUIERDO: CONTROLES */}
            <div className="flex-1 border-r border-[#333]">
              <div className="flex border-b border-[#333] bg-[#141414]">
                <button 
                  onClick={() => setCalcTab('cost')}
                  className={`flex-1 py-3 md:py-5 text-xs md:text-sm font-bold tracking-wider transition-colors ${calcTab === 'cost' ? 'text-white border-b-2 border-[#06b6d4] bg-[#1a1a1a]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#1a1a1a]'}`}
                >
                  {idioma === 'es' ? 'Costo del Tatuaje' : 'Tattoo Cost'}
                </button>
                <button 
                  onClick={() => setCalcTab('time')}
                  className={`flex-1 py-3 md:py-5 text-xs md:text-sm font-bold tracking-wider transition-colors ${calcTab === 'time' ? 'text-white border-b-2 border-[#8B5CF6] bg-[#1a1a1a]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#1a1a1a]'}`}
                >
                  {idioma === 'es' ? 'Tiempo de Sesión' : 'Session Time'}
                </button>
              </div>

              <div className="p-4 sm:p-6 md:p-8 space-y-5 md:space-y-8">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {calcTab === 'cost' ? (idioma === 'es' ? 'Calculadora de Costos' : 'Cost Calculator') : (idioma === 'es' ? 'Estimador de Tiempos' : 'Time Estimator')}
                  </h3>
                  <p className="text-[10px] md:text-xs text-zinc-500 leading-tight">
                    {calcTab === 'cost' 
                      ? (idioma === 'es' ? 'Estima tu tatuaje basado en tamaño, estilo y tipo de color.' : 'Estimate your tattoo based on size, style, and color type.')
                      : (idioma === 'es' ? 'Estima la duración basada en tamaño, complejidad, estilo y tolerancia al dolor.' : 'Estimate duration based on size, complexity, style, and pain tolerance.')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {calcTab === 'cost' ? (
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold text-zinc-400 mb-2">
                        {idioma === 'es' ? 'Ubicación del Estudio' : 'Studio Location'}
                      </label>
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
                      <label className="block text-[10px] md:text-xs font-bold text-zinc-400 mb-2">
                        {idioma === 'es' ? 'Tolerancia al Dolor' : 'Pain Tolerance'}
                      </label>
                      <div className="flex bg-[#222] rounded-lg p-1 border border-[#333]">
                        {[
                          { id: "Sensible", en: "Sensitive" }, 
                          { id: "Promedio", en: "Average" }, 
                          { id: "Alta", en: "High" }
                        ].map((p) => (
                          <button 
                            key={p.id} onClick={() => setPainTolerance(p.id)}
                            className={`flex-1 py-1.5 md:py-2 text-[10px] md:text-xs font-bold rounded-md transition-colors ${painTolerance === p.id ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                          >
                            {idioma === 'es' ? p.id : p.en}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] md:text-xs font-bold text-zinc-400 mb-2">
                      {idioma === 'es' ? 'Tipo de Color' : 'Color Type'}
                    </label>
                    <div className="flex bg-[#222] rounded-lg p-1 border border-[#333]">
                      {[
                        { id: "Blanco y Negro", en: "Black & White" }, 
                        { id: "Color", en: "Color" }
                      ].map((c) => (
                        <button 
                          key={c.id} onClick={() => setColorType(c.id)}
                          className={`flex-1 py-1.5 md:py-2 text-[10px] md:text-xs font-bold rounded-md transition-colors ${colorType === c.id ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                          {idioma === 'es' ? c.id : c.en}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-[10px] md:text-xs font-bold text-zinc-400">
                      {idioma === 'es' ? 'Tamaño del Tatuaje' : 'Tattoo Size'}
                    </label>
                    <span className="text-[9px] md:text-[10px] text-zinc-600 border border-[#333] px-2 py-1 rounded">
                      {idioma === 'es' ? 'Usar cm' : 'Use cm'}
                    </span>
                  </div>
                  <p className="text-white text-sm md:text-base font-bold mb-3 md:mb-4">
                    {idioma === 'es' ? 'Tamaño:' : 'Size:'} {size} cm²
                  </p>
                  
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
                       <span className="text-zinc-600 text-[10px] md:text-xs">
                         {idioma === 'es' ? 'Área Visual' : 'Visual Area'}
                       </span>
                     </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-zinc-400 mb-2 md:mb-3">
                    {idioma === 'es' ? 'Estilo del Tatuaje ?' : 'Tattoo Style ?'}
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-1.5 md:gap-2">
                    {[
                      { id: "Línea Fina", en: "Fine Line" }, { id: "Blackwork", en: "Blackwork" }, 
                      { id: "Tradicional", en: "Traditional" }, { id: "Ilustrativo", en: "Illustrative" }, 
                      { id: "Realismo", en: "Realism" }, { id: "Acuarela", en: "Watercolor" }, 
                      { id: "Neo-Japonés", en: "Neo-Japanese" }, { id: "Geométrico", en: "Geometric" }, 
                      { id: "Tribal", en: "Tribal" }, { id: "Biomecánico", en: "Biomechanical" }, 
                      { id: "Retrato", en: "Portrait" }, { id: "Puntillismo", en: "Dotwork" }
                    ].map((s) => (
                      <button 
                        key={s.id} onClick={() => setStyle(s.id)}
                        className={`py-2 md:py-3 text-[9px] md:text-[10px] font-bold rounded-lg border transition-all ${style === s.id ? 'bg-[#333] border-[#8B5CF6] text-white shadow-[0_0_10px_rgba(139,92,246,0.2)]' : 'bg-[#222] border-[#333] text-zinc-500 hover:border-[#444] hover:text-zinc-300'}`}
                      >
                        {idioma === 'es' ? s.id : s.en}
                      </button>
                    ))}
                  </div>
                </div>

                {calcTab === 'time' && (
                  <div>
                    <label className="block text-[10px] md:text-xs font-bold text-zinc-400 mb-2 md:mb-3">
                      {idioma === 'es' ? 'Complejidad del Diseño' : 'Design Complexity'}
                    </label>
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      {[
                        { n: "Simple", enN: "Simple", t: "Formas básicas", enT: "Basic shapes" }, 
                        { n: "Moderada", enN: "Moderate", t: "Varios elementos", enT: "Multiple elements" }, 
                        { n: "Compleja", enN: "Complex", t: "Detalles finos", enT: "Fine details" }, 
                        { n: "Muy Compleja", enN: "Very Complex", t: "Fotorrealismo", enT: "Photorealism" }
                      ].map((comp) => (
                        <button 
                          key={comp.n} onClick={() => setComplexity(comp.n)}
                          className={`p-2 md:p-4 flex flex-col items-center text-center rounded-lg border transition-all ${complexity === comp.n ? 'bg-[#333] border-[#8B5CF6] text-white shadow-[0_0_10px_rgba(139,92,246,0.2)]' : 'bg-[#222] border-[#333] text-zinc-500 hover:border-[#444]'}`}
                        >
                          <span className="text-xs md:text-sm font-bold">{idioma === 'es' ? comp.n : comp.enN}</span>
                          <span className="text-[9px] md:text-[10px] opacity-60">{idioma === 'es' ? comp.t : comp.enT}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* PANEL DERECHO: RESULTADOS */}
            <div className="w-full lg:w-[380px] bg-[#141414] p-4 sm:p-6 md:p-8 flex flex-col">
              <div className="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 md:p-6 flex-1 flex flex-col shadow-inner">
                
                {/* CABECERA CON TOGGLE DE MONEDA */}
                <div className="flex justify-between items-start md:items-center mb-4 md:mb-8 flex-col md:flex-row gap-3">
                  <h4 className="text-white font-bold text-sm md:text-base">
                    {calcTab === 'cost' ? (idioma === 'es' ? 'Costo Estimado' : 'Estimated Cost') : (idioma === 'es' ? 'Tiempo Estimado' : 'Estimated Time')}
                  </h4>
                  {calcTab === 'cost' && (
                    <div className="flex bg-[#222] rounded-lg p-1 border border-[#333]">
                      <button 
                        onClick={() => setMoneda('MXN')}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-colors ${moneda === 'MXN' ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                      >
                        MXN
                      </button>
                      <button 
                        onClick={() => setMoneda('USD')}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-colors ${moneda === 'USD' ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                      >
                        USD
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 flex justify-center items-center mb-6 md:mb-8">
                  <div className="w-44 h-44 md:w-48 md:h-48 rounded-full border border-[#333] bg-[#222] flex flex-col items-center justify-center shadow-lg relative px-4 text-center">
                     <div className={`absolute inset-0 rounded-full blur-xl opacity-20 ${calcTab === 'cost' ? 'bg-[#06b6d4]' : 'bg-[#8B5CF6]'}`}></div>
                     
                     <span className={`font-black text-white relative z-10 leading-tight ${moneda === 'MXN' && calcTab === 'cost' ? 'text-lg sm:text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
                       {calcTab === 'cost' ? getEstimatedCost() : getEstimatedTime()}
                     </span>
                     
                     <span className="text-[10px] md:text-xs text-zinc-500 mt-1 md:mt-2 relative z-10">
                       {calcTab === 'cost' ? moneda : (idioma === 'es' ? 'Aprox' : 'Approx')}
                     </span>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 text-[10px] md:text-xs">
                  <div className="flex justify-between border-b border-[#333] pb-2">
                    <span className="text-zinc-500">{idioma === 'es' ? 'Tamaño' : 'Size'}</span>
                    <span className="text-white font-bold">{size} cm²</span>
                  </div>
                  <div className="flex justify-between border-b border-[#333] pb-2">
                    <span className="text-zinc-500">{idioma === 'es' ? 'Estilo' : 'Style'}</span>
                    <span className="text-white font-bold">{style}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#333] pb-2">
                    <span className="text-zinc-500">{idioma === 'es' ? 'Color' : 'Color'}</span>
                    <span className="text-white font-bold">{idioma === 'es' ? colorType : (colorType === 'Blanco y Negro' ? 'Black & White' : 'Color')}</span>
                  </div>
                  
                  {calcTab === 'time' && (
                    <>
                      <div className="flex justify-between border-b border-[#333] pb-2">
                        <span className="text-zinc-500">{idioma === 'es' ? 'Complejidad' : 'Complexity'}</span>
                        <span className="text-white font-bold">{idioma === 'es' ? complexity : (complexity === 'Moderada' ? 'Moderate' : complexity === 'Compleja' ? 'Complex' : complexity === 'Muy Compleja' ? 'Very Complex' : complexity)}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#333] pb-2">
                        <span className="text-zinc-500">{idioma === 'es' ? 'Tolerancia' : 'Tolerance'}</span>
                        <span className="text-white font-bold">{idioma === 'es' ? painTolerance : (painTolerance === 'Promedio' ? 'Average' : painTolerance === 'Sensible' ? 'Sensitive' : 'High')}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#333]">
                  <p className="text-[9px] md:text-[10px] text-white font-bold mb-2 md:mb-3 uppercase tracking-wider">
                    {calcTab === 'cost' ? (idioma === 'es' ? 'Factores de Precio' : 'Price Factors') : (idioma === 'es' ? 'Factores de Tiempo' : 'Time Factors')}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 md:gap-2 text-[8px] md:text-[9px] text-zinc-500">
                    {calcTab === 'cost' ? (
                      <>
                        <p>• {idioma === 'es' ? 'Tamaño y zona visual' : 'Size and visual area'}</p>
                        <p>• {idioma === 'es' ? 'Ubicación del estudio' : 'Studio location'}</p>
                        <p>• {idioma === 'es' ? 'Uso de color o grises' : 'Color or greyscale use'}</p>
                        <p>• {idioma === 'es' ? 'Ubicación en el cuerpo' : 'Body placement'}</p>
                        <p>• {idioma === 'es' ? 'Número de sesiones' : 'Number of sessions'}</p>
                        <p>• {idioma === 'es' ? 'Cargo mínimo local' : 'Local minimum charge'}</p>
                      </>
                    ) : (
                      <>
                        <p>• {idioma === 'es' ? 'Velocidad del artista' : 'Artist speed'}</p>
                        <p>• {idioma === 'es' ? 'Tolerancia al dolor' : 'Pain tolerance'}</p>
                        <p>• {idioma === 'es' ? 'Número de descansos' : 'Number of breaks'}</p>
                        <p>• {idioma === 'es' ? 'Tipo y estado de piel' : 'Skin type and condition'}</p>
                        <p>• {idioma === 'es' ? 'Aplicación de stencil' : 'Stencil application'}</p>
                        <p>• {idioma === 'es' ? 'Cambios de tintas' : 'Ink changes'}</p>
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

      {/* MEET THE ARTISTS (Añadido ID artistas) */}
      <section id="artistas" className="py-24 px-6 bg-[#111111] border-t border-[#222]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">
              {idioma === 'es' ? 'EL COLECTIVO' : 'THE COLLECTIVE'}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#8B5CF6] uppercase tracking-tighter mb-6">
              {idioma === 'es' ? 'CONOCE A LOS ARTISTAS' : 'MEET THE ARTISTS'}
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              {idioma === 'es' 
                ? 'Artistas de élite. Visiones únicas. Una creencia compartida: el arte del tatuaje no tiene techo.' 
                : 'Elite artists. Unique visions. One shared belief: the art of tattooing has no ceiling.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-24">
            
            {/* ARTISTA 1: CHULOSKI */}
            <Link href="/loyaltink/artista/chuloski" className="flex flex-col items-center text-center group cursor-pointer relative">
              <div className="w-56 md:w-64 aspect-[9/16] rounded-2xl overflow-hidden border-4 border-[#222] shadow-[0_0_40px_rgba(139,92,246,0.2)] mb-8 bg-zinc-900 transition-all group-hover:scale-105 group-hover:border-[#8B5CF6] relative">
                 <video 
                   src="https://grutgbujoy4xc00c.public.blob.vercel-storage.com/artista_chulo_efecto.mp4" 
                   autoPlay 
                   loop 
                   muted 
                   playsInline 
                   className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                 />
                 <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] pointer-events-none"></div>
                 <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#8B5CF6] transition-colors">JOEL SKREPNIK "CHULOSKI"</h3>
              <p className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">BLACKWORK • NEO-JAPONÉS • TRADICIONAL</p>
              <span className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                ➔
              </span>
            </Link>

            {/* ARTISTA 2: RAFA */}
            <Link href="/loyaltink/artista/rafa" className="flex flex-col items-center text-center group cursor-pointer relative">
              <div className="w-56 md:w-64 aspect-[9/16] rounded-2xl overflow-hidden border-4 border-[#222] shadow-[0_0_40px_rgba(139,92,246,0.2)] mb-8 bg-zinc-900 transition-all group-hover:scale-105 group-hover:border-[#8B5CF6] relative">
                 <video 
                   src="https://grutgbujoy4xc00c.public.blob.vercel-storage.com/artista_rafa1_efecto.mp4" 
                   autoPlay 
                   loop 
                   muted 
                   playsInline 
                   className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                 />
                 <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] pointer-events-none"></div>
                 <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#8B5CF6] transition-colors">RAFA MOLDESS "RAFA"</h3>
              <p className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">BLACK & GREY • REALISMO • NEO-TRIBAL</p>
              <span className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                ➔
              </span>
            </Link>

            {/* ARTISTA 3: PRANA */}
            <Link href="/loyaltink/artista/prana" className="flex flex-col items-center text-center group cursor-pointer relative">
              <div className="w-56 md:w-64 aspect-[9/16] rounded-2xl overflow-hidden border-4 border-[#222] shadow-[0_0_40px_rgba(139,92,246,0.2)] mb-8 bg-zinc-900 transition-all group-hover:scale-105 group-hover:border-[#8B5CF6] relative">
                 <video 
                   src="https://grutgbujoy4xc00c.public.blob.vercel-storage.com/artista_prana2_efecto2.mp4" 
                   autoPlay 
                   loop 
                   muted 
                   playsInline 
                   className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                 />
                 <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] pointer-events-none"></div>
                 <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#8B5CF6] transition-colors">LAUTARO BORDESSE "PRANA"</h3>
              <p className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">REALISMO ÉPICO • ESTATUARIA • MITOLOGÍA</p>
              <span className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                ➔
              </span>
            </Link>

           {/* ARTISTA 4: NAI */}
            <Link href="/loyaltink/artista/nai" className="flex flex-col items-center text-center group cursor-pointer relative">
              <div className="w-56 md:w-64 aspect-[9/16] rounded-2xl overflow-hidden border-4 border-[#222] shadow-[0_0_40px_rgba(139,92,246,0.2)] mb-8 bg-zinc-900 transition-all group-hover:scale-105 group-hover:border-[#8B5CF6] relative">
                 <video 
                   src="https://grutgbujoy4xc00c.public.blob.vercel-storage.com/artista_nai2_efecto2.mp4" 
                   autoPlay 
                   loop 
                   muted 
                   playsInline 
                   className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                 />
                 <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] pointer-events-none"></div>
                 <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#8B5CF6] transition-colors">NAIARA "NAI"</h3>
              <p className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">FINE LINE • BOTÁNICO • RED INK</p>
              <span className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                ➔
              </span>
            </Link>

            {/* ARTISTA 5: BORIS */}
            <Link href="/loyaltink/artista/boris" className="flex flex-col items-center text-center group cursor-pointer md:col-span-2 md:max-w-xl md:mx-auto relative">
              <div className="w-56 md:w-64 aspect-[9/16] rounded-2xl overflow-hidden border-4 border-[#222] shadow-[0_0_40px_rgba(139,92,246,0.2)] mb-8 bg-zinc-900 transition-all group-hover:scale-105 group-hover:border-[#8B5CF6] relative">
                 <video 
                   src="https://grutgbujoy4xc00c.public.blob.vercel-storage.com/artista_boris2_efecto.mp4" 
                   autoPlay 
                   loop 
                   muted 
                   playsInline 
                   className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                 />
                 <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] pointer-events-none"></div>
                 <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#8B5CF6] transition-colors">BORIS ARGA "BORIS"</h3>
              <p className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">MICRO-REALISMO • FOTORREALISMO • COLOR POP</p>
              <span className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                ➔
              </span>
            </Link>
            
          </div>
        </div>
      </section>

      {/* OUR STYLES (Añadido ID estilos) */}
      <section id="estilos" className="py-24 px-6 bg-[#0a0a0a] border-t border-[#222]">
         <div className="max-w-5xl mx-auto text-center">
            <span className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">
              {idioma === 'es' ? 'NUESTROS ESTILOS' : 'OUR STYLES'}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#8B5CF6] uppercase tracking-tighter mb-6 leading-none">
              {idioma === 'es' ? (
                <>NUESTRO PORTAFOLIO<br/>POR ESTILOS</>
              ) : (
                <>OUR PORTFOLIO<br/>BY STYLES</>
              )}
            </h2>
            <p className="text-zinc-400 mb-20 max-w-xl mx-auto">
              {idioma === 'es' 
                ? 'Estilos distintos unidos por una ejecución atrevida, raíces culturales y la negativa a ir a lo seguro.' 
                : 'Distinct styles united by bold execution, cultural roots, and a refusal to play it safe.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                { slug: 'fusion-neo-japonesa', title: idioma === 'es' ? 'FUSIÓN NEO-JAPONESA' : 'NEO-JAPANESE FUSION', desc: idioma === 'es' ? 'Sujetos tradicionales Irezumi reinventados con patrones de circuitos geométricos, efectos glitch y cambios de color holográficos.' : 'Traditional Irezumi subjects reimagined with geometric circuit patterns, glitch effects, and holographic color shifts.', icon: '☯' },
                { slug: 'biomecanica', title: idioma === 'es' ? 'BIOMECÁNICA' : 'BIOMECHANICAL', desc: idioma === 'es' ? 'Ilusiones de piel rasgada que revelan maquinaria, circuitos y anatomía alienígena debajo. Profundidad hiperdetallada y texturas metálicas.' : 'Ripped skin illusions revealing machinery, circuits, and alien anatomy beneath. Hyper-detailed depth and metallic textures.', icon: '👁' },
                { slug: 'realismo-epico', title: idioma === 'es' ? 'REALISMO ÉPICO' : 'EPIC REALISM', desc: idioma === 'es' ? 'Composiciones monumentales en Black & Grey inspiradas en estatuaria clásica, mitología y figuras históricas con volumen tridimensional.' : 'Monumental Black & Grey compositions inspired by classical statuary, mythology, and historical figures with three-dimensional volume.', icon: '🏛' },
                { slug: 'realismo-cyberpunk', title: idioma === 'es' ? 'REALISMO CYBERPUNK' : 'CYBERPUNK REALISM', desc: idioma === 'es' ? 'Retratos futuristas y paisajes urbanos renderizados con precisión fotorrealista y atmósfera iluminada por neón.' : 'Futuristic portraits and urban landscapes rendered with photorealistic precision and neon-lit atmosphere.', icon: '♦' },
                { slug: 'blackwork', title: idioma === 'es' ? 'BLACKWORK' : 'BLACKWORK', desc: idioma === 'es' ? 'Contraste extremo y saturación profunda de tinta negra. Trabajos geométricos, tribales modernos y texturas sólidas.' : 'Extreme contrast and deep black ink saturation. Geometric works, modern tribals, and solid textures.', icon: '✒' },
                { slug: 'proyectos-gran-escala', title: idioma === 'es' ? 'PROYECTOS A GRAN ESCALA' : 'LARGE SCALE PROJECTS', desc: idioma === 'es' ? 'Mangas completas, piezas de espalda y trajes de cuerpo. Épicas de múltiples sesiones que cuentan historias a través de la piel.' : 'Full sleeves, back pieces, and body suits. Multi-session epics that tell stories through the skin.', icon: '★' },
              ].map((style, idx) => (
                <Link 
                  key={idx} 
                  href={`/loyaltink/estilos/${style.slug}`} 
                  className="bg-[#111111] border border-[#222] p-8 hover:border-[#8B5CF6] transition-colors group cursor-pointer block"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 border border-[#333] flex items-center justify-center text-xl text-white group-hover:text-[#8B5CF6] transition-colors">
                      {style.icon}
                    </div>
                    <span className="text-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity text-xl font-bold">➔</span>
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 group-hover:text-[#8B5CF6] transition-colors">{style.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{style.desc}</p>
                </Link>
              ))}
            </div>
         </div>
      </section>

      {/* CLIENT STORIES */}
      <section className="py-24 px-6 bg-[#111111] border-t border-[#222]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">
            {idioma === 'es' ? 'TESTIMONIOS' : 'TESTIMONIALS'}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#8B5CF6] uppercase tracking-tighter mb-6">
            {idioma === 'es' ? 'HISTORIAS DE CLIENTES' : 'CLIENT STORIES'}
          </h2>
          <p className="text-zinc-400 mb-16">
            {idioma === 'es' ? 'Mira lo que dicen nuestros clientes sobre su experiencia.' : 'See what our clients say about their experience.'}
          </p>

          <div className="space-y-6 text-left">
            {[
              { text: idioma === 'es' ? "Chuloski convirtió mi espalda en una verdadera obra de arte. El contraste del blackwork con la máscara Hannya es increíble. La gente literalmente me detiene en la calle." : "Chuloski turned my back into a true work of art. The contrast of the blackwork with the Hannya mask is incredible. People literally stop me on the street.", name: "Marcus L.", tag: idioma === 'es' ? "Espalda Completa Neo-Japonesa" : "Full Neo-Japanese Back" },
              { text: idioma === 'es' ? "Rafa logró capturar la mirada exacta de mi perro en el retrato. El nivel de realismo en Black & Grey es de otro mundo, parece que la piel va a respirar." : "Rafa managed to capture my dog's exact look in the portrait. The level of Black & Grey realism is otherworldly, it looks like the skin is going to breathe.", name: "Tanya K.", tag: idioma === 'es' ? "Retrato Realista" : "Realistic Portrait" },
              { text: idioma === 'es' ? "Volé desde Nueva York para hacerme una manga mitológica con Prana. Valió la pena cada milla. El volumen de las sombras y el Zeus que diseñó parecen tallados en mármol. Este tipo es de verdad." : "Flew from New York to get a mythological sleeve with Prana. Worth every mile. The volume of the shadows and the Zeus he designed look carved in marble. This guy is the real deal.", name: "Jordan W.", tag: idioma === 'es' ? "Manga Estatuaria Clásica" : "Classical Statuary Sleeve" }
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

      {/* CTA SECTION (Añadido ID reservar) */}
      <section id="reservar" className="py-24 px-6 bg-[#8B5CF6] text-center flex flex-col items-center">
         <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
           {idioma === 'es' ? '¿LISTO PARA SUBIR DE NIVEL?' : 'READY TO LEVEL UP?'}
         </h2>
         <p className="text-white/80 max-w-lg mb-10 leading-relaxed">
           {idioma === 'es' 
             ? 'Nuestros libros están abiertos para consultas y sesiones. Trabajamos solo con cita previa para darle a cada cliente el enfoque y el tiempo que su pieza merece.' 
             : 'Our books are open for consultations and sessions. We work strictly by appointment to give each client the focus and time their piece deserves.'}
         </p>
         <button 
           onClick={() => window.location.href = '/loyaltink/reserva'}
           className="bg-white text-[#8B5CF6] font-bold py-4 px-10 uppercase tracking-[0.2em] text-xs hover:bg-zinc-100 transition-colors w-full sm:w-auto"
         >
           {idioma === 'es' ? 'SOLICITAR UNA CONSULTA' : 'REQUEST A CONSULTATION'}
         </button>
      </section>

      {/* FOOTER (Añadido ID contacto y Mapa/Redes) */}
      <footer id="contacto" className="bg-[#0a0a0a] pt-20 pb-10 px-6 border-t border-[#222]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-1">
            <span className="text-xl font-bold tracking-widest text-white block mb-4">LOYALTINK BRIGADE</span>
            <p className="text-zinc-500 text-xs leading-relaxed mb-6">
              {idioma === 'es' 
                ? 'Tatuajes personalizados premium y arte corporal. Artistas de élite, estudio profesional, resultados excepcionales.' 
                : 'Premium custom tattoos and body art. Elite artists, professional studio, exceptional results.'}
            </p>
            
            {/* REDES SOCIALES */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all">
                <span className="sr-only">Facebook</span>
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all">
                <span className="sr-only">Instagram</span>
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all">
                <span className="sr-only">TikTok</span>
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="mailto:book@loyaltink.example" className="w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all">
                <span className="sr-only">Email</span>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>

          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
              {idioma === 'es' ? 'CONTACTO' : 'CONTACT'}
            </h4>
            <div className="text-zinc-500 text-xs space-y-2 mb-6">
              <p>Plaza Paseo Cobá</p>
              <p>Avenida Aviación</p>
              <p>P. Coba Local 206</p>
              <p>77710 Playa del Carmen</p>
              <p>Quintana Roo</p>
              <p className="pt-4">+52(333) 3482 0746</p>
            </div>
            
            {/* MAPA DE GOOGLE MAPS */}
            <div className="w-full h-32 rounded-lg overflow-hidden border border-[#333] shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.245233215572!2d-87.078696!3d20.627702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4e4325514f7b6d%3A0x6b6338b0063901b0!2sPlaza%20Paseo%20Coba!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
              {idioma === 'es' ? 'HORARIOS' : 'HOURS'}
            </h4>
            <div className="text-zinc-500 text-xs space-y-2">
              <p>{idioma === 'es' ? 'Lun: Cerrado' : 'Mon: Closed'}</p>
              <p>{idioma === 'es' ? 'Mar:' : 'Tue:'} 1pm-10pm</p>
              <p>{idioma === 'es' ? 'Mié:' : 'Wed:'} 1pm-10pm</p>
              <p>{idioma === 'es' ? 'Jue:' : 'Thu:'} 1pm-10pm</p>
              <p>{idioma === 'es' ? 'Vie:' : 'Fri:'} 1pm-11pm</p>
              <p>{idioma === 'es' ? 'Sáb:' : 'Sat:'} 12pm-11pm</p>
              <p>{idioma === 'es' ? 'Dom:' : 'Sun:'} 12pm-8pm</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
              {idioma === 'es' ? 'ENLACES RÁPIDOS' : 'QUICK LINKS'}
            </h4>
            <div className="text-zinc-500 text-xs space-y-3 flex flex-col items-start">
              <button className="hover:text-white transition-colors">{idioma === 'es' ? 'Sobre Nosotros' : 'About Us'}</button>
              <button onClick={() => scrollToSection('estilos')} className="hover:text-white transition-colors">{idioma === 'es' ? 'Portafolio' : 'Portfolio'}</button>
              <button onClick={() => scrollToSection('calculadora')} className="hover:text-white transition-colors">{idioma === 'es' ? 'Servicios y Precios' : 'Services & Pricing'}</button>
              <button className="hover:text-white transition-colors">{idioma === 'es' ? 'Cuidados Posteriores' : 'Aftercare'}</button>
              <button className="hover:text-white transition-colors">{idioma === 'es' ? 'Políticas del Estudio' : 'Studio Policies'}</button>
              <button onClick={() => window.location.href = '/loyaltink/reserva'} className="hover:text-white transition-colors">{idioma === 'es' ? 'Agendar Consulta' : 'Book Consultation'}</button>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-[#222] pt-8">
          <p className="text-zinc-600 text-[10px]">© 2026 Loyaltink Brigade. {idioma === 'es' ? 'Todos los derechos reservados. Creado por ViOs Code.' : 'All rights reserved. Powered by ViOs Code.'}</p>
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
          {idioma === 'es' ? 'Entrar al Metaverso' : 'Enter Metaverse'}
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