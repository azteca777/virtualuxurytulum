'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// === BASE DE DATOS DE PRODUCTOS ===
const CATALOGO_LUKAS = [
  { id: 1, marca: 'BEAST', nombre: 'CLA + L-Carnitina Fresa/Kiwi', precio: 1320, imagen: '/lukas/su3.jpeg', tag: 'Más Vendido', desc: 'Fórmula quemadora de grasa sin estimulantes para mayor definición muscular.' },
  { id: 2, marca: 'DRAGON PHARMA', nombre: 'Creatine Monohydrate', precio: 890, imagen: '/lukas/su6.jpeg', desc: 'Creatina de grado farmacéutico para fuerza y recuperación explosiva.' },
  { id: 3, marca: 'USN', nombre: 'Immune Health 7 in 1', precio: 450, imagen: '/lukas/su2.jpeg', tag: 'Oferta', desc: 'Soporte inmunológico completo con vitamina C, Zinc y antioxidantes.' },
  { id: 4, marca: 'AGEX', nombre: 'Colágeno + Biotina', precio: 680, imagen: '/lukas/su4.jpeg', desc: 'Salud articular, piel, cabello y uñas fortalecidos.' },
  { id: 5, marca: 'EVOX', nombre: 'Colágeno Biotina Sabor Cereza', precio: 950, imagen: '/lukas/su8.jpeg', desc: 'Delicioso colágeno hidrolizado para tu rutina diaria de belleza y bienestar.' },
  { id: 6, marca: 'INSANE LABZ', nombre: 'Psychotic Pre-Workout', precio: 1650, imagen: '/lukas/su11.jpeg', desc: 'Energía extrema y enfoque mental láser para tus entrenamientos más pesados.' },
  { id: 7, marca: 'VITFIT', nombre: 'Creatina Monohidratada', precio: 399, imagen: '/lukas/su13.jpeg', tag: 'Nuevo', desc: 'Creatina pura para mejorar tu rendimiento y resistencia deportiva.' },
  { id: 8, marca: 'VITFIT', nombre: 'Proteína Whey Sabor Chocolate', precio: 1100, imagen: '/lukas/su15.jpeg', desc: 'Proteína de suero de leche de rápida absorción, ideal post-entreno.' },
  { id: 9, marca: 'VITFIT', nombre: 'Amino Energy Sabor Fresa', precio: 750, imagen: '/lukas/su17.jpeg', desc: 'Aminoácidos con energía limpia para entrenar o tu día a día.' },
  { id: 10, marca: 'VITFIT', nombre: 'Chaos Pre-Workout Maracuyá', precio: 550, imagen: '/lukas/su18.jpeg', tag: 'Agotado', desc: 'Bombeos musculares y energía sostenida con sabor tropical.' },
  { id: 11, marca: 'VITFIT', nombre: 'Whey Protein Sabor Vainilla (Bote)', precio: 290, imagen: '/lukas/su19.jpeg', desc: 'Proteína premium para desarrollo muscular y recuperación.' },
  { id: 12, marca: 'VITFIT', nombre: 'Chaos Pre-Workout Blue Raz Ice', precio: 150, imagen: '/lukas/su20.jpeg', desc: 'Entrenamientos intensos con un toque refrescante de mora azul.' },
  { id: 13, marca: 'VITFIT', nombre: 'WPI-90 Isolate Proteína', precio: 420, imagen: '/lukas/su21.jpeg', desc: 'Aislado de suero de leche de altísima pureza y rápida digestión.' },
  { id: 14, marca: 'VITFIT', nombre: 'Whey Protein Sabor Vainilla (Bolsa)', precio: 820, imagen: '/lukas/su25.jpeg', tag: 'Oferta', desc: 'Proteína diaria esencial en un empaque económico y práctico.' },
  { id: 15, marca: 'VITFIT', nombre: 'Whey Protein Sabor Fresa', precio: 60, imagen: '/lukas/su27.jpeg', desc: 'Recuperación muscular con un delicioso y suave sabor a fresa.' },
  { id: 16, marca: 'VITFIT', nombre: 'Creatina Monohidratada (Bolsa)', precio: 990, imagen: '/lukas/su28.jpeg', desc: 'El suplemento más estudiado para aumentar fuerza, ahora en bolsa.' },
];

// === FUNCIÓN AUXILIAR PARA TRADUCIR TAGS ===
const traducirTag = (tag: string, idioma: string) => {
  if (idioma === 'es') return tag;
  const dicc: Record<string, string> = {
    'Más Vendido': 'Best Seller',
    'Oferta': 'Sale',
    'Nuevo': 'New',
    'Agotado': 'Sold Out'
  };
  return dicc[tag] || tag;
};

