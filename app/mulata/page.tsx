'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import NextLink from 'next/link'; 

// === COMPONENTE DE ANIMACIÓN AL HACER SCROLL ===
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { threshold: 0.15 });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// === EL CATÁLOGO DE MULATA PARA EL TRY-ON ===
// 🔥 CATÁLOGO ACTUALIZADO CON TUS IMÁGENES 🔥
const CATALOGO = [
  { id: 1, nombreEs: 'Mulata Clásico - Miel', nombreEn: 'Mulata Classic - Honey', url: '/im7.jpeg' },
  { id: 2, nombreEs: 'Mulata Clásico - Oliva', nombreEn: 'Mulata Classic - Olive', url: '/im8.jpeg' },
  { id: 3, nombreEs: 'Mulata Riviera - Negro', nombreEn: 'Mulata Riviera - Black', url: '/im9.jpeg' },
  { id: 4, nombreEs: 'Mulata Riviera - Arena', nombreEn: 'Mulata Riviera - Sand', url: '/im14.jpeg' },
  { id: 5, nombreEs: 'Edición Especial - Paja', nombreEn: 'Special Edition - Straw', url: '/im15.jpeg' },
  { id: 6, nombreEs: 'Edición Especial - Carbón', nombreEn: 'Special Edition - Charcoal', url: '/im16.jpeg' },
  { id: 7, nombreEs: 'Mulata Premium - Tabaco', nombreEn: 'Mulata Premium - Tobacco', url: '/im17.jpeg' },
  { id: 8, nombreEs: 'Mulata Premium - Piedra', nombreEn: 'Mulata Premium - Stone', url: '/im18.jpeg' },
];

