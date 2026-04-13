'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

// BASE DE DATOS DE ARTISTAS
const artistasDB = {
  chuloski: {
    nombre: 'JOEL SKREPNIK "CHULOSKI"',
    titulo: 'Especialista en Blackwork y Neo-Japonés',
    tags: 'Blackwork • Neo-Japonés • Tradicional',
    bio: 'Originario de Buenos Aires, Argentina. Soy un entusiasta del alto contraste, fusionando fondos de blackwork extremo con iconografía del tatuaje neo-japonés y tradicional. Mi pasión es dar vida a deidades imponentes y máscaras Hannya en la piel, utilizando negros sólidos y profundos que hacen estallar los colores clásicos.',
    imagen: '/loyaltink/perfil_chuloski.png',
    ig: 'https://www.instagram.com/chuloski_?igsh=MmZ4MXB0eXZzOGln'
  },
  rafa: {
    nombre: 'RAFA MOLDESS',
    titulo: 'Artista Black & Grey y Realismo',
    tags: 'Black & Grey • Realismo • Neo-Tribal',
    bio: 'Originario de Córdoba, Argentina. Me considero un artista sumamente versátil. Mi obsesión por el detalle me permite crear piezas con un nivel fotográfico en Black & Grey, pero también disfruto fluyendo hacia el Blackwork y el Neo-Tribal para lograr composiciones de trazos agresivos y alto contraste.',
    imagen: '/loyaltink/perfil_rafa.png',
    ig: 'https://www.instagram.com/rafamoldess.tattooer?igsh=MWx5NnVoY2J3OXIyMQ=='
  },
  prana: {
    nombre: 'LAUTARO BORDESSE "PRANA"',
    titulo: 'Creador de Realismo Épico',
    tags: 'Realismo Épico • Estatuaria • Mitología',
    bio: 'Originario de Córdoba, Argentina. Mi objetivo es elevar el realismo Black & Grey a una escala monumental. Me especializo en composiciones épicas inspiradas en la mitología nórdica y grecorromana. Si buscas un tatuaje que parezca esculpido en piedra antigua, estás en el lugar correcto.',
    imagen: '/loyaltink/perfil_prana.png',
    ig: 'https://www.instagram.com/pranatattoo_?igsh=MThrMmdram02ZHkwNA=='
  },
  nai: {
    nombre: 'NAIARA "NAI"',
    titulo: 'Artista Fine Line y Botánico',
    tags: 'Fine Line • Botánico • Red Ink',
    bio: 'Originaria de Tierra del Fuego, Argentina. Mi trabajo se define por la extrema delicadeza y precisión. Me enfoco en el Fine Line, creando composiciones florales, piezas ilustrativas con sombras suaves y dominando la tendencia del Red Ink para diseños minimalistas y elegantes.',
    imagen: '/loyaltink/perfil_nai.png',
    ig: 'https://www.instagram.com/tattoonaink?igsh=ODV3ZTFxM2F0eDdx'
  },
  boris: {
    nombre: 'BORIS ARGA',
    titulo: 'Especialista en Micro-Realismo y Color Pop',
    tags: 'Micro-Realismo • Fotorrealismo • Color Pop',
    bio: 'Originario de Argentina. Con mas de 13 años de Experiencia y con +35 reconocimientos en el mundo del arte y del tatuaje, tatuador versátil en diferentes estilos, como NeoTraidicional, oriental y Black and Grey. Boris es un especialista en llevar el fotorrealismo a escalas reducidas (micro-realismo). Su técnica destaca por la precisión casi fotográfica en retratos humanos y animales, logrando expresiones vívidas y texturas hiperrealistas. Es el único en el estudio que domina el uso de colores vibrantes y de alto contraste (Color Pop) para dar vida a figuras de la cultura pop y deportes con acabados impecables.',
    imagen: '/loyaltink/bio_boris.jpg',
    ig: 'https://www.instagram.com/borisbortix?igsh=MTR6MTF0dDI1dmp1Yg=='
  }
};

export default function PerfilArtista() {
  const pathname = usePathname();
  // Extraemos el nombre del artista de la URL (ej: /loyaltink/artista/chuloski -> chuloski)
  const artistaSlug = pathname.split('/').pop() || ''; 
  const artista = artistasDB[artistaSlug as keyof typeof artistasDB];

  if (!artista) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <h2>Artista no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 selection:bg-[#8B5CF6] selection:text-white">
      
      {/* HEADER MINIMALISTA */}
      <nav className="w-full bg-[#0a0a0a] p-6 flex justify-between items-center border-b border-[#222]">
        <Link href="/loyaltink" className="text-zinc-400 hover:text-white transition-colors text-xs font-bold tracking-[0.2em] uppercase">
          ← Volver a Loyaltink
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20">
        
        {/* TÍTULO CENTRAL (Estilo de tu captura) */}
        <div className="text-center mb-24">
          <span className="text-[#8B5CF6] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">
            EL ARTISTA
          </span>
          <h1 className="text-5xl md:text-7xl text-[#4f46e5] font-serif tracking-wide mb-6">
            ABOUT ME
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {artista.titulo} trayendo belleza a la vida en la piel.
          </p>
        </div>

        {/* CONTENEDOR FOTO Y BIO (Estilo de tu captura) */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
          
          {/* FOTO IZQUIERDA */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#222]">
              <img 
                src={artista.imagen} 
                alt={artista.nombre} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
          </div>

          {/* BIO DERECHA */}
          <div className="w-full md:w-1/2 flex flex-col justify-center pt-8">
            <h2 className="text-3xl md:text-4xl font-serif text-[#4f46e5] mb-2 uppercase tracking-wide">
              {artista.nombre}
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
            
            <div className="flex gap-4">
              <a 
                href={artista.ig}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-[#4f46e5] text-[#4f46e5] font-bold text-xs uppercase tracking-widest hover:bg-[#4f46e5] hover:text-white transition-colors"
              >
                MI PORTAFOLIO (IG)
              </a>
              <Link 
                href="/loyaltink/reserva"
                className="px-8 py-3 bg-[#4f46e5] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#3730a3] transition-colors"
              >
                AGENDAR SESIÓN
              </Link>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}