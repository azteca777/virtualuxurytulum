'use client';

import React, { useState, useEffect } from 'react';
import SensorTrafico from '../components/SensorTrafico'; // 📡 IMPORTACIÓN DEL RADAR

// === IMÁGENES DEL CARRUSEL PRINCIPAL ===
const HERO_IMAGES = [
  '/oasis/oa30.jpeg',
  '/oasis/oa31.jpeg',
  '/oasis/oa36.jpeg',
];

// === CATÁLOGO 1 (Arriba del video) ===
const CATALOGO_1 = [
  { id: 1, nombreEs: 'Conjunto Verde', nombreEn: 'Green Set', precio: 1299.00, url: '/oasis/oa1.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa1.jpeg' },
  { id: 2, nombreEs: 'Vestido Largo Arena', nombreEn: 'Sand Long Dress', precio: 1450.00, url: '/oasis/oa2.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa2.jpeg' },
  { id: 3, nombreEs: 'Conjunto Azul Eléctrico', nombreEn: 'Electric Blue Set', precio: 1199.00, url: '/oasis/oa3.jpeg', tieneProbador: false },
  { id: 4, nombreEs: 'Top Blanco Acanalado', nombreEn: 'White Ribbed Top', precio: 899.00, url: '/oasis/oa4.jpeg', tieneProbador: false },
  { id: 5, nombreEs: 'Top Verde Oliva', nombreEn: 'Olive Green Top', precio: 850.00, url: '/oasis/oa5.jpeg', tieneProbador: false },
  { id: 6, nombreEs: 'Vestido Negro Cut-Out', nombreEn: 'Black Cut-Out Dress', precio: 1600.00, url: '/oasis/oa6.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa6.jpeg' },
  { id: 7, nombreEs: 'Conjunto Deportivo Beige', nombreEn: 'Beige Sport Set', precio: 1350.00, url: '/oasis/oa7.jpeg', tieneProbador: false },
  { id: 8, nombreEs: 'Pantalón Cargo Gris', nombreEn: 'Grey Cargo Pants', precio: 1100.00, url: '/oasis/oa8.jpeg', tieneProbador: false },
];

// === CATÁLOGO 2 (Abajo del video - 3 filas de 4 = 12 prendas) ===
const CATALOGO_2 = [
  { id: 9, nombreEs: 'Vestido Negro Asimétrico', nombreEn: 'Asymmetric Black Dress', precio: 1550.00, url: '/oasis/oa9.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa9.jpeg' },
  { id: 10, nombreEs: 'Mini Falda Marrón', nombreEn: 'Brown Mini Skirt', precio: 950.00, url: '/oasis/oa10.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa10.jpeg' },
  { id: 11, nombreEs: 'Mini Falda Negra', nombreEn: 'Black Mini Skirt', precio: 950.00, url: '/oasis/oa11.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa11.jpeg' },
  { id: 12, nombreEs: 'Falda Pareo Blanca', nombreEn: 'White Wrap Skirt', precio: 1050.00, url: '/oasis/oa12.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa12.jpeg' },
  { id: 13, nombreEs: 'Top Beige Cruzado', nombreEn: 'Beige Wrap Top', precio: 750.00, url: '/oasis/oa13.jpeg', tieneProbador: false },
  { id: 14, nombreEs: 'Vestido Blanco Playa', nombreEn: 'White Beach Dress', precio: 1200.00, url: '/oasis/oa14.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa14.jpeg' },
  { id: 15, nombreEs: 'Conjunto Falda Larga', nombreEn: 'Long Skirt Set', precio: 1400.00, url: '/oasis/oa15.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa15.jpeg' },
  { id: 16, nombreEs: 'Bikini Estampado', nombreEn: 'Printed Bikini', precio: 1150.00, url: '/oasis/oa16.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa16.jpeg' },
  { id: 17, nombreEs: 'Top Asimétrico Verde', nombreEn: 'Green Asymmetric Top', precio: 800.00, url: '/oasis/oa17.jpeg', tieneProbador: false },
  { id: 18, nombreEs: 'Pantalón Lino Negro', nombreEn: 'Black Linen Pants', precio: 1250.00, url: '/oasis/oa18.jpeg', tieneProbador: false },
  { id: 19, nombreEs: 'Vestido Espalda Descubierta', nombreEn: 'Open Back Dress', precio: 1650.00, url: '/oasis/oa19.jpeg', tieneProbador: false },
  { id: 20, nombreEs: 'Conjunto Gafas y Top', nombreEn: 'Glasses & Top Set', precio: 1800.00, url: '/oasis/oa20.jpeg', tieneProbador: false },
];

