'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  BarChart3, Globe2, Users, DollarSign, Key, Settings, LogOut, 
  TrendingUp, Activity, Smartphone, ArrowUpRight, Lock, Mail, Eye, EyeOff, Loader2
} from 'lucide-react';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';

// Conexión a la Matriz ViOs Code
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function LoyaltinkDashboard() {
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [tabActiva, setTabActiva] = useState('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verPassword, setVerPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [esRegistro, setEsRegistro] = useState(false); // 👈 NUEVO: Alternar entre login y registro

  const [paisesGeoJSON, setPaisesGeoJSON] = useState<any[]>([]);
  const [datosReales, setDatosReales] = useState({ facturado: 0, reservas: 0 });
  const globeRef = useRef<any>(null);

  // 1. VERIFICAR SESIÓN ACTIVA AL CARGAR
  useEffect(() => {
    // Revisar si ya hay una sesión guardada
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setEstaLogueado(true);
    });

    // Escuchar cambios (cuando inicia o cierra sesión)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setEstaLogueado(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. LÓGICA DE AUTENTICACIÓN REAL
  const manejarAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      if (esRegistro) {
        // --- CREAR CUENTA NUEVA ---
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        alert("✅ Registro exitoso. Revisa tu bandeja de entrada o spam para confirmar tu correo.");
        setEsRegistro(false); // Lo regresamos a la vista de login
        
      } else {
        // --- INICIAR SESIÓN ---
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          if (error.message.includes("Email not confirmed")) {
             throw new Error("Debes confirmar tu correo electrónico antes de entrar. Revisa tu bandeja de entrada.");
          }
          throw new Error("Credenciales incorrectas.");
        }
        // Si es exitoso, el onAuthStateChange arriba cambiará estaLogueado a true automáticamente
      }
    } catch (error: any) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
  };

  // 3. CARGA DE DATOS REALES (MÉTRICAS Y MAPA)
  useEffect(() => {
    if (estaLogueado) {
      fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
        .then(res => res.json())
        .then(datos => setPaisesGeoJSON(datos.features));

      const obtenerVentas = async () => {
        const { data } = await supabase.from('ventas').select('*').eq('tienda_id', 'LOYALTINK');
        if (data) {
          const total = data.reduce((acc, v) => acc + Number(v.total), 0);
          setDatosReales({ facturado: total, reservas: data.length });
        }
      };
      obtenerVentas();
    }
  }, [estaLogueado]);

  useEffect(() => {
    if (globeRef.current && estaLogueado) {
      globeRef.current.pointOfView({ lat: 20, lng: -90, altitude: 2.5 });
    }
  }, [paisesGeoJSON, estaLogueado]);

  // PANTALLA DE LOGIN / REGISTRO
  if (!estaLogueado) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-[#111] border border-[#222] rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#8B5CF6] rounded-2xl flex items-center justify-center mb-4 border border-white/10">
              <img src="/loyaltink/logo_loyaltink.jpeg" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <h1 className="text-white font-black tracking-widest uppercase text-xl text-center">
              {esRegistro ? 'Crear Cuenta' : 'Master Access'}
            </h1>
            <p className="text-[#8B5CF6] text-[10px] tracking-[0.3em] uppercase mt-2 font-bold">ViOs Code Administration</p>
          </div>

          <form onSubmit={manejarAuth} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="email" 
                placeholder="Correo Electrónico" 
                required
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#8B5CF6] transition-all"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type={verPassword ? "text" : "password"} 
                placeholder="Contraseña (mínimo 6 caracteres)" 
                required
                minLength={6}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl py-4 pl-12 pr-12 text-white outline-none focus:border-[#8B5CF6] transition-all"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setVerPassword(!verPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                {verPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            <button 
              disabled={cargando}
              className="w-full bg-white text-black font-black py-4 rounded-xl uppercase tracking-widest text-sm hover:bg-zinc-200 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {cargando && <Loader2 className="w-4 h-4 animate-spin" />}
              {esRegistro ? 'Registrarme en Supabase' : 'Desbloquear Dashboard'}
            </button>
          </form>

          {/* BOTÓN PARA CAMBIAR ENTRE LOGIN Y REGISTRO */}
          <div className="mt-6 text-center border-t border-[#222] pt-6">
            <p className="text-zinc-500 text-xs">
              {esRegistro ? '¿Ya tienes cuenta de acceso?' : '¿Aún no configuras tu llave maestra?'}
            </p>
            <button 
              onClick={() => setEsRegistro(!esRegistro)}
              className="mt-2 text-[#8B5CF6] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
              {esRegistro ? 'Iniciar Sesión' : 'Crear Cuenta Nueva'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD PRINCIPAL ---
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-[#8B5CF6] selection:text-white">
      
      {/* NAVEGACIÓN SUPERIOR */}
      <nav className="w-full bg-[#111] border-b border-[#222] px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <img src="/loyaltink/logo_loyaltink.jpeg" className="w-8 h-8 rounded-lg object-cover" />
             <span className="text-white font-black uppercase tracking-tighter text-sm">Loyaltink</span>
          </div>
          <div className="flex gap-4 ml-6">
            <button onClick={() => setTabActiva('dashboard')} className={`text-[10px] uppercase tracking-widest font-bold ${tabActiva === 'dashboard' ? 'text-[#8B5CF6]' : 'text-zinc-500'}`}>Estadísticas</button>
            <button onClick={() => setTabActiva('config')} className={`text-[10px] uppercase tracking-widest font-bold ${tabActiva === 'config' ? 'text-[#8B5CF6]' : 'text-zinc-500'}`}>Configuración</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] text-zinc-600 uppercase font-bold hidden md:block">Master: {email}</span>
          <button onClick={cerrarSesion} className="text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            Salir <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="p-8 max-w-[1600px] mx-auto">
        {tabActiva === 'dashboard' ? (
          <div className="space-y-6">
            {/* KPIs REALES */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#111] border border-[#222] p-6 rounded-2xl">
                <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1 tracking-widest">Total Facturado</p>
                <p className="text-3xl font-black text-white">${datosReales.facturado.toLocaleString()}</p>
                <p className="text-[9px] text-emerald-400 mt-2 font-bold uppercase tracking-widest">Ventas Reales</p>
              </div>
              <div className="bg-[#111] border border-[#222] p-6 rounded-2xl">
                <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1 tracking-widest">Reservas</p>
                <p className="text-3xl font-black text-white">{datosReales.reservas}</p>
                <p className="text-[9px] text-[#8B5CF6] mt-2 font-bold uppercase tracking-widest">Citas en Agenda</p>
              </div>
            </div>

            {/* RADAR 3D DE TRÁFICO */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-[#111] border border-[#222] p-6 rounded-3xl lg:col-span-2 relative overflow-hidden h-[450px] flex items-center justify-center">
                <div className="absolute top-6 left-6 z-10">
                  <h3 className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#06b6d4]" /> Radar de Tráfico Global
                  </h3>
                </div>
                {paisesGeoJSON.length > 0 && (
                  <Globe
                    ref={globeRef}
                    width={800}
                    height={600}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    backgroundColor="rgba(0,0,0,0)"
                    polygonsData={paisesGeoJSON}
                    polygonAltitude={(d: any) => ['Mexico', 'United States of America', 'Argentina'].includes(d.properties.ADMIN) ? 0.05 : 0.01}
                    polygonCapColor={(d: any) => ['Mexico', 'United States of America', 'Argentina'].includes(d.properties.ADMIN) ? 'rgba(6, 182, 212, 0.7)' : 'rgba(40, 40, 40, 0.3)'}
                    polygonSideColor={() => 'rgba(0, 0, 0, 0.2)'}
                    polygonStrokeColor={() => '#1a1a1a'}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl bg-[#111] border border-[#222] rounded-3xl p-8">
            <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-6">Configuración de Pasarela</h2>
            <div className="space-y-4">
              <label className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Access Token de Mercado Pago (LOYALTINK)</label>
              <input type="password" placeholder="APP_USR-..." className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl p-4 text-white outline-none focus:border-[#06b6d4]" />
              <button className="bg-white text-black font-black px-8 py-4 rounded-xl uppercase text-xs tracking-widest">Actualizar Llaves</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}