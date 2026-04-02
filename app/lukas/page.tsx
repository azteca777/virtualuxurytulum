'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// === BASE DE DATOS DE PRODUCTOS (El Catálogo de 16 Items) ===
// 💡 NOTA: Cámbiale el 'nombre' y la 'marca' cuando veas tus fotos reales.
const CATALOGO_LUKAS = [
  { id: 1, marca: 'Marca 1', nombre: 'Suplemento Pro - Vainilla', precio: '1,320.00', imagen: '/lukas/su3.jpeg', tag: 'Más Vendido' },
  { id: 2, marca: 'Marca 2', nombre: 'Pre-Entreno Explosivo', precio: '890.00', imagen: '/lukas/su6.jpeg' },
  { id: 3, marca: 'Marca 3', nombre: 'Creatina Monohidratada', precio: '450.00', imagen: '/lukas/su2.jpeg', tag: 'Oferta' },
  { id: 4, marca: 'Marca 4', nombre: 'BCAA Recovery Formula', precio: '680.00', imagen: '/lukas/su4.jpeg' },
  { id: 5, marca: 'Marca 5', nombre: 'Quemador de Grasa Termo', precio: '950.00', imagen: '/lukas/su8.jpeg' },
  { id: 6, marca: 'Marca 6', nombre: 'Proteína Isolatada - Fresa', precio: '1,650.00', imagen: '/lukas/su11.jpeg' },
  { id: 7, marca: 'Marca 7', nombre: 'Multivitamínico Deportivo', precio: '399.00', imagen: '/lukas/su13.jpeg', tag: 'Nuevo' },
  { id: 8, marca: 'Marca 8', nombre: 'Ganador de Masa MassTech', precio: '1,100.00', imagen: '/lukas/su15.jpeg' },
  { id: 9, marca: 'Marca 9', nombre: 'Pre-Entreno Sin Cafeína', precio: '750.00', imagen: '/lukas/su17.jpeg' },
  { id: 10, marca: 'Marca 10', nombre: 'Aminoácidos Esenciales (EAA)', precio: '550.00', imagen: '/lukas/su18.jpeg', tag: 'Agotado' },
  { id: 11, marca: 'Marca 11', nombre: 'Omega 3 Fish Oil Premium', precio: '290.00', imagen: '/lukas/su19.jpeg' },
  { id: 12, marca: 'Marca 12', nombre: 'Shaker Oficial Lukas', precio: '150.00', imagen: '/lukas/su20.jpeg' },
  // 👇 Repetimos 4 para completar la cuadrícula de 16 👇
  { id: 13, marca: 'Marca 13', nombre: 'Glutamina en Polvo 500g', precio: '420.00', imagen: '/lukas/su21.jpeg' },
  { id: 14, marca: 'Marca 14', nombre: 'Óxido Nítrico Extremo', precio: '820.00', imagen: '/lukas/su25.jpeg', tag: 'Oferta' },
  { id: 15, marca: 'Marca 15', nombre: 'Snack Proteico Choco', precio: '60.00', imagen: '/lukas/su27.jpeg' },
  { id: 16, marca: 'Marca 16', nombre: 'Cinturón de Levantamiento', precio: '990.00', imagen: '/lukas/su28.jpeg' },
];

// === COMPONENTE BOTÓN ===
const Button = ({ children, variant = 'primary', className = '' }: { children: React.ReactNode, variant?: 'primary' | 'secondary' | 'danger', className?: string }) => {
  const baseClass = "px-6 py-3 text-xs md:text-sm font-extrabold uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl";
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-zinc-200 text-black hover:bg-white hover:text-black border border-zinc-300",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };
  return <button className={`${baseClass} ${variants[variant]} ${className}`}>{children}</button>;
};

