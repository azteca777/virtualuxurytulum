'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SensorTrafico from '../components/SensorTrafico';

// === 1. CATÁLOGO PRINCIPAL ===
const CATALOGO_PRINCIPAL = [
  { id: 1, nombreEs: 'Bikini Rosa', nombreEn: 'Pink Bikini', precio: 1120, urlFrente: '/bernardita/traje3.jpeg', urlAtras: '/bernardita/traje2.jpeg', tieneProbador: false },
  { id: 2, nombreEs: 'Bikini Arena', nombreEn: 'Sand Bikini', precio: 1129, urlFrente: '/bernardita/traje5.jpeg', urlAtras: '/bernardita/traje4.jpeg', tieneProbador: false },
  { id: 3, nombreEs: 'Bikini Noche', nombreEn: 'Night Bikini', precio: 1234, urlFrente: '/bernardita/traje7.jpeg', urlAtras: '/bernardita/traje14.jpeg', tieneProbador: false },
  { id: 4, nombreEs: 'Bikini Mar', nombreEn: 'Sea Bikini', precio: 1329, urlFrente: '/bernardita/traje8.jpeg', urlAtras: '/bernardita/traje6.jpeg', tieneProbador: false },
  { id: 5, nombreEs: 'Bikini Coral', nombreEn: 'Coral Bikini', precio: 1189, urlFrente: '/bernardita/traje9.jpeg', urlAtras: '/bernardita/traje10.jpeg', tieneProbador: false },
  { id: 6, nombreEs: 'Bikini Sol', nombreEn: 'Sun Bikini', precio: 1272, urlFrente: '/bernardita/traje12.jpeg', urlAtras: '/bernardita/traje13.jpeg', tieneProbador: false },
  { id: 7, nombreEs: 'Bikini Luna', nombreEn: 'Moon Bikini', precio: 1150, urlFrente: '/bernardita/traje17.jpeg', urlAtras: '/bernardita/traje18.jpeg', tieneProbador: false },
  { id: 8, nombreEs: 'Bikini Brisa', nombreEn: 'Breeze Bikini', precio: 1199, urlFrente: '/bernardita/traje11.jpeg', urlAtras: '/bernardita/traje20.jpeg', tieneProbador: false },
  { id: 9, nombreEs: 'Bikini Palmera', nombreEn: 'Palm Bikini', precio: 1250, urlFrente: '/bernardita/traje19.jpeg', urlAtras: '/bernardita/traje15.jpeg', tieneProbador: false },
];