// === CATÁLOGO 3 (Al final - 5 filas de 4 = 20 prendas) ===
const CATALOGO_3 = [
  { id: 21, nombreEs: 'Accesorios Madera', nombreEn: 'Wooden Accessories', precio: 450.00, url: '/oasis/oa21.jpeg', tieneProbador: false },
  { id: 22, nombreEs: 'Bolsa de Playa', nombreEn: 'Beach Bag', precio: 850.00, url: '/oasis/oa22.jpeg', tieneProbador: false },
  { id: 23, nombreEs: 'Vestido Tubo Negro', nombreEn: 'Black Tube Dress', precio: 1100.00, url: '/oasis/oa23.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa23.jpeg' },
  { id: 24, nombreEs: 'Romper Negro', nombreEn: 'Black Romper', precio: 1350.00, url: '/oasis/oa24.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa24.jpeg' },
  { id: 25, nombreEs: 'Conjunto Deportivo Verde', nombreEn: 'Green Sport Set', precio: 1200.00, url: '/oasis/oa25.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa25.jpeg' },
  { id: 26, nombreEs: 'Shorts Negros', nombreEn: 'Black Shorts', precio: 650.00, url: '/oasis/oa26.jpeg', tieneProbador: false },
  { id: 27, nombreEs: 'Gafas de Sol Blancas', nombreEn: 'White Sunglasses', precio: 550.00, url: '/oasis/oa27.jpeg', tieneProbador: false },
  { id: 28, nombreEs: 'Conjunto Verde Oliva', nombreEn: 'Olive Green Set', precio: 1450.00, url: '/oasis/oa28.jpeg', tieneProbador: false },
  { id: 29, nombreEs: 'Bikini Rosa Neón', nombreEn: 'Neon Pink Bikini', precio: 1150.00, url: '/oasis/oa29.jpeg', tieneProbador: false },
  { id: 30, nombreEs: 'Sombrero Paja', nombreEn: 'Straw Hat', precio: 700.00, url: '/oasis/oa30.jpeg', tieneProbador: false },
  { id: 31, nombreEs: 'Bikini Marrón', nombreEn: 'Brown Bikini', precio: 1250.00, url: '/oasis/oa31_1.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa31_1.jpeg' }, 
  { id: 32, nombreEs: 'Top Azul Detalle', nombreEn: 'Blue Detail Top', precio: 900.00, url: '/oasis/oa32.jpeg', tieneProbador: false },
  { id: 33, nombreEs: 'Blusa Transparente', nombreEn: 'Sheer Blouse', precio: 1050.00, url: '/oasis/oa33.jpeg', tieneProbador: false },
  { id: 34, nombreEs: 'Bikini Deportivo Negro', nombreEn: 'Black Sport Bikini', precio: 1300.00, url: '/oasis/oa34.jpeg', tieneProbador: false },
  { id: 35, nombreEs: 'Gafas de Sol Carey', nombreEn: 'Tortoiseshell Glasses', precio: 600.00, url: '/oasis/oa35.jpeg', tieneProbador: false },
  { id: 36, nombreEs: 'Traje Completo Negro', nombreEn: 'Black One-Piece', precio: 1550.00, url: '/oasis/oa36.jpeg', tieneProbador: false }, 
  { id: 37, nombreEs: 'Vestido Lencero Negro', nombreEn: 'Black Slip Dress', precio: 1400.00, url: '/oasis/oa37.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa37.jpeg' },
  { id: 38, nombreEs: 'Vestido Cut-Out Blanco', nombreEn: 'White Cut-Out Dress', precio: 1600.00, url: '/oasis/oa38.jpeg', tieneProbador: true, urlPublicaVercel: 'https://grutgbujoy4xc00c.public.blob.vercel-storage.com/oa38.jpeg' },
  { id: 39, nombreEs: 'Bikini Leopardo', nombreEn: 'Leopard Bikini', precio: 1350.00, url: '/oasis/oa39.jpeg', tieneProbador: false },
  { id: 40, nombreEs: 'Bikini Azul Cielo', nombreEn: 'Sky Blue Bikini', precio: 1200.00, url: '/oasis/oa40.jpeg', tieneProbador: false },
];