export default function MulataBoutique() {
  const [idioma, setIdioma] = useState<'es' | 'en'>('es');
  
  // Estados Try-On
  const [fotoUsuarioUrl, setFotoUsuarioUrl] = useState<string | null>(null); 
  const [prendaSeleccionada, setPrendaSeleccionada] = useState<any | null>(null);
  const [estaProcesando, setEstaProcesando] = useState(false);
  const [estaSubiendoFoto, setEstaSubiendoFoto] = useState(false); 
  const [resultadoTryOnUrl, setResultadoTryOnUrl] = useState<string | null>(null);
  const [errorTryOn, setErrorTryOn] = useState<string | null>(null);

  const ejecutarPruebaVirtual = async () => {
    if (!fotoUsuarioUrl || !prendaSeleccionada) {
      setErrorTryOn('Falta tu foto o la prenda.'); return;
    }
    setEstaProcesando(true); setErrorTryOn(null); setResultadoTryOnUrl(null);
    try {
      const URL_API_VIOS_CODE = 'https://vios-code.vercel.app/api/youcam-tryon'; 
      const response = await fetch(URL_API_VIOS_CODE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src_file_url: fotoUsuarioUrl, ref_file_url: prendaSeleccionada.url, tipoPrenda: 'cloth' }), // Mantengo 'cloth' según instrucciones previas
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error.');
      const taskId = data.data?.task_id;
      if (!taskId) throw new Error('Error.');

      let terminado = false; let intentos = 0;
      while (!terminado && intentos < 20) { 
        await new Promise(res => setTimeout(res, 2000)); 
        const pollRes = await fetch(`${URL_API_VIOS_CODE}?taskId=${taskId}`);
        const pollData = await pollRes.json();
        if (pollData.data?.task_status === 'done' || pollData.data?.task_status === 'success') {
          terminado = true; setResultadoTryOnUrl(pollData.data?.results?.url); break;
        } else if (pollData.data?.task_status === 'failed') {
          throw new Error('La IA no pudo procesar esta foto.');
        }
        intentos++;
      }
      if (!terminado) throw new Error('Tiempo de espera agotado.');
    } catch (err: any) { setErrorTryOn(err.message); } finally { setEstaProcesando(false); }
  };

  const manejarSubidaFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setErrorTryOn(null); setEstaSubiendoFoto(true); setFotoUsuarioUrl(null); 
      try {
        const response = await fetch(`/api/upload?filename=${file.name}`, { method: 'POST', body: file });
        const blob = await response.json();
        if (!response.ok) throw new Error('Error Blob');
        setFotoUsuarioUrl(blob.url); 
      } catch (err: any) { setErrorTryOn('Error al subir foto.'); } finally { setEstaSubiendoFoto(false); }
    }
  };

  const generarLinkWhatsApp = () => {
    if (!prendaSeleccionada || !resultadoTryOnUrl) return "#";
    const urlFoto = encodeURIComponent(resultadoTryOnUrl);
    return `https://wa.me/5219842537197?text=¡Hola! Me probé el sombrero ${prendaSeleccionada.nombreEs} en su boutique virtual. Mira cómo me queda: ${urlFoto} ¡Quiero más información!`;
  };

  return (
    // PALETA TERRÁNEA: Fondos blancos cálidos, texto verde oliva oscuro
    <main className="min-h-screen bg-[#FDFBF7] text-[#2C4132] font-serif selection:bg-[#2C4132] selection:text-white">
      
      {/* NAVEGACIÓN */}
      <nav className="absolute top-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
        <NextLink href="/luxury/tulum" className="text-sm tracking-widest font-sans font-semibold uppercase hover:opacity-70 transition-opacity text-[#2C4132]">
          ← Volver
        </NextLink>
        <button onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')} className="text-xs font-sans border border-[#2C4132] text-[#2C4132] px-4 py-2 rounded-full tracking-widest hover:bg-[#2C4132] hover:text-white transition-all">
          {idioma === 'es' ? 'EN' : 'ES'}
        </button>
      </nav>

      {/* SECCIÓN 1: HÉROE PRINCIPAL */}
      <section className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 pt-32">
          <FadeIn>
            <p className="text-lg md:text-2xl font-serif tracking-widest mb-6">MULATA</p>
            <h1 className="text-5xl md:text-7xl font-serif text-[#2C4132] leading-[1.1] mb-8">
              UNA MEZCLA DE<br/>CULTURAS
            </h1>
            <p className="text-lg font-serif text-[#4A5D4E]">
              Sombreros de diseño hechos a mano — donde cada cultura deja su huella.
            </p>
          </FadeIn>
        </div>
        <div className="w-full md:w-1/2 min-h-[50vh] relative">
          <Image src="/imagen1.jpeg" alt="Sombrero Mulata" fill className="object-cover" />
        </div>
      </section>

      {/* SECCIÓN 2: LA ESTÉTICA */}
      <section className="flex flex-col-reverse md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 flex flex-col min-h-[60vh] md:min-h-screen">
          <FadeIn className="relative w-full flex-1 min-h-[30vh]" delay={0}>
            <Image src="/imagen11.jpeg" alt="Estética Mulata 1" fill className="object-cover" />
          </FadeIn>
          <FadeIn className="relative w-full flex-1 min-h-[30vh]" delay={200}>
            <Image src="/imagen10.jpeg" alt="Estética Mulata 2" fill className="object-cover" />
          </FadeIn>
          <FadeIn className="relative w-full flex-1 min-h-[30vh]" delay={400}>
            <Image src="/imagen9.jpeg" alt="Estética Mulata 3" fill className="object-cover" />
          </FadeIn>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 bg-[#FDFBF7]">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#2C4132]">La Estética de Mulata</h2>
            <p className="text-lg mb-10 text-[#4A5D4E] leading-relaxed">
              El diseño visual de la página tiene una estética estrictamente <strong>TERRÁNEA</strong> (earthy/mediterráneo), sofisticada y natural. Esto significa una paleta de colores de <span className="font-bold text-[#2C4132]">blancos cálidos, arena, terracota, verdes oliva claros</span> y texturas rústicas y limpias (como el lino o la piedra). El ambiente debe ser soleado, relajado y de lujo sostenible.
            </p>
            
            <div className="flex flex-col gap-4">
              {[
                { t: "Blancos Cálidos & Arena", d: "Fondos limpios y luminosos que evocan playas y paredes encaladas mediterráneas." },
                { t: "Terracota & Tierra", d: "Acentos cálidos que conectan con la artesanía, la cerámica y la tradición cultural." },
                { t: "Verdes Oliva Claros", d: "Toques naturales que refuerzan el lujo sostenible y la conexión con la tierra." },
                { t: "Texturas Rústicas & Limpias", d: "Lino, piedra y materiales naturales que dan carácter y autenticidad a cada pieza." }
              ].map((item, i) => (
                <div key={i} className="bg-[#F4EFE6] p-6 rounded-sm">
                  <h3 className="text-xl font-serif font-semibold mb-2">{item.t}</h3>
                  <p className="text-[#4A5D4E] text-base">{item.d}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECCIÓN 3: ENCABEZADO PRINCIPAL */}
      <section className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24">
          <FadeIn>
            <p className="text-sm font-sans tracking-widest text-[#2C4132] mb-6">Encabezado Principal</p>
            <h2 className="text-6xl md:text-8xl font-serif text-[#2C4132] mb-6">MULATA</h2>
            <p className="text-2xl md:text-4xl font-serif text-[#2C4132] leading-tight mb-8">
              Un diseño visual fuerte centrado en la marca Mulata, usando texturas rústicas.
            </p>
            <p className="text-[#4A5D4E] text-lg leading-relaxed">
              Este es el primer impacto visual de la marca: una presencia poderosa, serena y culturalmente rica. Elegante sobre texturas rústicas comunica desde el primer instante que <strong>Mulata</strong> no es solo un sombrero — es una declaración de identidad.
            </p>
          </FadeIn>
        </div>
        <div className="w-full md:w-1/2 flex min-h-[50vh] md:min-h-screen">
          <div className="w-1/3 relative">
            <Image src="/imagen2.jpeg" alt="Sombrero Mulata 1" fill className="object-cover" />
          </div>
          <div className="w-1/3 relative">
            <Image src="/imagen3.jpeg" alt="Sombrero Mulata 2" fill className="object-cover" />
          </div>
          <div className="w-1/3 relative">
            <Image src="/imagen4.jpeg" alt="Sombrero Mulata 3" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: NUESTRA FILOSOFÍA */}
      <section className="flex flex-col md:flex-row min-h-[80vh]">
        <div className="w-full md:w-1/2 relative min-h-[60vh] md:min-h-full overflow-hidden border-r border-[#E3DCC8] bg-white flex items-center justify-center">
             <Image 
               src="/imagen12.jpeg" 
               alt="Fondo Filosofía" 
               width={700}  
               height={400} 
               className="z-0 object-cover opacity-90" 
             />
             <FadeIn className="absolute top-12 left-8 md:left-12 w-48 h-48 md:w-64 md:h-64 shadow-2xl rounded-sm overflow-hidden z-10 border-4 border-white" delay={200}>
                 <Image src="/imagen6.jpeg" alt="Detalle Artesanal 1" fill className="object-cover" />
             </FadeIn>
             <FadeIn className="absolute bottom-12 right-8 md:right-12 w-48 h-48 md:w-64 md:h-64 shadow-2xl rounded-sm overflow-hidden z-10 border-4 border-white" delay={400}>
                 <Image src="/imagen7.jpeg" alt="Detalle Artesanal 2" fill className="object-cover" />
             </FadeIn>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 bg-[#FDFBF7] text-[#2C4132]">
          <FadeIn delay={600} className="relative z-20">
            <p className="text-xl md:text-2xl font-serif mb-4">Nuestra Filosofía</p>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight mb-12 text-[#2C4132]">
              Mezcla de<br/>Culturas
            </h2>

            <p className="text-[#4A5D4E] text-lg leading-relaxed mb-6">
              Mulata nace de la convicción de que la belleza más auténtica surge cuando las culturas se encuentran, se mezclan y se transforman. Cada sombrero es el resultado de ese diálogo: técnicas artesanales heredadas de distintas tradiciones, materiales seleccionados con respeto por su origen, y un diseño que no pertenece a un solo lugar, sino a todos a la vez.
            </p>
            <p className="text-[#4A5D4E] text-lg leading-relaxed mb-10">
              Explicar el concepto de <strong>'Mezcla de Culturas'</strong> detrás de los sombreros hechos a mano es explicar la esencia misma de Mulata: una marca que celebra la diversidad como fuente de creatividad, y la artesanía como lenguaje universal.
            </p>
            
            <div className="bg-[#D3E4D6] p-8 flex items-start gap-4 rounded-sm shadow-inner">
              <span className="text-2xl">🌍</span>
              <p className="text-[#2C4132] text-xl font-serif italic">
                Cada pieza Mulata lleva consigo la historia de las manos que la crearon y las culturas que la inspiraron.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECCIÓN 5: COLECCIONES DESTACADAS */}
      <section className="py-24 px-12 md:px-24 bg-[#FDFBF7]">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-serif text-[#2C4132] mb-6">Colecciones Destacadas</h2>
          <p className="text-xl text-[#4A5D4E] mb-16">Tres universos distintos, una sola filosofía: la excelencia artesanal al servicio del estilo.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { img: "/imagen5.jpeg", t: "A. Fedoras & Sombreros de Diseño", d: "Resaltando la calidad artesanal, formas clásicas fedora con detalles únicos (cadenas, grabados), y texturas de fieltro de alta calidad. Cada pieza es una obra de arte portátil." },
              { img: "/imagen18.jpeg", t: "B. Estilo de Playa y Verano", d: "Enfocado en sombreros de paja y materiales ligeros, ideales para el sol, el mar y destinos tropicales. Ligereza, frescura y elegancia bajo el cielo abierto." },
              { img: "/imagen17.jpeg", t: "C. Galería de Estilo de Vida", d: "Mostrando cómo los sombreros se integran en looks de moda (femeninos y masculinos), en entornos rústicos y lujosos. El sombrero como pieza central de una vida bien vivida." }
            ].map((col, i) => (
              <div key={i} className="flex flex-col">
                <div className="w-full aspect-[3/4] relative mb-6">
                  <Image src={col.img} alt={col.t} fill className="object-cover rounded-sm" />
                </div>
                <h3 className="text-2xl font-serif text-[#2C4132] mb-4 leading-tight">{col.t}</h3>
                <p className="text-[#4A5D4E] text-lg leading-relaxed">{col.d}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* SECCIÓN 6: PROCESO ARTESANAL */}
      <section className="flex flex-col md:flex-row bg-[#FDFBF7]">
        <div className="w-full md:w-1/2 p-12 md:p-24 md:sticky md:top-0 h-auto md:h-screen overflow-y-auto hidden-scrollbar">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2C4132] mb-6">Proceso Artesanal</h2>
            <p className="text-lg text-[#4A5D4E] mb-12">
              Una sección breve que muestre que los sombreros son <strong>hechos a mano</strong>, con atención al detalle y acabados únicos.
            </p>

            <div className="flex flex-col gap-8">
              {[
                { icon: "🌿", t: "Selección de Materiales", d: "Cada fibra, cada hilo, cada material es elegido con criterio y respeto por su origen natural y cultural." },
                { icon: "👐", t: "Hecho a Mano", d: "Manos expertas dan forma a cada sombrero con técnicas artesanales transmitidas a través de generaciones." },
                { icon: "✨", t: "Atención al Detalle", d: "Cada acabado, cada detalle — cadenas, grabados, costuras — es revisado con minuciosidad antes de salir al mundo." },
                { icon: "⭐", t: "Acabados Únicos", d: "El resultado es una pieza irrepetible: un sombrero que lleva la huella de quien lo creó y la historia de las culturas que lo inspiraron." }
              ].map((step, i) => (
                <div key={i} className="border-b border-[#2C4132]/20 pb-6">
                  <span className="text-2xl block mb-4 opacity-70">{step.icon}</span>
                  <h3 className="text-2xl font-serif text-[#2C4132] mb-2">{step.t}</h3>
                  <p className="text-[#4A5D4E] text-lg leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="w-full md:w-1/2 flex flex-col bg-black">
          {[
            "/imagen24.jpeg",
            "/imagen21.jpeg",
            "/imagen22.jpeg",
            "/imagen20.jpeg",
            "/imagen23.jpeg"
          ].map((imgSrc, idx) => (
            <FadeIn key={idx} className="relative w-full h-[60vh] md:h-screen">
              <Image 
                src={imgSrc} 
                alt={`Proceso Artesanal ${idx + 1}`} 
                fill 
                className="object-cover" 
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SECCIÓN 7: EXPLORAR LA COLECCIÓN */}
      <section className="flex flex-col md:flex-row min-h-[80vh]">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 bg-[#FDFBF7]">
          <FadeIn>
            <h2 className="text-5xl md:text-6xl font-serif text-[#2C4132] mb-8">Explorar la Colección</h2>
            <p className="text-[#4A5D4E] text-lg mb-8">
              Un botón claro para <strong>'Explorar la Colección'</strong> o <strong>'Ver Catálogo'</strong>. El tono de voz es <span className="font-bold text-[#3B6E4A]">aspiracional, sofisticado, cálido y culturalmente rico.</span>
            </p>
            
            <div className="border-l-2 border-[#2C4132] pl-6 mb-8 py-2">
              <p className="text-[#2C4132] text-xl font-serif">
                Los marcadores de posición de las imágenes están claramente definidos para que puedas subir tus propias fotos del producto.
              </p>
            </div>

            <p className="text-[#4A5D4E] text-lg mb-12">
              Mulata te invita a descubrir una colección donde cada sombrero cuenta una historia — la tuya, la nuestra, la de todas las culturas que nos hacen quienes somos.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#2C4132] text-white px-8 py-4 font-serif text-lg hover:bg-[#1e2d23] transition-colors">
                Explorar la Colección
              </button>
            </div>
          </FadeIn>
        </div>
        
        <div className="w-full md:w-1/2 grid grid-cols-4 grid-rows-4 min-h-[50vh] md:min-h-[80vh] bg-white">
          {[
            "/im20.jpeg", "/im2.jpeg", "/im3.jpeg", "/im5.jpeg", 
            "/im6.jpeg", "/im7.jpeg", "/im8.jpeg", "/im9.jpeg", 
            "/im10.jpeg", "/im11.jpeg", "/im13.jpeg", "/im14.jpeg", 
            "/im15.jpeg", "/im16.jpeg", "/im17.jpeg", "/im18.jpeg"
          ].map((imgSrc, idx) => (
            <div key={idx} className="relative w-full h-full min-h-[12vh] md:min-h-[20vh] overflow-hidden group">
              <Image 
                src={imgSrc} 
                alt={`Colección Mulata ${idx + 1}`} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* --- EL CATÁLOGO INTERACTIVO (TRY-ON MATRIX) --- */}
      <section id="catalogo" className="max-w-7xl mx-auto py-32 px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#2C4132] mb-4">Catálogo Virtual</h2>
            <p className="text-[#4A5D4E] uppercase tracking-widest text-sm">Pruébate nuestra colección desde donde estés</p>
          </div>
          
          {/* 🔥 CATÁLOGO CON LAS NUEVAS IMÁGENES 🔥 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {CATALOGO.map((item) => (
              <div key={item.id} className="group cursor-pointer flex flex-col items-center" onClick={() => setPrendaSeleccionada(item)}>
                <div className="w-full aspect-[3/4] overflow-hidden bg-[#F4EFE6] rounded-sm mb-6 relative border border-transparent group-hover:border-[#2C4132] transition-colors duration-500">
                  {/* Se ajustó el object-fit para los sombreros */}
                  <Image src={item.url} alt={item.nombreEs} fill className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"/>
                  
                  <div className="absolute inset-0 bg-[#2C4132]/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-[#2C4132] text-white px-8 py-4 text-[10px] font-sans uppercase tracking-[0.2em] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      Probar Pieza ✨
                    </span>
                  </div>
                </div>
                <h3 className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[#2C4132] text-center px-4 leading-relaxed">
                  {idioma === 'es' ? item.nombreEs : item.nombreEn}
                </h3>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* --- MODAL DEL ESPEJO MÁGICO TERRÁNEO --- */}
      {prendaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C4132]/60 backdrop-blur-md p-4 animate-in fade-in duration-300 z-[100]">
          <div className="bg-[#FDFBF7] w-full max-w-sm md:max-w-md p-8 md:p-10 rounded-sm shadow-2xl relative flex flex-col items-center border border-[#E3DCC8] max-h-[90vh] overflow-y-auto hidden-scrollbar">
            
            <button onClick={() => {setPrendaSeleccionada(null); setResultadoTryOnUrl(null); setFotoUsuarioUrl(null); setErrorTryOn(null);}} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-[#F4EFE6] rounded-full text-[#2C4132] hover:text-white hover:bg-[#2C4132] transition-colors font-sans">✕</button>
            
            <h2 className="text-xl md:text-2xl uppercase tracking-[0.2em] mb-2 mt-4 font-serif text-center text-[#2C4132]">
              {idioma === 'es' ? 'Probador Virtual' : 'Virtual Fitting'}
            </h2>
            <p className="text-[9px] font-sans text-[#4A5D4E] tracking-[0.3em] uppercase mb-8 text-center">Powered by ViOs Code Matrix</p>

            {!resultadoTryOnUrl ? (
              <>
                <div className="w-40 h-40 bg-[#F4EFE6] rounded-full mb-8 shadow-inner border border-[#E3DCC8] overflow-hidden relative">
                  <Image src={prendaSeleccionada.url} alt="Sombrero" fill className="object-cover"/>
                </div>
                
                <div className="w-full mb-8 font-sans">
                  <label className="block text-[10px] text-[#4A5D4E] tracking-widest uppercase mb-3 text-center font-bold">1. Sube una foto retrato</label>
                  
                  {estaSubiendoFoto ? (
                    <div className="w-full p-4 bg-[#F4EFE6] text-[10px] uppercase tracking-widest text-[#2C4132] text-center animate-pulse border border-[#E3DCC8] rounded-sm">Conectando...</div>
                  ) : (
                    <div className="relative w-full">
                      <input type="file" accept="image/*" onChange={manejarSubidaFoto} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                      <div className={`w-full p-4 border border-dashed rounded-sm text-[10px] uppercase tracking-widest text-center transition-colors ${fotoUsuarioUrl ? 'border-[#2C4132] bg-[#2C4132]/10 text-[#2C4132]' : 'border-[#4A5D4E]/50 bg-white text-[#4A5D4E] hover:bg-[#4A5D4E]/5'}`}>
                        {fotoUsuarioUrl ? '✅ Retrato Guardado' : '📸 Seleccionar Archivo'}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full font-sans">
                  <label className="block text-[10px] text-[#4A5D4E] tracking-widest uppercase mb-3 text-center font-bold">2. Ver la Mezcla de Culturas</label>
                  <button onClick={ejecutarPruebaVirtual} disabled={estaProcesando || estaSubiendoFoto || !fotoUsuarioUrl} className={`w-full py-4 rounded-sm text-[10px] tracking-[0.2em] font-bold uppercase transition-all flex items-center justify-center ${estaProcesando ? 'bg-[#E3DCC8] text-[#A69F91] cursor-not-allowed' : 'bg-[#2C4132] text-white hover:bg-[#1e2d23] shadow-md hover:shadow-xl hover:-translate-y-1'}`}>
                    {estaProcesando ? 'TALLANDO DISEÑO...' : 'PROBARME ESTE SOMBRERO'}
                  </button>
                </div>
                {errorTryOn && <p className="text-red-700 text-[10px] mt-4 text-center uppercase tracking-widest font-sans">{errorTryOn}</p>}
              </>
            ) : (
              <div className="flex flex-col items-center w-full animate-in zoom-in-95 duration-500 font-sans">
                <div className="relative w-full h-64 flex justify-center bg-white rounded-sm mb-6 border border-[#E3DCC8]">
                  <img src={resultadoTryOnUrl} alt="Resultado Mulata" className="w-full h-full object-contain shadow-sm"/>
                </div>
                
                <div className="flex flex-col gap-3 w-full">
                  <a href={generarLinkWhatsApp()} target="_blank" rel="noreferrer" className="w-full py-4 bg-[#2C4132] text-white text-[10px] font-bold text-center uppercase tracking-[0.2em] rounded-sm hover:bg-[#1e2d23] transition-colors shadow-md flex items-center justify-center">
                    SOLICITAR ASESORÍA
                  </a>
                  
                  <div className="flex gap-3 w-full">
                    <button onClick={() => setResultadoTryOnUrl(null)} className="flex-1 py-3 bg-white border border-[#E3DCC8] text-[#2C4132] text-[9px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#F4EFE6] transition-colors">
                      Probar Otro
                    </button>
                    <a href={resultadoTryOnUrl} download="Mulata_TryOn.jpg" target="_blank" rel="noreferrer" className="flex-1 py-3 bg-[#4A5D4E] text-white text-[9px] font-bold text-center uppercase tracking-[0.2em] rounded-sm hover:bg-[#2C4132] transition-colors shadow-md">
                      Descargar
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