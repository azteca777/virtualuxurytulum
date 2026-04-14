'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { galeriaTatuajes } from '../../portafolioData'; // 👈 Se agrega la importación de la BD de fotos

// BASE DE DATOS DE ARTISTAS BILINGÜE
const artistasDB = {
  chuloski: {
    nombre: 'JOEL SKREPNIK "CHULOSKI"',
    imagen: '/loyaltink/perfil_chuloski.png',
    ig: 'https://www.instagram.com/chuloski_?igsh=MmZ4MXB0eXZzOGln',
    es: {
      titulo: 'Especialista en Blackwork y Neo-Japonés',
      tags: 'Blackwork • Neo-Japonés • Tradicional',
      bio: 'Originario de Buenos Aires, Argentina. Soy un entusiasta del alto contraste, fusionando fondos de blackwork extremo con iconografía del tatuaje neo-japonés y tradicional. Mi pasión es dar vida a deidades imponentes y máscaras Hannya en la piel, utilizando negros sólidos y profundos que hacen estallar los colores clásicos.'
    },
    en: {
      titulo: 'Blackwork and Neo-Japanese Specialist',
      tags: 'Blackwork • Neo-Japanese • Traditional',
      bio: 'Originally from Buenos Aires, Argentina. I am an enthusiast of high contrast, fusing extreme blackwork backgrounds with neo-Japanese and traditional tattoo iconography. My passion is bringing imposing deities and Hannya masks to life on the skin, using solid, deep blacks that make classic colors pop.'
    }
  },
  rafa: {
    nombre: 'RAFA MOLDESS',
    imagen: '/loyaltink/bio_rafa.jpg',
    ig: 'https://www.instagram.com/rafamoldess.tattooer?igsh=MWx5NnVoY2J3OXIyMQ==',
    es: {
      titulo: 'Artista Black & Grey y Realismo',
      tags: 'Tradicional Americano • Black & Grey • Tribal • Blackwork',
      bio: 'Originario de Córdoba, Argentina. Artista especializado en Tradicional americano, Black and grey, Tribal y Blackwork.'
    },
    en: {
      titulo: 'Black & Grey and Realism Artist',
      tags: 'American Traditional • Black & Grey • Tribal • Blackwork',
      bio: 'Originally from Córdoba, Argentina. Artist specializing in American Traditional, Black and grey, Tribal, and Blackwork.'
    }
  },
  prana: {
    nombre: 'LAUTARO BORDESSE "PRANA"',
    imagen: '/loyaltink/bio_prana.jpg',
    ig: 'https://www.instagram.com/pranatattoo_?igsh=MThrMmdram02ZHkwNA==',
    es: {
      titulo: 'Creador de Realismo Épico',
      tags: 'Realismo Épico • Estatuaria • Mitología',
      bio: 'Originario de Córdoba, Argentina. Mi objetivo es elevar el realismo Black & Grey a una escala monumental. Me especializo en composiciones épicas inspiradas en la mitología nórdica y grecorromana. Si buscas un tatuaje que parezca esculpido en piedra antigua, estás en el lugar correcto.'
    },
    en: {
      titulo: 'Creator of Epic Realism',
      tags: 'Epic Realism • Statuary • Mythology',
      bio: 'Originally from Córdoba, Argentina. My goal is to elevate Black & Grey realism to a monumental scale. I specialize in epic compositions inspired by Nordic and Greco-Roman mythology. If you are looking for a tattoo that looks carved in ancient stone, you are in the right place.'
    }
  },
  nai: {
    nombre: 'NAIARA "NAI"',
    imagen: '/loyaltink/bio_nai.jpg',
    ig: 'https://www.instagram.com/tattoonaink?igsh=ODV3ZTFxM2F0eDdx',
    es: {
      titulo: 'Artista Fine Line y Botánico',
      tags: 'Fine Line • Botánico • Red Ink',
      bio: 'Originaria de Tierra del Fuego, Argentina. Mi trabajo se define por la extrema delicadeza y precisión. Me enfoco en el Fine Line, creando composiciones florales, piezas ilustrativas con sombras suaves y dominando la tendencia del Red Ink para diseños minimalistas y elegantes.'
    },
    en: {
      titulo: 'Fine Line and Botanical Artist',
      tags: 'Fine Line • Botanical • Red Ink',
      bio: 'Originally from Tierra del Fuego, Argentina. My work is defined by extreme delicacy and precision. I focus on Fine Line, creating floral compositions, illustrative pieces with soft shading, and mastering the Red Ink trend for minimalist and elegant designs.'
    }
  },
  boris: {
    nombre: 'BORIS ARGA',
    imagen: '/loyaltink/bio_boris.JPG',
    ig: 'https://www.instagram.com/borisbortix?igsh=MTR6MTF0dDI1dmp1Yg==',
    es: {
      titulo: 'Especialista en Micro-Realismo y Color Pop',
      tags: 'Micro-Realismo • Fotorrealismo • Color Pop',
      bio: 'Originario de Argentina. Con más de 13 años de Experiencia y con +35 reconocimientos en el mundo del arte y del tatuaje, tatuador versátil en diferentes estilos, como NeoTraidicional, oriental y Black and Grey. Boris es un especialista en llevar el fotorrealismo a escalas reducidas (micro-realismo). Su técnica destaca por la precisión casi fotográfica en retratos humanos y animales, logrando expresiones vívidas y texturas hiperrealistas. Es el único en el estudio que domina el uso de colores vibrantes y de alto contraste (Color Pop) para dar vida a figuras de la cultura pop y deportes con acabados impecables.'
    },
    en: {
      titulo: 'Micro-Realism and Color Pop Specialist',
      tags: 'Micro-Realism • Photorealism • Color Pop',
      bio: 'Originally from Argentina. With over 13 years of experience and 35+ awards in the art and tattoo world, a versatile tattoo artist in styles like Neo-Traditional, Oriental, and Black and Grey. Boris specializes in bringing photorealism to small scales (micro-realism). His technique stands out for almost photographic precision in human and animal portraits, achieving vivid expressions and hyper-realistic textures. He is the only one in the studio who masters the use of vibrant, high-contrast colors (Color Pop) to bring pop culture and sports figures to life with flawless finishes.'
    }
  }
};