const TEXTOS = {
  es: {
    volver: "Volver",
    mujer: "MUJER",
    hombre: "HOMBRE",
    coleccion: "NUEVA COLECCIÓN",
    probadorBtn: "PROBAR",
    añadirBtn: "AÑADIR",
    tituloProbador: "PROBADOR VIRTUAL",
    paso1: "1. Sube tu foto de cuerpo completo",
    cargandoFoto: "Cargando...",
    fotoGuardada: "✅ Foto Guardada",
    seleccionarArchivo: "Seleccionar Archivo",
    paso2: "2. Generar Prueba",
    procesando: "Procesando...",
    probarEstaPieza: "PROBAR PRENDA",
    pedirInfo: "ASESORÍA",
    reintentar: "REINTENTAR",
    descargar: "DESCARGAR",
    tePuedeInteresar: "TE PUEDE INTERESAR",
    videoTitulo: "OASIS VIBES",
    videoSub: "Regístrate y disfruta de envíos gratis en todas tus compras",
    videoBtn: "Descubre más",
    historiaTitulo: "LA ESENCIA DE OASIS",
    historiaTexto: "En Oasis, creemos que la moda es una extensión de tu personalidad. Nuestras colecciones están diseñadas para la mujer moderna que busca piezas versátiles, atrevidas y cómodas. Inspirados en la energía de la ciudad y la tranquilidad de la playa, creamos prendas que te hacen sentir segura y lista para cualquier ocasión. Descubre tu propio oasis de estilo con nosotros.",
    masEstilos: "MÁS ESTILOS",
    waMensaje: "Hola! Me probé el modelo *[PRENDA]* de Oasis en el probador virtual. %0A%0AMira: [URL]%0A%0A¡Quiero más información!",
    carritoTitulo: "TU CARRITO",
    total: "TOTAL",
    pagarBtn: "PAGAR CON",
    vacio: "Tu carrito está vacío."
  },
  en: {
    volver: "Back",
    mujer: "WOMAN",
    hombre: "MAN",
    coleccion: "NEW COLLECTION",
    probadorBtn: "TRY ON",
    añadirBtn: "ADD",
    tituloProbador: "VIRTUAL FITTING ROOM",
    paso1: "1. Upload full-body photo",
    cargandoFoto: "Uploading...",
    fotoGuardada: "✅ Photo Saved",
    seleccionarArchivo: "Select File",
    paso2: "2. Generate Try-On",
    procesando: "Processing...",
    probarEstaPieza: "TRY ON ITEM",
    pedirInfo: "SUPPORT",
    reintentar: "RETRY",
    descargar: "DOWNLOAD",
    tePuedeInteresar: "YOU MIGHT BE INTERESTED",
    videoTitulo: "OASIS VIBES",
    videoSub: "Register and enjoy free shipping on all your purchases",
    videoBtn: "Discover more",
    historiaTitulo: "THE ESSENCE OF OASIS",
    historiaTexto: "At Oasis, we believe fashion is an extension of your personality. Our collections are designed for the modern woman who seeks versatile, bold, and comfortable pieces. Inspired by the energy of the city and the tranquility of the beach, we create garments that make you feel confident and ready for any occasion. Discover your own oasis of style with us.",
    masEstilos: "MORE STYLES",
    waMensaje: "Hi! I tried the *[PRENDA]* model from Oasis virtually. %0A%0ALook: [URL]%0A%0AI want more info!",
    carritoTitulo: "YOUR CART",
    total: "TOTAL",
    pagarBtn: "CHECKOUT VIA",
    vacio: "Your cart is empty."
  }
};