// === COMPONENTE BOTÓN ===
const Button = ({ children, variant = 'primary', className = '', onClick }: any) => {
  const baseClass = "px-4 py-2 md:px-6 md:py-3 text-[10px] md:text-sm font-extrabold uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl";
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-zinc-200 text-black hover:bg-white hover:text-black border border-zinc-300",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };
  return <button onClick={onClick} className={`${baseClass} ${variants[variant as keyof typeof variants]} ${className}`}>{children}</button>;
};

// === COMPONENTE TARJETA DE PRODUCTO ===
const ProductCard = ({ producto, onClickDetalle, onAddCarrito, idioma }: { producto: any, onClickDetalle: () => void, onAddCarrito: (p: any) => void, idioma: string }) => (
  <div className="border border-zinc-100 bg-white p-3 lg:p-4 group hover:shadow-2xl hover:border-red-600 transition-all duration-500 flex flex-col relative">
    
    <div onClick={onClickDetalle} className="cursor-pointer aspect-square w-full relative mb-3 lg:mb-4 overflow-hidden bg-zinc-50 flex items-center justify-center p-2 lg:p-4">
      {producto.tag && (
        <span className={`absolute top-1 lg:top-2 right-1 lg:right-2 text-[7px] lg:text-[9px] font-bold px-1.5 py-0.5 lg:px-2 lg:py-1 uppercase z-10 tracking-wider ${producto.tag === 'Agotado' ? 'bg-zinc-300 text-zinc-600' : 'bg-red-600 text-white'}`}>
          {traducirTag(producto.tag, idioma)}
        </span>
      )}
      <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/f4f4f5/a1a1aa?text=FOTO' }} />
    </div>
    
    <div className="flex-grow flex flex-col justify-between">
      <div onClick={onClickDetalle} className="cursor-pointer">
        <p className="text-[8px] lg:text-[10px] text-zinc-400 uppercase tracking-widest mb-1 font-bold">{producto.marca}</p>
        <h3 className="font-bold text-[10px] lg:text-sm mb-1 lg:mb-2 h-8 lg:h-10 line-clamp-2 leading-tight text-zinc-800 group-hover:text-black transition-colors">{producto.nombre}</h3>
      </div>
      <div>
        <p className="font-extrabold text-sm lg:text-lg text-red-600 mb-2 lg:mb-4">${producto.precio.toLocaleString('es-MX')} <span className="text-[8px] lg:text-[10px] text-zinc-400">MXN</span></p>
        <Button 
          variant="primary" 
          className={`w-full text-[9px] lg:text-[11px] py-2 ${producto.tag === 'Agotado' ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => { if(producto.tag !== 'Agotado') onAddCarrito(producto); }}
        >
          {producto.tag === 'Agotado' ? (idioma === 'es' ? 'Agotado' : 'Sold Out') : (idioma === 'es' ? 'Añadir al Carrito' : 'Add to Cart')}
        </Button>
      </div>
    </div>
  </div>
);

export default function LukasStore() {
  const [mounted, setMounted] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any | null>(null);
  
  // === ESTADOS DEL CARRITO E IDIOMA ===
  const [carrito, setCarrito] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [idioma, setIdioma] = useState('es');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // === FUNCIONES DEL CARRITO ===
  const agregarAlCarrito = (producto: any) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    setIsCartOpen(true);
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  // === INTEGRACIÓN WHATSAPP / MANYCHAT ===
  const enviarPedidoWhatsApp = () => {
    if (carrito.length === 0) return;
    
    const numeroWhatsApp = "5219984760310"; 
    
    const llaveManyChat = idioma === 'es' ? '[NUEVA ORDEN: GODS AESTHETICS]' : '[NEW ORDER: GODS AESTHETICS]';
    
    let textoMensaje = `${llaveManyChat}\n\n`;
    
    textoMensaje += idioma === 'es' 
      ? `*¡Hola!* ⚡\nQuiero confirmar el siguiente pedido:\n\n`
      : `*Hello!* ⚡\nI want to confirm the following order:\n\n`;
    
    carrito.forEach(item => {
      textoMensaje += `▪️ ${item.cantidad}x ${item.nombre} ($${(item.precio * item.cantidad).toLocaleString('es-MX')} MXN)\n`;
    });
    
    textoMensaje += idioma === 'es'
      ? `\n*Total estimado: $${calcularTotal().toLocaleString('es-MX')} MXN*\n\nPor favor indíquenme las opciones de pago. 📍`
      : `\n*Estimated Total: $${calcularTotal().toLocaleString('es-MX')} MXN*\n\nPlease provide payment options. 📍`;

    const urlWA = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensaje)}`;
    window.open(urlWA, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white relative">
      
      {/* 👇 NAVEGACIÓN FIJA 👇 */}
      <div className="fixed top-0 left-0 w-full z-40">
        <div className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest text-center py-2.5 overflow-hidden relative shadow-md">
          <div className="animate-marquee whitespace-nowrap">
            {idioma === 'es' 
              ? '⚡ ENVÍO GRATIS EN PEDIDOS MAYORES A $2,499 MXN ⚡ | 🎁 REGALO EN COMPRAS DE PROTEÍNA WHEY 🎁 | ⚡ ENVÍO GRATIS EN PEDIDOS MAYORES A $2,499 MXN ⚡'
              : '⚡ FREE SHIPPING ON ORDERS OVER $2,499 MXN ⚡ | 🎁 FREE GIFT WITH WHEY PROTEIN PURCHASES 🎁 | ⚡ FREE SHIPPING ON ORDERS OVER $2,499 MXN ⚡'
            }
          </div>
        </div>

        <header className="bg-black text-white border-b border-zinc-800 shadow-xl">
          <nav className="max-w-[1400px] mx-auto p-4 flex items-center justify-between relative">
            <Link href="/" className="text-zinc-400 hover:text-white text-[10px] tracking-[0.2em] uppercase font-bold transition-colors">
              ← {idioma === 'es' ? 'Volver' : 'Back'}
            </Link>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 flex justify-center">
               <img src="/logo_lukas2.png" alt="Gods Aesthetics" className="h-10 md:h-14 object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>

            <div className="flex items-center gap-4 md:gap-6 text-xl">
              <button 
                onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')} 
                className="text-[9px] md:text-xs font-bold uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                {idioma === 'es' ? '🇺🇸 ENG' : '🇲🇽 ESP'}
              </button>
              
              <button className="hover:text-red-500 transition-colors">🔍</button>
              
              <button onClick={() => setIsCartOpen(true)} className="hover:text-red-500 transition-colors relative">
                🛒
                {carrito.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* 👇 HERO VIDEOS 👇 */}
      <section className="fixed top-[100px] left-0 h-[calc(100vh-100px)] w-full bg-black flex items-center justify-center z-0">
        <div className="absolute inset-0 flex w-full h-full">
          <video autoPlay loop muted playsInline className="w-1/2 h-full object-cover opacity-50 mix-blend-luminosity">
            <source src="https://grutgbujoy4xc00c.public.blob.vercel-storage.com/video1_lukas.mp4" type="video/mp4" />
          </video>
          <video autoPlay loop muted playsInline className="w-1/2 h-full object-cover opacity-50 mix-blend-luminosity border-l border-zinc-900">
            <source src="https://grutgbujoy4xc00c.public.blob.vercel-storage.com/video3_lukas.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 text-white max-w-4xl pointer-events-none mb-20">
          <span className="text-red-600 font-bold tracking-[0.3em] uppercase mb-8 text-sm md:text-base border-b-2 border-red-600 pb-1">
            {idioma === 'es' ? 'Domina tu entrenamiento' : 'Dominate your training'}
          </span>
          <img 
            src="/logo_lukas2.png" 
            alt="Gods Aesthetics" 
            className="w-64 md:w-96 lg:w-[24rem] object-contain mb-8 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-auto" 
            onError={(e) => { e.currentTarget.style.display = 'none' }} 
          />
          <p className="text-lg md:text-2xl mb-10 text-zinc-300 font-light">
            {idioma === 'es' 
              ? 'Suplementación de grado élite para atletas que no conocen límites.'
              : 'Elite-grade supplementation for athletes who know no limits.'}
          </p>
        </div>
      </section>

      {/* 👇 CONTENIDO SCROLL 👇 */}
      <main className="relative z-10 bg-white mt-[100vh] pt-20 pb-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">

        {/* 4. Objetivos */}
        <section className="max-w-[1400px] mx-auto px-6 mb-20">
          <h2 className="text-center text-xl md:text-2xl font-black uppercase tracking-widest mb-10">
            {idioma === 'es' ? 'Comprar por objetivos' : 'Shop by Goals'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { titulo: idioma === 'es' ? 'Ponerme mamad@' : 'Get Swole', img: '/lukas/imagen1_lukas.jpeg' },
              { titulo: idioma === 'es' ? 'Mejorar mi salud' : 'Improve Health', img: '/lukas/imagen2_lukas.jpeg' },
              { titulo: idioma === 'es' ? 'Mejorar rendimiento' : 'Boost Performance', img: '/lukas/imagen3_lukas.jpeg' },
              { titulo: idioma === 'es' ? 'Quemar grasa' : 'Lose Fat', img: '/lukas/imagen4_lukas.jpeg' },
            ].map((item, i) => (
              <Link href="#" key={i} className="group flex flex-col items-center">
                <div className="relative w-full aspect-square bg-zinc-900 overflow-hidden mb-4">
                  <img src={item.img} alt={item.titulo} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500" onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x600/18181b/3f3f46?text=FOTO' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-black text-4xl md:text-5xl uppercase tracking-wider drop-shadow-lg flex items-center">
                      {idioma === 'es' ? 'SÍ PUEDES' : 'YOU CAN'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-0 w-full flex justify-center">
                     <span className="text-white font-black italic tracking-tighter text-lg drop-shadow-md">
                       {idioma === 'es' ? 'HAZLO' : 'DO IT'}
                     </span>
                  </div>
                </div>
                <h3 className="font-bold text-sm md:text-base text-zinc-900 group-hover:text-red-600 transition-colors">{item.titulo}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. ARSENAL DESTACADO */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-6 mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
                {idioma === 'es' ? 'Arsenal Destacado' : 'Featured Arsenal'}
              </h2>
              <p className="text-sm text-zinc-500 mt-2">
                {idioma === 'es' ? 'Los suplementos más elegidos por nuestros atletas.' : 'The most chosen supplements by our athletes.'}
              </p>
            </div>
            <Link href="#" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-red-600 hover:border-red-600 transition-colors">
              {idioma === 'es' ? 'Ver todo el arsenal →' : 'View all arsenal →'}
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {CATALOGO_LUKAS.map((prod) => (
              <ProductCard 
                key={prod.id} 
                producto={prod} 
                onClickDetalle={() => setProductoSeleccionado(prod)} 
                onAddCarrito={agregarAlCarrito}
                idioma={idioma}
              />
            ))}
          </div>
        </section>

        {/* 6. Apparel */}
        <section className="max-w-[1400px] mx-auto px-6 mb-20">
          <div className="bg-zinc-950 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center shadow-2xl">
            <div className="p-12 md:p-20 flex-1 text-white">
              <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                Gods Apparel
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
                {idioma === 'es' ? 'Vístete para' : 'Dress for'}<br/>{idioma === 'es' ? 'la Guerra' : 'War'}
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md">
                {idioma === 'es' 
                  ? 'Nuestra nueva línea de ropa compresiva y accesorios diseñados para soportar los entrenamientos más brutales.'
                  : 'Our new line of compression wear and accessories designed to withstand the most brutal workouts.'}
              </p>
              <Button variant="danger">{idioma === 'es' ? 'Equípate Ahora' : 'Gear Up Now'}</Button>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-full min-h-[400px] bg-zinc-800 relative group overflow-hidden">
               <img src="/lukas/apparel.jpg" alt="Apparel" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop' }}/>
            </div>
          </div>
        </section>

        {/* 7. Guías Video */}
        <section className="bg-zinc-100 py-20 border-y border-zinc-200">
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6">
                {idioma === 'es' ? '¿No sabes por dónde empezar?' : "Don't know where to start?"}
              </h2>
              <p className="text-zinc-600 mb-8 text-lg">
                {idioma === 'es' 
                  ? 'Te explicamos exactamente qué tomar, cuándo tomarlo y cómo maximizar tus resultados con las combinaciones correctas. Sin filtros, pura ciencia.'
                  : 'We explain exactly what to take, when to take it, and how to maximize your results with the right combinations. No filters, pure science.'}
              </p>
              <Button>{idioma === 'es' ? 'Ver Academia' : 'View Academy'}</Button>
            </div>
            
            <div className="aspect-[9/16] md:aspect-[3/4] max-h-[600px] mx-auto w-full max-w-sm bg-black rounded-2xl shadow-2xl overflow-hidden relative group border-4 border-zinc-800 hover:border-red-600 transition-colors duration-500">
               <video controls playsInline poster="/logo_lukas2.png" className="absolute inset-0 w-full h-full object-cover">
                 <source src="https://grutgbujoy4xc00c.public.blob.vercel-storage.com/video2_lukas.mp4" type="video/mp4" />
               </video>
            </div>
          </div>
        </section>

      </main>

      {/* 👇 VENTANA MODAL (DETALLE DEL PRODUCTO) 👇 */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden border-2 border-red-600">
            
            <button onClick={() => setProductoSeleccionado(null)} className="absolute top-4 right-4 z-10 w-8 h-8 bg-zinc-100 flex items-center justify-center rounded-full text-zinc-500 hover:text-black hover:bg-zinc-200 transition-colors">✕</button>

            <div className="w-full md:w-1/2 bg-zinc-50 p-6 flex items-center justify-center relative">
              {productoSeleccionado.tag && (
                <span className={`absolute top-4 left-4 text-[10px] font-bold px-2 py-1 uppercase z-10 tracking-wider ${productoSeleccionado.tag === 'Agotado' ? 'bg-zinc-300 text-zinc-600' : 'bg-red-600 text-white'}`}>
                  {traducirTag(productoSeleccionado.tag, idioma)}
                </span>
              )}
              <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} className="w-full h-auto max-h-[250px] md:max-h-[300px] object-contain" />
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-2 font-bold">{productoSeleccionado.marca}</p>
              <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter mb-3 text-zinc-900">{productoSeleccionado.nombre}</h2>
              <p className="text-xs md:text-sm text-zinc-600 mb-4 line-clamp-3">{productoSeleccionado.desc}</p>
              
              <p className="font-extrabold text-2xl text-red-600 mb-6">${productoSeleccionado.precio.toLocaleString('es-MX')} <span className="text-sm text-zinc-400 font-medium">MXN</span></p>
              
              <div className="flex gap-4">
                <Button 
                  variant="danger" 
                  className="w-full py-3 text-sm"
                  onClick={() => {
                    if(productoSeleccionado.tag !== 'Agotado') {
                      agregarAlCarrito(productoSeleccionado);
                      setProductoSeleccionado(null);
                    }
                  }}
                >
                  {productoSeleccionado.tag === 'Agotado' 
                    ? (idioma === 'es' ? 'Producto Agotado' : 'Sold Out') 
                    : (idioma === 'es' ? '🛒 Añadir al Carrito' : '🛒 Add to Cart')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 👇 PANEL LATERAL: EL CARRITO DE COMPRAS 👇 */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          
          <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[110] transform transition-transform duration-300 flex flex-col border-l border-zinc-200">
            
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <h2 className="font-black text-xl italic uppercase tracking-tighter">
                {idioma === 'es' ? 'Tu Arsenal' : 'Your Arsenal'} ({carrito.reduce((acc, item) => acc + item.cantidad, 0)})
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 flex items-center justify-center bg-zinc-200 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {carrito.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500">
                  <span className="text-4xl mb-4">🛒</span>
                  <p>{idioma === 'es' ? 'Tu carrito de combate está vacío.' : 'Your combat cart is empty.'}</p>
                </div>
              ) : (
                carrito.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center border-b border-zinc-50 pb-4">
                    <div className="w-16 h-16 bg-zinc-100 rounded-md p-1 shrink-0 flex items-center justify-center">
                      <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{item.marca}</p>
                      <h4 className="font-bold text-xs line-clamp-1">{item.nombre}</h4>
                      <p className="text-red-600 font-extrabold text-sm">${item.precio.toLocaleString('es-MX')} MXN</p>
                      <p className="text-[10px] text-zinc-500 mt-1">{idioma === 'es' ? 'Cantidad:' : 'Quantity:'} {item.cantidad}</p>
                    </div>
                    <button onClick={() => eliminarDelCarrito(item.id)} className="text-xs text-zinc-400 hover:text-red-600 underline">
                      {idioma === 'es' ? 'Quitar' : 'Remove'}
                    </button>
                  </div>
                ))
              )}
            </div>

            {carrito.length > 0 && (
              <div className="p-6 bg-zinc-50 border-t border-zinc-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold uppercase text-zinc-500">
                    {idioma === 'es' ? 'Subtotal Estimado' : 'Estimated Subtotal'}
                  </span>
                  <span className="text-2xl font-black text-red-600">${calcularTotal().toLocaleString('es-MX')} MXN</span>
                </div>
                
                {/* BOTÓN WHATSAPP */}
                <button 
                  onClick={enviarPedidoWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-colors shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                >
                  <span className="text-xl">💬</span> {idioma === 'es' ? 'Procesar en WhatsApp' : 'Process on WhatsApp'}
                </button>
                <p className="text-[10px] text-center text-zinc-500 mt-4 px-4 leading-relaxed">
                  {idioma === 'es' 
                    ? 'Al continuar, nuestro bot gestionará tu pago (efectivo o tarjeta) y envío de forma segura en WhatsApp.'
                    : 'By continuing, our bot will manage your payment (cash or card) and shipping securely on WhatsApp.'}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ESTILOS GLOBALES PARA ANIMACIONES */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  )
}