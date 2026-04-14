'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { galeriaTatuajes } from '../../portafolioData';

// Mapeo simple para traducir o formatear el slug de la URL al nombre real del estilo
const estilosMap: { [key: string]: { es: string, en: string, tagData: string } } = {
  'fusion-neo-japonesa': { es: 'Fusión Neo-Japonesa', en: 'Neo-Japanese Fusion', tagData: 'Fusión Neo-Japonesa' },
  'biomecanica': { es: 'Biomecánica', en: 'Biomechanical', tagData: 'Biomecánica' },
  'realismo-epico': { es: 'Realismo Épico', en: 'Epic Realism', tagData: 'Realismo Épico' },
  'realismo-cyberpunk': { es: 'Realismo Cyberpunk', en: 'Cyberpunk Realism', tagData: 'Realismo Cyberpunk' },
  'blackwork': { es: 'Blackwork', en: 'Blackwork', tagData: 'Blackwork' },
  'proyectos-gran-escala': { es: 'Proyectos a Gran Escala', en: 'Large Scale Projects', tagData: 'Proyectos a Gran Escala' },
};

export default function GaleriaPorEstilo() {
  const pathname = usePathname();
  const [idioma, setIdioma] = useState<'es' | 'en'>('es');
  
  // Extraemos el estilo de la URL (ej: /loyaltink/estilos/realismo-epico -> realismo-epico)
  const estiloSlug = pathname.split('/').pop() || ''; 
  const estiloActual = estilosMap[estiloSlug];

  // Filtramos la base de datos central para mostrar solo fotos que contengan este estilo
  const fotosFiltradas = estiloActual 
    ? galeriaTatuajes.filter(tatuaje => tatuaje.estilos.includes(estiloActual.tagData as any))
    : [];

  if (!estiloActual) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white flex-col gap-4">
        <h2>{idioma === 'es' ? 'Estilo no encontrado' : 'Style not found'}</h2>
        <Link href="/loyaltink" className="text-[#8B5CF6] hover:underline text-sm uppercase tracking-widest">
          {idioma === 'es' ? 'Volver al Inicio' : 'Back to Home'}
        </Link>
      </div>
    );
  }

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
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 selection:bg-[#8B5CF6] selection:text-white pb-20">
      
      {/* HEADER MINIMALISTA */}
      <nav className="w-full bg-[#0a0a0a] p-6 flex justify-between items-center border-b border-[#222] sticky top-0 z-50">
        <Link href="/loyaltink" className="text-zinc-400 hover:text-white transition-colors text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
          ← {idioma === 'es' ? 'Volver a Loyaltink' : 'Back to Loyaltink'}
        </Link>
        <BotonIdioma />
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16">
        
        {/* CABECERA DEL ESTILO */}
        <div className="text-center mb-16">
          <span className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">
            {idioma === 'es' ? 'GALERÍA DE ESTILO' : 'STYLE GALLERY'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#8B5CF6] uppercase tracking-tighter mb-6">
            {estiloActual[idioma]}
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            {idioma === 'es' 
              ? `Explora nuestras mejores piezas en la categoría de ${estiloActual.es}.` 
              : `Explore our best pieces in the ${estiloActual.en} category.`}
          </p>
        </div>

        {/* GRID DE FOTOS (MASONRY) */}
        {fotosFiltradas.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {fotosFiltradas.map((foto) => (
              <div key={foto.id} className="break-inside-avoid rounded-xl overflow-hidden group border border-[#222] hover:border-[#8B5CF6] transition-all duration-300 relative bg-zinc-900">
                <img 
                  src={foto.url} 
                  alt={`Tatuaje estilo ${estiloActual.es} por ${foto.artista}`} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* INFO DEL ARTISTA SOBRE LA FOTO */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <p className="text-white text-xs font-bold uppercase tracking-wider">
                    {foto.artista}
                  </p>
                  <p className="text-zinc-400 text-[9px] uppercase tracking-widest">
                    {idioma === 'es' ? 'Ver perfil' : 'View profile'} ➔
                  </p>
                </div>

                {/* ENLACE INVISIBLE SOBRE TODA LA TARJETA PARA IR AL PERFIL DEL ARTISTA */}
                <Link href={`/loyaltink/artista/${foto.artista.toLowerCase()}`} className="absolute inset-0 z-10">
                  <span className="sr-only">Ir al perfil de {foto.artista}</span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-[#333] rounded-2xl bg-[#111]">
             <p className="text-zinc-500 font-mono tracking-widest text-sm uppercase">
               {idioma === 'es' ? 'AÚN NO HAY FOTOS EN ESTA CATEGORÍA' : 'NO PHOTOS IN THIS CATEGORY YET'}
             </p>
          </div>
        )}

        <div className="mt-20 flex justify-center">
            <Link 
              href="/loyaltink/reserva"
              className="text-center px-10 py-4 bg-[#4f46e5] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#3730a3] transition-colors shadow-lg shadow-[#4f46e5]/20"
            >
              {idioma === 'es' ? 'AGENDA TU DISEÑO' : 'BOOK YOUR DESIGN'}
            </Link>
        </div>

      </main>
    </div>
  );
}