// === COMPONENTE TARJETA DE PRODUCTO ===
const ProductCard = ({ producto }: { producto: any }) => (
  <div className="border border-zinc-100 bg-white p-4 group hover:shadow-2xl hover:border-red-600 transition-all duration-500 flex flex-col">
    <div className="aspect-square w-full relative mb-4 overflow-hidden bg-zinc-50 flex items-center justify-center p-4">
      {/* Etiqueta */}
      {producto.tag && (
        <span className={`absolute top-2 right-2 text-[10px] font-bold px-3 py-1 uppercase z-10 tracking-wider ${producto.tag === 'Agotado' ? 'bg-zinc-300 text-zinc-600' : 'bg-red-600 text-white'}`}>
          {producto.tag}
        </span>
      )}
      {/* Imagen del Producto */}
      <img 
        src={producto.imagen} 
        alt={producto.nombre} 
        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out" 
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/f4f4f5/a1a1aa?text=FOTO+SUPLEMENTO' }} 
      />
    </div>
    <div className="flex-grow flex flex-col justify-between">
      <div>
        <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1 font-bold">{producto.marca}</p>
        <h3 className="font-bold text-sm mb-2 h-10 line-clamp-2 text-zinc-800 group-hover:text-black transition-colors">{producto.nombre}</h3>
      </div>
      <div>
        <p className="font-extrabold text-lg text-red-600 mb-4">${producto.precio} <span className="text-xs text-zinc-400">MXN</span></p>
        <div className="grid grid-cols-1 gap-2">
          <Button variant="primary" className="w-full text-[10px]">Añadir al Carrito</Button>
        </div>
      </div>
    </div>
  </div>
);