export default function OasisBoutique() {
  const [idioma, setIdioma] = useState<'es' | 'en'>('es');
  const t = TEXTOS[idioma];

  // ESTADOS DEL CARRUSEL Y DE PAGOS
  const [currentSlide, setCurrentSlide] = useState(0);
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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code === 'MX') setGatewayDetectado('mercadopago');
        else setGatewayDetectado('stripe');
      })
      .catch(() => setGatewayDetectado('stripe'));
  }, []);

  // LÓGICA DEL CARRITO
  const agregarAlCarrito = (p: any) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === p.id);
      if (existe) return prev.map(item => item.id === p.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      return [...prev, { ...p, nombre: idioma === 'es' ? (p.nombreEs || p.nombre) : (p.nombreEn || p.nombre), imagen: p.url, cantidad: 1 }];
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
          tienda: 'OASIS',
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

  // LÓGICA DEL PROBADOR
  const manejarSubidaFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setErrorTryOn(null);
      setEstaSubiendoFoto(true); 
      setFotoUsuarioUrl(null); 
      try {
        const response = await fetch(`/api/upload?filename=${file.name}`, { method: 'POST', body: file });
        const blob = await response.json();
        setFotoUsuarioUrl(blob.url); 
      } catch (err: any) { setErrorTryOn(idioma === 'es' ? 'Error al subir.' : 'Upload error.'); } 
      finally { setEstaSubiendoFoto(false); }
    }
  };

  const ejecutarPruebaVirtual = async () => {
    if (!fotoUsuarioUrl || !prendaSeleccionada) {
      setErrorTryOn(idioma === 'es' ? 'Falta foto o prenda.' : 'Missing photo or garment.');
      return;
    }
    setEstaProcesando(true);
    setErrorTryOn(null);
    setResultadoTryOnUrl(null);

    try {
      const URL_API_VIOS_CODE = 'https://vios-code.vercel.app/api/youcam-tryon'; 
      const prendaPublicUrl = prendaSeleccionada.urlPublicaVercel;

      const response = await fetch(URL_API_VIOS_CODE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src_file_url: fotoUsuarioUrl, ref_file_url: prendaPublicUrl, tipoPrenda: 'cloth' }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error.');

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
        } else if (pollData.data?.task_status === 'failed') {
          throw new Error(idioma === 'es' ? 'Error en la IA.' : 'AI Error.');
        }
        intentos++;
      }
    } catch (err: any) { setErrorTryOn(err.message); } 
    finally { setEstaProcesando(false); }
  };

  const generarLinkWhatsApp = () => {
    if (!prendaSeleccionada || !resultadoTryOnUrl) return "#";
    const nombrePrenda = idioma === 'es' ? prendaSeleccionada.nombreEs : prendaSeleccionada.nombreEn;
    const urlFoto = encodeURIComponent(resultadoTryOnUrl);
    const numeroWhatsApp = "5217774492296"; 
    let mensaje = t.waMensaje.replace('[PRENDA]', nombrePrenda).replace('[URL]', urlFoto);
    return `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  };

  // Componente de Tarjeta con los DOS BOTONES (Probar y Añadir)
  const ProductCard = ({ item }: { item: any }) => (
    <div className="group relative flex flex-col cursor-pointer">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-2">
        <img src={item.url} alt={item.nombreEs} className="w-full h-full object-cover object-center" />
        
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 px-4">
          {item.tieneProbador && (
            <button 
              onClick={(e) => { e.stopPropagation(); setPrendaSeleccionada(item); }}
              className="bg-white text-black w-full py-2.5 text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-gray-200 transition-colors"
            >
              {t.probadorBtn}
            </button>
          )}
          <button 
            onClick={(e) => { e.stopPropagation(); agregarAlCarrito(item); }}
            className="bg-black text-white w-full py-2.5 text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-gray-900 transition-colors"
          >
            {t.añadirBtn}
          </button>
        </div>
      </div>
      <div className="px-1 flex flex-col gap-1">
        <h3 className="text-[11px] md:text-xs text-gray-800 uppercase font-medium">{idioma === 'es' ? item.nombreEs : item.nombreEn}</h3>
        <p className="text-[11px] md:text-xs text-black font-bold">${item.precio.toLocaleString('es-MX')}</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-black font-sans relative">
      <SensorTrafico marca="OASIS" />

      {/* NAVEGACIÓN */}
      <header className="sticky top-0 z-40 w-full bg-white flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-6">
          <img src="/logo_oasis.jpeg" alt="Oasis Logo" className="h-16 md:h-20 object-contain" />
          <nav className="hidden md:flex gap-4 text-[11px] font-bold tracking-widest uppercase">
            <span className="cursor-pointer border-b-2 border-black pb-1">{t.mujer}</span>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-bold tracking-widest uppercase">
          <button onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')} className="hover:underline">
            {idioma === 'es' ? 'EN' : 'ES'}
          </button>
          <button onClick={() => window.location.href = '/boutiques'} className="hover:underline">
            {t.volver}
          </button>
          <button onClick={() => setIsCartOpen(true)} className="relative text-xl ml-2">
            🛒
            {carrito.length > 0 && <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{carrito.reduce((acc, i) => acc + i.cantidad, 0)}</span>}
          </button>
        </div>
      </header>

      {/* SECCIÓN 1: HERO */}
      <section className="relative w-full h-[70vh] md:h-[85vh] bg-gray-200 overflow-hidden">
        {HERO_IMAGES.map((imgUrl, index) => (
          <img 
            key={index}
            src={imgUrl} 
            alt="Oasis Collection" 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-end items-center pb-12 md:pb-20">
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter drop-shadow-md text-center px-4">
            {t.coleccion}
          </h2>
        </div>
      </section>

      {/* SECCIÓN 2: GRID 1 */}
      <section className="w-full px-2 py-4 md:px-4 md:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {CATALOGO_1.map((item) => <ProductCard key={item.id} item={item} />)}
        </div>
      </section>

      {/* SECCIÓN 3: VIDEO */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden my-4 md:my-8 bg-black group cursor-pointer">
        <video src="/oasis/video_oasis.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/30">
          <h2 className="text-white text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4 drop-shadow-lg">{t.videoTitulo}</h2>
          <p className="text-white text-[11px] md:text-sm font-bold tracking-widest uppercase mb-6 drop-shadow-md max-w-md">{t.videoSub}</p>
          <button className="bg-[#E4002B] text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg">{t.videoBtn}</button>
        </div>
      </section>

      {/* SECCIÓN 4: GRID 2 */}
      <section className="w-full px-2 py-4 md:px-4 md:py-8">
        <div className="mb-6 px-2">
          <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase border-b-2 border-black inline-block pb-1">{t.tePuedeInteresar}</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {CATALOGO_2.map((item) => <ProductCard key={item.id} item={item} />)}
        </div>
      </section>

      {/* SECCIÓN 5: HISTORIA */}
      <section className="w-full bg-[#F8F8F8] py-16 px-4 md:px-8 my-8 text-center border-t border-b border-gray-200">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-6 text-black">{t.historiaTitulo}</h2>
          <p className="text-sm md:text-base font-medium text-gray-700 leading-relaxed">{t.historiaTexto}</p>
          <div className="w-16 h-1 bg-black mt-8"></div>
        </div>
      </section>

      {/* SECCIÓN 6: GRID 3 */}
      <section className="w-full px-2 py-4 md:px-4 md:py-8 pb-20">
        <div className="mb-6 px-2">
          <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase border-b-2 border-black inline-block pb-1">{t.masEstilos}</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {CATALOGO_3.map((item) => <ProductCard key={item.id} item={item} />)}
        </div>
      </section>

      {/* --- MODAL DEL CARRITO --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 md:p-8">
            <button onClick={() => setIsCartOpen(false)} className="absolute top-6 right-6 text-xl">✕</button>
            <h2 className="text-xl font-black tracking-tighter mb-8">{t.carritoTitulo}</h2>
            <div className="flex-1 overflow-y-auto space-y-6">
              {carrito.length === 0 ? <p className="text-sm text-gray-400">{t.vacio}</p> : carrito.map((item, idx) => (
                <div key={idx} className="flex gap-4 border-b border-gray-100 pb-4">
                  <img src={item.imagen} className="w-16 h-20 object-cover border border-gray-100" />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold uppercase line-clamp-1">{item.nombre}</h4>
                    <p className="text-xs text-black font-bold mt-1">${item.precio.toLocaleString('es-MX')}</p>
                    <p className="text-[10px] text-gray-500 mt-1">Cant: {item.cantidad}</p>
                  </div>
                  <button onClick={() => eliminarDelCarrito(item.id)} className="text-[10px] underline hover:text-red-500">X</button>
                </div>
              ))}
            </div>
            {carrito.length > 0 && (
              <div className="pt-6 border-t border-black">
                <div className="flex justify-between mb-6">
                  <span className="text-sm font-bold uppercase">{t.total}</span>
                  <span className="text-xl font-black">${calcularTotal().toLocaleString('es-MX')}</span>
                </div>
                <button onClick={generarLinkDePago} disabled={procesandoPago} className="w-full py-4 bg-black text-white font-bold uppercase text-[10px] tracking-widest hover:bg-gray-800 transition-colors">
                  {procesandoPago ? t.procesando : `${t.pagarBtn} ${gatewayDetectado === 'mercadopago' ? 'Mercado Pago' : 'Stripe'}`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL DEL PROBADOR VIRTUAL --- */}
      {prendaSeleccionada && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md p-6 md:p-8 relative flex flex-col items-center shadow-2xl">
            <button onClick={() => {setPrendaSeleccionada(null); setResultadoTryOnUrl(null); setFotoUsuarioUrl(null); setErrorTryOn(null);}} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-black font-light text-xl hover:opacity-50 transition-opacity">✕</button>
            <h2 className="text-xl font-black tracking-tighter mb-6">{t.tituloProbador}</h2>
            
            {!resultadoTryOnUrl ? (
              <>
                <div className="w-24 h-32 bg-gray-100 mb-6 border border-gray-200">
                  <img src={prendaSeleccionada.url || prendaSeleccionada.urlPublicaVercel} alt="Prenda" className="w-full h-full object-cover"/>
                </div>
                <div className="w-full mb-6">
                  <label className="block text-[10px] text-gray-500 font-bold uppercase mb-2">{t.paso1}</label>
                  {estaSubiendoFoto ? (
                    <div className="w-full p-4 bg-gray-50 text-[10px] font-bold uppercase text-gray-400 text-center border border-gray-200">{t.cargandoFoto}</div>
                  ) : (
                    <div className="relative w-full">
                      <input type="file" accept="image/*" onChange={manejarSubidaFoto} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                      <div className={`w-full p-4 border border-black text-[10px] font-bold uppercase text-center transition-colors ${fotoUsuarioUrl ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}`}>
                        {fotoUsuarioUrl ? t.fotoGuardada : t.seleccionarArchivo}
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-[10px] text-gray-500 font-bold uppercase mb-2">{t.paso2}</label>
                  <button onClick={ejecutarPruebaVirtual} disabled={estaProcesando || !fotoUsuarioUrl} className={`w-full py-4 text-[11px] font-bold uppercase transition-all flex items-center justify-center border border-black ${estaProcesando ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'}`}>
                    {estaProcesando ? t.procesando : t.probarEstaPieza}
                  </button>
                </div>
                {errorTryOn && <p className="text-red-500 text-[10px] mt-4 font-bold uppercase">{errorTryOn}</p>}
              </>
            ) : (
              <div className="flex flex-col items-center w-full">
                <div className="relative w-full max-h-[45vh] flex justify-center bg-gray-50 p-2 mb-6 border border-gray-200">
                  <img src={resultadoTryOnUrl} alt="Resultado" className="max-w-full max-h-[45vh] object-contain"/>
                </div>
                
                <div className="flex flex-col gap-2 w-full">
                  {/* EL BOTÓN DE AÑADIR DIRECTO DESDE EL ESPEJO MÁGICO */}
                  <button 
                    onClick={() => { agregarAlCarrito(prendaSeleccionada); setPrendaSeleccionada(null); setResultadoTryOnUrl(null); }} 
                    className="w-full py-4 bg-black text-white text-[11px] font-bold text-center uppercase hover:bg-gray-800 transition-colors shadow-lg"
                  >
                    {t.añadirBtn} AL CARRITO
                  </button>

                  <a href={generarLinkWhatsApp()} target="_blank" rel="noreferrer" className="w-full py-3 bg-[#25D366] text-white text-[10px] font-bold text-center uppercase hover:bg-[#20bd5a] transition-colors border border-transparent">
                    {t.pedirInfo}
                  </a>

                  <div className="flex gap-2 w-full mt-2">
                    <button onClick={() => setResultadoTryOnUrl(null)} className="flex-1 py-3 bg-white border border-black text-black text-[10px] font-bold uppercase hover:bg-gray-50 transition-colors">
                      {t.reintentar}
                    </button>
                    <a href={resultadoTryOnUrl} download="Oasis_TryOn.jpg" target="_blank" rel="noreferrer" className="flex-1 py-3 bg-white border border-gray-300 text-black text-[10px] font-bold text-center uppercase hover:bg-gray-100 transition-colors">
                      {t.descargar}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}