export default function PerfilArtista() {
  const pathname = usePathname();
  const [idioma, setIdioma] = useState<'es' | 'en'>('es');
  
  // Extraemos el nombre del artista de la URL (ej: /loyaltink/artista/chuloski -> chuloski)
  const artistaSlug = pathname.split('/').pop() || ''; 
  const artistaData = artistasDB[artistaSlug as keyof typeof artistasDB];

  // 👈 Filtramos las fotos de portafolioData.ts para que coincidan con el artista actual
  const fotosDelArtista = galeriaTatuajes.filter(tatuaje => tatuaje.artista.toLowerCase() === artistaSlug.toLowerCase());

  if (!artistaData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <h2>{idioma === 'es' ? 'Artista no encontrado' : 'Artist not found'}</h2>
      </div>
    );
  }

  // Extraemos la información del idioma actual
  const artista = artistaData[idioma];

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
      <nav className="w-full bg-[#0a0a0a] p-6 flex justify-between items-center border-b border-[#222]">
        <Link href="/loyaltink" className="text-zinc-400 hover:text-white transition-colors text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
          ← {idioma === 'es' ? 'Volver a Loyaltink' : 'Back to Loyaltink'}
        </Link>
        <BotonIdioma />
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20">
        
        {/* TÍTULO CENTRAL */}
        <div className="text-center mb-24">
          <span className="text-[#8B5CF6] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">
            {idioma === 'es' ? 'EL ARTISTA' : 'THE ARTIST'}
          </span>
          <h1 className="text-5xl md:text-7xl text-[#4f46e5] font-serif tracking-wide mb-6">
            ABOUT ME
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {artista.titulo} {idioma === 'es' ? 'trayendo belleza a la vida en la piel.' : 'bringing beauty to life on the skin.'}
          </p>
        </div>

        {/* CONTENEDOR FOTO Y BIO */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
          
          {/* FOTO IZQUIERDA */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#222]">
              <img 
                src={artistaData.imagen} 
                alt={artistaData.nombre} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
          </div>

          {/* BIO DERECHA */}
          <div className="w-full md:w-1/2 flex flex-col justify-center pt-8">
            <h2 className="text-3xl md:text-4xl font-serif text-[#4f46e5] mb-2 uppercase tracking-wide">
              {artistaData.nombre}
            </h2>
            <h3 className="text-zinc-300 text-lg mb-4">
              {artista.titulo}
            </h3>
            <p className="text-zinc-600 text-xs tracking-widest uppercase mb-8">
              {artista.tags}
            </p>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base mb-10 max-w-md">
              {artista.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Botón de IG eliminado, solo queda agendar sesión más prominente */}
              <Link 
                href="/loyaltink/reserva"
                className="text-center px-10 py-4 bg-[#4f46e5] text-white font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#3730a3] transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]"
              >
                {idioma === 'es' ? 'AGENDAR SESIÓN' : 'BOOK SESSION'}
              </Link>
            </div>
          </div>

        </div>

        {/* 📸 SECCIÓN DEL PORTAFOLIO DEL ARTISTA */}
        {fotosDelArtista.length > 0 && (
          <div className="mt-32">
            <div className="text-center mb-16 border-t border-[#222] pt-16">
              <span className="text-[#06b6d4] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">
                {idioma === 'es' ? 'PORTAFOLIO' : 'PORTFOLIO'}
              </span>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
                {idioma === 'es' ? 'DISEÑOS RECIENTES' : 'LATEST DESIGNS'}
              </h2>
            </div>
            
            {/* Grid tipo Masonry para las fotos */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              {fotosDelArtista.map((foto) => (
                <div key={foto.id} className="break-inside-avoid rounded-xl overflow-hidden group border border-[#222] hover:border-[#8B5CF6] transition-colors relative cursor-pointer">
                  <img 
                    src={foto.url} 
                    alt={`Tatuaje por ${foto.artista}`} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay con los estilos (Aparece en Hover) */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-[#06b6d4] text-[10px] font-bold tracking-widest uppercase mb-2">
                      {idioma === 'es' ? 'ESTILOS:' : 'STYLES:'}
                    </p>
                    <p className="text-white text-xs font-medium">
                      {foto.estilos.join(' • ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}