export default function LukasStore() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white relative">
      
      {/* 👇 NAVEGACIÓN Y AVISO FIJOS HASTA ARRIBA (z-50) 👇 */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest text-center py-2.5 overflow-hidden relative shadow-md">
          <div className="animate-marquee whitespace-nowrap">
            ⚡ ENVÍO GRATIS EN PEDIDOS MAYORES A $2,499 MXN ⚡ | 🎁 REGALO EN COMPRAS DE PROTEÍNA WHEY 🎁 | ⚡ ENVÍO GRATIS EN PEDIDOS MAYORES A $2,499 MXN ⚡
          </div>
        </div>

        {/* Fondo 100% negro y opaco para que al hacer scroll no se transparente */}
        <header className="bg-black text-white border-b border-zinc-800 shadow-xl">
          <nav className="max-w-[1400px] mx-auto p-4 flex items-center justify-between">
            <Link href="/" className="text-zinc-400 hover:text-white text-[10px] tracking-[0.2em] uppercase font-bold transition-colors">
              ← Volver
            </Link>

            <div className="w-40 flex justify-center">
               <img src="/logo_lukas2.png" alt="Lukas Supplements" className="h-12 md:h-16 object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>

            <div className="flex items-center gap-6 text-xl">
              <button className="hover:text-red-500 transition-colors">🔍</button>
              <button className="hover:text-red-500 transition-colors">👤</button>
              <button className="hover:text-red-500 transition-colors">🛒</button>
            </div>
          </nav>
        </header>
      </div>

      {/* 👇 3. HERO DE VIDEOS FIJO EN EL FONDO (z-0) 👇 */}
      <section className="fixed top-[110px] left-0 h-[calc(100vh-110px)] w-full bg-black flex items-center justify-center z-0">
        
        <div className="absolute inset-0 flex w-full h-full">
          <video autoPlay loop muted playsInline className="w-1/2 h-full object-cover opacity-50 mix-blend-luminosity">
            <source src="/lukas/video1_lukas.mp4" type="video/mp4" />
          </video>
          <video autoPlay loop muted playsInline className="w-1/2 h-full object-cover opacity-50 mix-blend-luminosity border-l border-zinc-900">
            <source src="/lukas/video3_lukas.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 text-white max-w-4xl pointer-events-none mb-20">
          <span className="text-red-600 font-bold tracking-[0.3em] uppercase mb-8 text-sm md:text-base border-b-2 border-red-600 pb-1">
            Domina tu entrenamiento
          </span>
          
          <img 
            src="/logo_lukas2.png" 
            alt="Lukas Supplements" 
            className="w-64 md:w-96 lg:w-[24rem] object-contain mb-8 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-auto" 
            onError={(e) => { e.currentTarget.style.display = 'none' }} 
          />

          <p className="text-lg md:text-2xl mb-10 text-zinc-300 font-light">
            Suplementación de grado élite para atletas que no conocen límites.
          </p>
        </div>
      </section>

      {/* 👇 EL CONTENIDO QUE SUBE Y TAPA A LOS VIDEOS 👇 */}
      <main className="relative z-10 bg-white mt-[100vh] pt-20 pb-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">

        {/* 4. Sección de Objetivos */}
        <section className="max-w-[1400px] mx-auto px-6 mb-20">
          <h2 className="text-center text-xl md:text-2xl font-black uppercase tracking-widest mb-10">
            Comprar por objetivos
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { titulo: 'Ponerme mamad@', img: '/lukas/imagen1_lukas.jpeg' },
              { titulo: 'Mejorar mi salud', img: '/lukas/imagen2_lukas.jpeg' },
              { titulo: 'Mejorar mi rendimiento', img: '/lukas/imagen3_lukas.jpeg' },
              { titulo: 'Quemar grasa', img: '/lukas/imagen4_lukas.jpeg' },
            ].map((item, i) => (
              <Link href="#" key={i} className="group flex flex-col items-center">
                <div className="relative w-full aspect-square bg-zinc-900 overflow-hidden mb-4">
                  <img 
                    src={item.img} 
                    alt={item.titulo} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x600/18181b/3f3f46?text=FOTO+AQUI' }} 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-black text-4xl md:text-5xl uppercase tracking-wider drop-shadow-lg flex items-center">
                      SÍ PUEDES
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-0 w-full flex justify-center">
                     <span className="text-white font-black italic tracking-tighter text-lg drop-shadow-md">HAZLO</span>
                  </div>
                </div>
                <h3 className="font-bold text-sm md:text-base text-zinc-900 group-hover:text-red-600 transition-colors">
                  {item.titulo}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Grid de Productos (Lo más vendido) */}
        <section className="max-w-[1400px] mx-auto px-6 mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Arsenal Destacado</h2>
              <p className="text-sm text-zinc-500 mt-2">Los suplementos más elegidos por nuestros atletas.</p>
            </div>
            <Link href="#" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-red-600 hover:border-red-600 transition-colors">
              Ver todo el arsenal →
            </Link>
          </div>
          
          {/* 👇 AQUÍ ESTÁ LA CUADRÍCULA DE 4 COLUMNAS QUE SE LLENARÁ CON LOS 16 PRODUCTOS 👇 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {CATALOGO_LUKAS.map((prod) => (
              <ProductCard key={prod.id} producto={prod} />
            ))}
          </div>
        </section>

        {/* 6. Banner Intermedio de Ropa / Accesorios */}
        <section className="max-w-[1400px] mx-auto px-6 mb-20">
          <div className="bg-zinc-950 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center shadow-2xl">
            <div className="p-12 md:p-20 flex-1 text-white">
              <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Lukas Apparel</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Vístete para<br/>la Guerra</h2>
              <p className="text-zinc-400 mb-8 max-w-md">Nuestra nueva línea de ropa compresiva y accesorios diseñados para soportar los entrenamientos más brutales.</p>
              <Button variant="danger">Equípate Ahora</Button>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-full min-h-[400px] bg-zinc-800 relative group overflow-hidden">
               <img src="/lukas/apparel.jpg" alt="Ropa Lukas" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop' }}/>
            </div>
          </div>
        </section>

       {/* 7. Sección de Videos (Guías) */}
        <section className="bg-zinc-100 py-20 border-y border-zinc-200">
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6">¿No sabes por dónde empezar?</h2>
              <p className="text-zinc-600 mb-8 text-lg">Lukas te explica exactamente qué tomar, cuándo tomarlo y cómo maximizar tus resultados con las combinaciones correctas. Sin filtros, pura ciencia.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 bg-white p-4 shadow-sm border border-zinc-200 cursor-pointer hover:border-red-500 transition-colors">
                  <div className="w-12 h-12 bg-red-100 text-red-600 flex items-center justify-center rounded-full font-black">▶</div>
                  <div>
                    <h4 className="font-bold uppercase text-sm">Guía de Proteínas</h4>
                    <p className="text-xs text-zinc-500">Whey vs Isolate vs Caseína</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 shadow-sm border border-zinc-200 cursor-pointer hover:border-red-500 transition-colors">
                  <div className="w-12 h-12 bg-zinc-100 text-zinc-600 flex items-center justify-center rounded-full font-black">▶</div>
                  <div>
                    <h4 className="font-bold uppercase text-sm">El Poder de la Creatina</h4>
                    <p className="text-xs text-zinc-500">Mitos y verdades</p>
                  </div>
                </div>
              </div>

              <Button>Ver Academia Lukas</Button>
            </div>
            
            {/* 👇 Reproductor de Video Principal (Funcional) 👇 */}
            <div className="aspect-[9/16] md:aspect-[3/4] max-h-[600px] mx-auto w-full max-w-sm bg-black rounded-2xl shadow-2xl overflow-hidden relative group border-4 border-zinc-800 hover:border-red-600 transition-colors duration-500">
               <video 
                 controls 
                 playsInline 
                 poster="/logo_lukas2.png" // Puedes cambiar el póster si tienes una imagen mejor
                 className="absolute inset-0 w-full h-full object-cover"
               >
                 <source src="/lukas/video2_lukas.mp4" type="video/mp4" />
                 Tu navegador no soporta la reproducción de videos.
               </video>
            </div>
          </div>
        </section>

        {/* 8. Footer */}
        <footer className="bg-black text-zinc-400 py-16 px-6">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
               <div className="mb-6">
                 <span className="font-black tracking-tighter text-3xl italic text-white">LUKAS</span>
               </div>
               <p className="text-xs mb-6 max-w-xs">Elevando el estándar de la suplementación en México. Entrena duro, recupérate mejor.</p>
               <div className="flex gap-4 text-xl">
                  <span className="hover:text-white cursor-pointer transition-colors">📱</span> 
                  <span className="hover:text-white cursor-pointer transition-colors">📸</span> 
                  <span className="hover:text-white cursor-pointer transition-colors">▶️</span>
               </div>
            </div>
            
            {[
              { titulo: 'Explorar', links: ['Proteínas', 'Creatinas', 'Pre-Entrenos', 'Accesorios', 'Ofertas'] },
              { titulo: 'Ayuda', links: ['Envíos y Entregas', 'Devoluciones', 'Preguntas Frecuentes', 'Contacto'] },
            ].map((col, i) => (
              <div key={i}>
                <h5 className="font-bold text-white uppercase tracking-widest text-sm mb-6">{col.titulo}</h5>
                <ul className="space-y-3 text-xs">
                  {col.links.map(link => <li key={link}><Link href="#" className="hover:text-red-500 transition-colors">{link}</Link></li>)}
                </ul>
              </div>
            ))}

            <div className="md:col-span-1">
              <h5 className="font-bold text-white uppercase tracking-widest text-sm mb-6">Únete al Batallón</h5>
              <p className="text-xs mb-4">10% de descuento en tu primera compra al suscribirte.</p>
              <div className="flex flex-col gap-2">
                <input type="email" placeholder="TU CORREO" className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs text-white uppercase focus:outline-none focus:border-red-600 transition-colors" />
                <Button variant="danger" className="w-full">Suscribirme</Button>
              </div>
            </div>
          </div>
          <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-zinc-800 text-center text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Lukas Supplements. Todos los derechos reservados. Desarrollado por ViOs Code.
          </div>
        </footer>

      </main>

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