import React from 'react';

export default function BenditaPage() {
  return (
    
    <main className="relative w-full min-h-screen bg-[#1a1a1a]">
      
      {/* ========================================= */}
      {/* CAPA FONDO FIJO: SECCIÓN 3 (Video Cortina) */}
      {/* ========================================= */}
      {/* CAMBIO AQUÍ: Se cambió bg-black a bg-[#EBE7DE] */}
      <section className="fixed bottom-0 left-0 w-full h-screen z-0 bg-[#EBE7DE] flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain md:object-cover opacity-90"
        >
          <source src="/bendita/video_bendita1.mp4" type="video/mp4" />
          Tu navegador no soporta el formato de video.
        </video>
      </section>

      {/* ========================================= */}
      {/* CONTENEDOR DE SCROLL (Zonas que tapan el video) */}
      {/* ========================================= */}
      <div className="relative w-full z-40 mb-[100vh] bg-transparent">
        
        {/* ========================================= */}
        {/* SECCIÓN 1: HERO (Optimizada para Celulares) */}
        {/* ========================================= */}
        <section className="sticky top-0 w-full h-screen overflow-hidden bg-[#EBE7DE] z-10">
          
          {/* NAVEGACIÓN SUPERIOR */}
          <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-4 md:px-8 lg:px-12 pointer-events-auto bg-[#EBE7DE]/90 backdrop-blur-md border-b border-[#1a1a1a]/10 transition-all duration-300">
            <div className="hidden md:flex gap-2">
              <button className="bg-[#1a1a1a] text-[#EBE7DE] border border-[#1a1a1a] text-[10px] md:text-xs tracking-[0.2em] px-6 py-3 hover:bg-[#333] transition-colors">
                RESERVA AHORA
              </button>
              <button className="bg-transparent text-[#1a1a1a] border border-[#1a1a1a] text-[10px] md:text-xs tracking-[0.2em] px-6 py-3 hover:bg-[#1a1a1a]/10 transition-colors">
                VER EXPERIENCIAS
              </button>
            </div>
            <div className="flex flex-col items-center justify-center text-center mx-auto md:mx-0">
              <h1 className="text-3xl md:text-4xl font-serif tracking-[0.15em] text-[#1a1a1a]">
                BENDITA AGÜITA
              </h1>
              <p className="text-[8px] md:text-[10px] tracking-[0.3em] mt-1 text-[#1a1a1a]/70 uppercase">
                Alta Gastronomía
              </p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-[#1a1a1a]">
              <div className="text-xs tracking-widest hidden lg:block font-light">
                ES <span className="mx-1 font-thin opacity-50">|</span> EN
              </div>
              <button className="w-10 h-10 border border-[#1a1a1a]/40 rounded-full flex items-center justify-center hover:bg-[#1a1a1a] hover:text-[#EBE7DE] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </button>
              <button className="flex flex-col gap-[5px] w-8 items-end hover:opacity-70 transition-opacity">
                <span className="w-full h-[1.5px] bg-[#1a1a1a]"></span>
                <span className="w-full h-[1.5px] bg-[#1a1a1a]"></span>
                <span className="w-[70%] h-[1.5px] bg-[#1a1a1a]"></span>
              </button>
            </div>
          </nav>

          {/* ZONA SUPERIOR HERO */}
          {/* AQUÍ EL CAMBIO: h-full en móvil para que cubra todo, y h-[35%] en PC */}
          <div className="absolute top-0 left-0 w-full h-full md:h-[35%] z-10 pt-[70px] md:pt-[80px]">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat shadow-lg shadow-black/20"
              style={{ backgroundImage: "url('/bendita/fachada.jpeg')" }}
            />
          </div>

          {/* ZONA INFERIOR HERO */}
          {/* AQUÍ EL CAMBIO: hidden en móvil, pero visible como flex en PC (md:flex) */}
          <div className="hidden md:flex absolute top-[35%] left-0 w-full h-[65%] z-0 flex-col items-center justify-start bg-[#1a1a1a]">
            <div 
              className="w-full flex-grow bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/bendita/fachada2.jpeg')" }}
            />
            <div 
              className="w-full h-[200px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/bendita/fachada3.jpeg')" }}
            />
          </div>

          {/* PANTALLA 3D PROMOCIONAL */}
          {/* Centrada perfectamente en móvil (top-1/2 y -translate-y-1/2) y a la izquierda en PC */}
          <div className="absolute z-30 pointer-events-auto top-[27%] md:top-[12%] left-[45%] md:left-[32%] transform -translate-x-1/2 md:translate-x-0">
            <div 
              style={{ transform: 'perspective(1000px) rotateY(15deg) rotateX(5deg) scale(1.0)' }}
              className="transition-transform duration-500 hover:![transform:perspective(1000px)_rotateY(0deg)_rotateX(0deg)_scale(1.1)] shadow-2xl shadow-black/80 rounded-md"
            >
              <div className="p-2 md:p-3 rounded-md" style={{ backgroundColor: '#5c4033', boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8), 0 0 5px rgba(0,0,0,0.5)' }}>
                <div className="w-[280px] h-[460px] sm:w-[160px] sm:h-[280px] md:w-[280px] md:h-[480px] bg-black overflow-hidden relative">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/bendita/video_bendita.mp4" type="video/mp4" />
                    Tu navegador no soporta el formato de video.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* SECCIÓN 2: INFORMACIÓN EDITORIAL (Flotante) */}
        {/* ========================================= */}
        <section 
          className="relative z-20 w-full bg-[#EBE7DE] py-16 px-6 md:px-12 flex flex-col items-center text-[#1a1a1a]"
          style={{ filter: 'drop-shadow(0px -10px 15px rgba(0,0,0,0.15)) drop-shadow(0px 15px 25px rgba(0,0,0,0.4))' }}
        >
          
          {/* IMAGEN DE BARRACUDA */}
          <div 
            className="absolute inset-0 w-full h-full opacity-15 mix-blend-multiply z-0 pointer-events-none"
            style={{ 
              backgroundImage: "url('/bendita/barracuda.png')",
              backgroundSize: "800px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          />

          {/* OLA SUPERIOR */}
          <div className="absolute bottom-full left-0 w-full overflow-hidden leading-none pointer-events-none z-10">
            <svg 
              className="relative block w-full h-[25px] md:h-[40px]" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
            >
              <path 
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.53,19.26,104.91,37.28,157.7,50.77,211.75,64.55,267.43,66.86,321.39,56.44Z" 
                fill="#EBE7DE"
              ></path>
            </svg>
          </div>

          {/* OLA INFERIOR */}
          <div className="absolute top-full left-0 w-full overflow-hidden leading-none pointer-events-none z-10 rotate-180">
            <svg 
              className="relative block w-full h-[25px] md:h-[40px]" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
            >
              <path 
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.53,19.26,104.91,37.28,157.7,50.77,211.75,64.55,267.43,66.86,321.39,56.44Z" 
                fill="#EBE7DE"
              ></path>
            </svg>
          </div>

          {/* CONTENIDO EDITORIAL */}
          <div className="relative z-10 w-full max-w-3xl flex flex-col items-center mt-6 mb-6">
            <h2 className="text-xs md:text-sm tracking-[0.25em] uppercase mb-8 text-center font-medium">
              MEJOR EXPERIENCIA GASTRONÓMICA EN MÉRIDA - BENDITA AGÜITA
            </h2>
            <p className="text-center text-xs md:text-sm font-light leading-relaxed md:leading-loose mb-12 text-[#333]">
              En Bendita Agüita, los comensales son transportados a un mundo donde la tradición se encuentra con la sofisticación moderna. Con un diseño que honra la naturaleza y el minimalismo, este espacio ofrece una experiencia culinaria relajante y lujosa. Disfruta de sabores auténticos y una atmósfera única, perfecta para una cena memorable en uno de los mejores restaurantes de Mérida.
            </p>
            
            <button className="bg-black text-[#EBE7DE] uppercase tracking-[0.2em] text-xs px-12 py-4 hover:bg-[#333] transition-colors">
              Reserva Ahora
            </button>
            
          </div>
        </section>

      </div> {/* <-- FIN DEL CONTENEDOR CON EFECTO DE CORTINA (mb-[100vh]) */}

      {/* ========================================= */}
      {/* SECCIÓN 4: PECES PARED (Fondo pared de ladrillo + Botón + Albóndigas) */}
      {/* ========================================= */}
      <section 
        className="relative z-40 w-full py-24 flex flex-col items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/bendita/pared_ladrillo.jpeg')" }}
      >
        
        {/* === IMAGEN FLOTANTE (ALBÓNDIGAS) RESPONSIVA === */}
        <img 
          src="/bendita/albondigas.png" 
          alt="Albóndigas Bendita Agüita" 
          className="absolute bottom-4 right-4 md:bottom-12 md:right-12 w-16 md:w-32 lg:w-40 z-50 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-300 pointer-events-auto"
        />

        {/* Video responsivo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="relative z-10 w-[90%] max-w-5xl h-auto rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-cover opacity-90"
        >
          <source src="/bendita/peces_pared.mp4" type="video/mp4" />
          Tu navegador no soporta el formato de video.
        </video>

        {/* CONTENEDOR DEL BOTÓN */}
        <div className="relative z-10 w-full flex flex-col items-center text-white mt-10 drop-shadow-md pointer-events-auto px-4">
          <button className="bg-[#EBE7DE] text-[#1a1a1a] uppercase font-bold tracking-[0.2em] text-sm md:text-base px-12 py-4 md:px-20 md:py-6 hover:bg-white transition-colors shadow-xl shadow-black/40 w-full max-w-[300px] md:w-auto text-center">
            Ver Menú
          </button>
        </div>

      </section>

    </main>
  );
}