// === 2. CATÁLOGO INTERACTIVO (CON PROBADOR) ===
const CATALOGO_PROBADOR = [
  { id: 10, nombreEs: 'Traje de Baño 5', nombreEn: 'Swimsuit 5', precio: 1129, url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje5.jpeg', tieneProbador: true },
  { id: 11, nombreEs: 'Traje de Baño 7', nombreEn: 'Swimsuit 7', precio: 1234, url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje7.jpeg', tieneProbador: true },
  { id: 12, nombreEs: 'Traje de Baño 8', nombreEn: 'Swimsuit 8', precio: 1329, url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje8.jpeg', tieneProbador: true },
  { id: 13, nombreEs: 'Traje de Baño 9', nombreEn: 'Swimsuit 9', precio: 1189, url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje9.jpeg', tieneProbador: true },
  { id: 14, nombreEs: 'Traje de Baño 15', nombreEn: 'Swimsuit 15', precio: 1250, url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje15.jpeg', tieneProbador: true },
  { id: 15, nombreEs: 'Traje de Baño 16', nombreEn: 'Swimsuit 16', precio: 1150, url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje16.jpeg', tieneProbador: true },
  { id: 16, nombreEs: 'Traje de Baño 3', nombreEn: 'Swimsuit 3', precio: 1120, url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje3.jpeg', tieneProbador: true },
  { id: 17, nombreEs: 'Traje de Baño 11', nombreEn: 'Swimsuit 11', precio: 1199, url: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/traje11.jpeg', tieneProbador: true },
];

const TEXTOS = {
  es: {
    volver: "← Volver",
    subtitulo: "Swimwear / Moda Exclusiva",
    historia: '"Diseños únicos pensados para resaltar la belleza natural."',
    vistaRapida: "Añadir al Carrito",
    tituloProbador: "Pruébatelos Virtualmente",
    probarBtn: "Probar ✨",
    probadorTitulo: "Probador Virtual",
    carritoTitulo: "Tu Selección",
    total: "Total Estimado",
    pagarBtn: "Pagar con",
    procesando: "Procesando...",
    vacio: "El carrito está vacío.",
    paso1: "1. Sube tu foto de cuerpo completo",
    cargandoFoto: "Cargando al casillero...",
    fotoGuardada: "✅ Selfie Guardada",
    seleccionarArchivo: "📸 Seleccionar Archivo",
    paso2: "2. Generar Magia",
    probarEstaPieza: "PROBARME ESTA PIEZA",
    pedirInfo: "Pedir Información",
    reintentar: "Reintentar",
    descargar: "Descargar",
    waMensaje: "Hola! Me probé el modelo *[PRENDA]* en tu probador virtual. %0A%0AMira: [URL]"
  },
  en: {
    volver: "← Back",
    subtitulo: "Swimwear / Exclusive Fashion",
    historia: '"Unique designs meant to highlight natural beauty."',
    vistaRapida: "Add to Cart",
    tituloProbador: "Try Them On Virtually",
    probarBtn: "Try On ✨",
    probadorTitulo: "Virtual Fitting Room",
    carritoTitulo: "Your Selection",
    total: "Estimated Total",
    pagarBtn: "Checkout with",
    procesando: "Processing...",
    vacio: "Your cart is empty.",
    paso1: "1. Upload your full-body photo",
    cargandoFoto: "Uploading to locker...",
    fotoGuardada: "✅ Selfie Saved",
    seleccionarArchivo: "📸 Select File",
    paso2: "2. Generate Magic",
    probarEstaPieza: "TRY ON THIS PIECE",
    pedirInfo: "Request Information",
    reintentar: "Retry",
    descargar: "Download",
    waMensaje: "Hi! I tried the *[PRENDA]* model virtually. %0A%0ALook: [URL]"
  }
};

export default function BernarditaBoutique() {
  const [idioma, setIdioma] = useState<'es' | 'en'>('es');
  const t = TEXTOS[idioma];

  // ESTADOS DEL CARRITO Y PAGOS
  const [carrito, setCarrito] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [gatewayDetectado, setGatewayDetectado] = useState('stripe');

  // ESTADOS DEL PROBADOR
  const [fotoUsuarioUrl, setFotoUsuarioUrl] = useState<string | null>(null); 
  const [prendaSeleccionada, setPrendaSeleccionada] = useState<any | null>(null);
  const [estaProcesando, setEstaProcesando] = useState(false);
  const [estaSubiendoFoto, setEstaSubiendoFoto] = useState(false); 
  const [resultadoTryOnUrl, setResultadoTryOnUrl] = useState<string | null>(null);
  const [errorTryOn, setErrorTryOn] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code === 'MX') setGatewayDetectado('mercadopago');
        else setGatewayDetectado('stripe');
      })
      .catch(() => setGatewayDetectado('stripe'));
  }, []);

  const agregarAlCarrito = (p: any) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === p.id);
      if (existe) return prev.map(item => item.id === p.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      return [...prev, { ...p, nombre: idioma === 'es' ? (p.nombreEs || p.nombre) : (p.nombreEn || p.nombre), imagen: p.urlFrente || p.url, cantidad: 1 }];
    });
    setIsCartOpen(true);
  };

  const eliminarDelCarrito = (id: number) => setCarrito(prev => prev.filter(item => item.id !== id));
  
  const calcularTotal = () => carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const generarLinkDePago = async () => {
    if (carrito.length === 0) return;
    setProcesandoPago(true);
    try {
      const MATRIZ_URL = 'https://www.vioscode.io/api/checkout';
      const response = await fetch(MATRIZ_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          carrito: carrito,
          tienda: 'BERNARDITA',
          gateway: gatewayDetectado 
        })
      });
      const data = await response.json();
      if (data.urlPago) window.location.href = data.urlPago;
      else { alert('Error: ' + data.error); setProcesandoPago(false); }
    } catch (error) {
      console.error(error);
      setProcesandoPago(false);
    }
  };

  const manejarSubidaFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEstaSubiendoFoto(true);
      try {
        const response = await fetch(`/api/upload?filename=${file.name}`, { method: 'POST', body: file });
        const blob = await response.json();
        setFotoUsuarioUrl(blob.url);
      } catch (err) { setErrorTryOn('Error al subir.'); }
      finally { setEstaSubiendoFoto(false); }
    }
  };

  const ejecutarPruebaVirtual = async () => {
    if (!fotoUsuarioUrl || !prendaSeleccionada) return;
    setEstaProcesando(true);
    try {
      const URL_API_VIOS_CODE = 'https://vios-code.vercel.app/api/youcam-tryon';
      const response = await fetch(URL_API_VIOS_CODE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src_file_url: fotoUsuarioUrl, ref_file_url: prendaSeleccionada.url, tipoPrenda: 'cloth' }),
      });
      const data = await response.json();
      const taskId = data.data?.task_id;
      let terminado = false;
      let intentos = 0;
      while (!terminado && intentos < 40) {
        await new Promise(res => setTimeout(res, 3000));
        const pollRes = await fetch(`${URL_API_VIOS_CODE}?taskId=${taskId}`);
        const pollData = await pollRes.json();
        if (pollData.data?.task_status === 'done' || pollData.data?.task_status === 'success') {
          terminado = true;
          setResultadoTryOnUrl(pollData.data?.results?.url);
          break;
        }
        intentos++;
      }
    } catch (err) { setErrorTryOn('Error IA.'); }
    finally { setEstaProcesando(false); }
  };

  return (
    <main className="min-h-screen bg-white text-[#333] font-serif selection:bg-[#EAE0D5] relative">
      <SensorTrafico marca="BERNARDITA" />

      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full py-4 px-6 flex items-center justify-between bg-[#C4346E] text-white shadow-md">
        <button onClick={() => window.location.href = '/boutiques'} className="text-[10px] font-bold uppercase tracking-widest">{t.volver}</button>
        
        <img src="/logo_berni.jpeg" alt="Logo" className="h-10 md:h-14 object-contain" />

        <div className="flex items-center gap-4">
          <button onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')} className="text-[10px] font-bold uppercase tracking-widest">{idioma === 'es' ? 'EN' : 'ES'}</button>
          <button onClick={() => setIsCartOpen(true)} className="relative text-xl">
            🛒
            {carrito.length > 0 && <span className="absolute -top-2 -right-2 bg-white text-[#C4346E] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">{carrito.reduce((acc, i) => acc + i.cantidad, 0)}</span>}
          </button>
        </div>
      </header>

      {/* HISTORIA */}
      <section className="max-w-3xl mx-auto text-center py-12 px-8">
        <p className="text-sm md:text-base italic text-gray-500">{t.historia}</p>
      </section>

      {/* CATÁLOGO 1 */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATALOGO_PRINCIPAL.map((item) => (
            <div key={item.id} className="group flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                <img src={item.urlFrente} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
                <img src={item.urlAtras} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <button onClick={() => agregarAlCarrito(item)} className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-sans tracking-widest uppercase px-6 py-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl">{t.vistaRapida}</button>
              </div>
              <h3 className="text-xs font-sans text-gray-800">{idioma === 'es' ? item.nombreEs : item.nombreEn}</h3>
              <p className="text-xs font-sans text-[#9e1c1c] font-bold">${item.precio.toLocaleString('es-MX')} MXN</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATÁLOGO PROBADOR */}
      <section className="max-w-6xl mx-auto px-6 pb-24 bg-[#FDFBF7] pt-16 rounded-t-3xl border-t border-gray-100">
        <h2 className="text-center text-xl uppercase tracking-widest font-light mb-12">{t.tituloProbador}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATALOGO_PROBADOR.map((item) => (
            <div key={item.id} className="group cursor-pointer flex flex-col items-center">
              <div className="w-full aspect-[3/4] overflow-hidden bg-white rounded-xl mb-4 relative shadow-sm" onClick={() => setPrendaSeleccionada(item)}>
                <img src={item.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="bg-white text-black px-4 py-2 text-[9px] uppercase font-bold rounded-full">{t.probarBtn}</span>
                </div>
              </div>
              <h3 className="text-[10px] font-sans text-gray-600 uppercase text-center">{idioma === 'es' ? item.nombreEs : item.nombreEn}</h3>
              <p className="text-xs font-sans text-[#9e1c1c] font-bold">${item.precio.toLocaleString('es-MX')} MXN</p>
              <button onClick={() => agregarAlCarrito(item)} className="mt-2 text-[9px] underline font-bold uppercase tracking-widest hover:text-[#C4346E]">{t.vistaRapida}</button>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL CARRITO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col p-8">
            <button onClick={() => setIsCartOpen(false)} className="absolute top-6 right-6 text-xl">✕</button>
            <h2 className="text-xl font-bold uppercase tracking-tighter mb-8">{t.carritoTitulo}</h2>
            <div className="flex-1 overflow-y-auto space-y-6">
              {carrito.length === 0 ? <p className="text-sm text-gray-400">{t.vacio}</p> : carrito.map((item, idx) => (
                <div key={idx} className="flex gap-4 border-b border-gray-50 pb-4">
                  <img src={item.imagen} className="w-16 h-20 object-cover rounded-md" />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold uppercase">{item.nombre}</h4>
                    <p className="text-xs text-[#C4346E] font-bold">${item.precio.toLocaleString('es-MX')} MXN</p>
                    <p className="text-[10px] text-gray-400">Cant: {item.cantidad}</p>
                  </div>
                  <button onClick={() => eliminarDelCarrito(item.id)} className="text-[10px] underline">X</button>
                </div>
              ))}
            </div>
            {carrito.length > 0 && (
              <div className="pt-8 border-t">
                <div className="flex justify-between mb-6">
                  <span className="text-sm font-bold uppercase">{t.total}</span>
                  <span className="text-xl font-bold text-[#C4346E]">${calcularTotal().toLocaleString('es-MX')} MXN</span>
                </div>
                <button onClick={generarLinkDePago} disabled={procesandoPago} className="w-full py-4 bg-black text-white font-bold uppercase text-[10px] tracking-widest shadow-xl hover:bg-gray-800 transition-colors">
                  {procesandoPago ? t.procesando : `${t.pagarBtn} ${gatewayDetectado === 'mercadopago' ? 'Mercado Pago' : 'Stripe'}`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL PROBADOR */}
      {prendaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-sm p-10 rounded-3xl shadow-2xl relative flex flex-col items-center">
            <button onClick={() => {setPrendaSeleccionada(null); setResultadoTryOnUrl(null); setFotoUsuarioUrl(null);}} className="absolute top-5 right-5 text-gray-400">✕</button>
            <h2 className="text-lg uppercase tracking-widest mb-8">{t.probadorTitulo}</h2>
            {!resultadoTryOnUrl ? (
              <>
                <img src={prendaSeleccionada.url || prendaSeleccionada.urlFrente} className="w-24 h-32 object-cover mb-8 rounded-lg" />
                <div className="w-full mb-6">
                  <label className="block text-[9px] font-bold uppercase mb-2">{t.paso1}</label>
                  <input type="file" onChange={manejarSubidaFoto} className="text-[10px] w-full border p-2 rounded-xl" />
                  {estaSubiendoFoto && <p className="text-[9px] animate-pulse mt-2">{t.cargandoFoto}</p>}
                </div>
                <button onClick={ejecutarPruebaVirtual} disabled={estaProcesando || !fotoUsuarioUrl} className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl shadow-lg">
                  {estaProcesando ? t.procesando : t.probarEstaPieza}
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center w-full">
                <img src={resultadoTryOnUrl} className="max-w-full rounded-xl mb-6 shadow-md" />
                <button onClick={() => agregarAlCarrito(prendaSeleccionada)} className="w-full py-4 bg-[#C4346E] text-white text-[10px] font-bold uppercase rounded-2xl mb-4 shadow-lg">{t.vistaRapida}</button>
                <button onClick={() => setResultadoTryOnUrl(null)} className="text-[10px] underline">{t.reintentar}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}