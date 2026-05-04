import React from 'react';
import Link from 'next/link';

export default function BenditaPage() {
  return (
    
    <main className="relative w-full min-h-screen bg-[#1a1a1a]">
      
      {/* ========================================= */}
      {/* CAPA FONDO FIJO: SECCIÓN 3 (Video Cortina) */}
      {/* ========================================= */}
      <section className="fixed bottom-0 left-0 w-full h-screen z-0 bg-[#EBE7DE] flex items-center justify-center overflow-hidden">
        
        {/* === IMAGEN SUPERIOR (Solo para celulares) === */}
        <div 
          className="absolute top-0 left-0 w-full h-[35%] bg-cover bg-center bg-no-repeat md:hidden z-0"
          style={{ backgroundImage: "url('/bendita/medusa.jpeg')" }}
        />

        {/* === IMAGEN INFERIOR (Solo para celulares) === */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[35%] bg-cover bg-center bg-no-repeat md:hidden z-0"
          style={{ backgroundImage: "url('/bendita/pez_globo.jpeg')" }}
        />

        {/* VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="relative z-10 w-full h-full object-contain md:object-cover opacity-90"
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
          
          {/* NAVEGACIÓN SUPERIOR CON FONDO DE IMAGEN */}
          <nav 
            className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-4 md:px-8 lg:px-12 pointer-events-auto bg-contain md:bg-cover bg-center bg-no-repeat shadow-md border-b border-[#1a1a1a]/20 transition-all duration-300"
            style={{ backgroundImage: "url('/bendita/fachada3.jpeg')" }}
          >
            <div className="hidden md:flex gap-2 relative z-10">
              <button className="bg-[#1a1a1a] text-[#EBE7DE] border border-[#1a1a1a] text-[10px] md:text-xs tracking-[0.2em] px-6 py-3 hover:bg-[#333] transition-colors">
                RESERVA AHORA
              </button>
              <button className="bg-[#EBE7DE]/80 text-[#1a1a1a] border border-[#1a1a1a] text-[10px] md:text-xs tracking-[0.2em] px-6 py-3 hover:bg-white transition-colors">
                VER EXPERIENCIAS
              </button>
            </div>
            
            
            <div className="flex items-center gap-4 md:gap-6 text-[#1a1a1a] relative z-10">
              <div className="text-xs tracking-widest hidden lg:block font-bold drop-shadow-sm">
                ES <span className="mx-1 font-thin opacity-50">|</span> EN
              </div>
              <button className="w-10 h-10 border border-[#1a1a1a]/60 bg-[#EBE7DE]/50 rounded-full flex items-center justify-center hover:bg-[#1a1a1a] hover:text-[#EBE7DE] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </button>
              <button className="flex flex-col gap-[5px] w-8 items-end hover:opacity-70 transition-opacity">
                <span className="w-full h-[2px] bg-[#1a1a1a]"></span>
                <span className="w-full h-[2px] bg-[#1a1a1a]"></span>
                <span className="w-[70%] h-[2px] bg-[#1a1a1a]"></span>
              </button>
            </div>
          </nav>

          {/* ZONA SUPERIOR HERO */}
          <div className="absolute top-0 left-0 w-full h-full md:h-[35%] z-10 pt-[70px] md:pt-[80px]">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat shadow-lg shadow-black/20"
              style={{ backgroundImage: "url('/bendita/fachada.jpeg')" }}
            />
          </div>

          {/* ZONA INFERIOR HERO */}
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
            <p className="text-center text-xs md:text-sm font-light leading-relaxed md:leading-loose mb-8 text-[#333]">
              En Bendita Agüita, los comensales son transportados a un mundo donde la tradición se encuentra con la sofisticación moderna. Con un diseño que honra la naturaleza y el minimalismo, este espacio ofrece una experiencia culinaria relajante y lujosa. Disfruta de sabores auténticos y una atmósfera única, perfecta para una cena memorable en uno de los mejores restaurantes de Mérida.
            </p>
            
            {/* NUEVO BOTÓN: RESERVA AHORA */}
            <button className="group flex items-center cursor-pointer transition-transform duration-300 hover:scale-105 z-20">
              <div className="flex items-center bg-[#1a1a1a] rounded-full p-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                {/* Ícono */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#001021] flex items-center justify-center z-10 border-2 border-[#1a1a1a] shadow-inner relative">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#EBE7DE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                {/* Cinta de Texto */}
                <div
                  className="bg-[#EBE7DE] text-[#001021] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase py-4 pr-6 md:pr-10 pl-10 md:pl-12 -ml-6 rounded-r-full relative"
                  style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 15px 100%, 0 50%)' }}
                >
                  <div className="absolute inset-[3px] border border-[#001021]/30 rounded-r-full" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 50%)' }}></div>
                  <span className="relative z-10 block mt-[1px]">Reserva Ahora</span>
                </div>
              </div>
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
        <div className="relative z-10 w-full flex flex-col items-center text-white mt-8 drop-shadow-md pointer-events-auto px-4">
          
          {/* NUEVO BOTÓN: VER MENÚ */}
          <button className="group flex items-center cursor-pointer transition-transform duration-300 hover:scale-105">
            <div className="flex items-center bg-[#1a1a1a] rounded-full p-1.5 shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
              {/* Ícono */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#001021] flex items-center justify-center z-10 border-2 border-[#1a1a1a] shadow-inner relative">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#EBE7DE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              {/* Cinta de Texto */}
              <div
                className="bg-[#EBE7DE] text-[#001021] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase py-4 pr-8 md:pr-12 pl-10 md:pl-12 -ml-6 rounded-r-full relative"
                style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 15px 100%, 0 50%)' }}
              >
                <div className="absolute inset-[3px] border border-[#001021]/30 rounded-r-full" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 50%)' }}></div>
                <span className="relative z-10 block mt-[1px]">Ver Menú</span>
              </div>
            </div>
          </button>

        </div>

      </section>

      {/* ========================================= */}
      {/* SECCIÓN 5: BANNER LINK HACIA EL MUNDIAL   */}
      {/* ========================================= */}
      <section className="relative z-40 w-full flex flex-col items-center pointer-events-auto bg-black border-t border-[#1a1a1a]/10">
        
        {/* Contenedor Edge-to-Edge - Se aumentó la altura para dar espacio a la pantalla y al botón */}
        <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-black">
          
          <img 
            src="/bendita/pantalla_mundial.jpeg" 
            alt="Mundial 2026 en Bendita Agüita" 
            className="absolute inset-0 w-full h-full object-cover opacity-60" 
          />
          
          {/* Capa superpuesta libre (sin centrado automático) */}
          <div className="absolute inset-0 pointer-events-none">
            
             {/* PANTALLA 3D (Posicionamiento Manual) */}
            {/* AQUÍ MUEVES: top, bottom, left, right */}
            <div 
              className="absolute top-[10%] left-[5%] md:top-[13%] md:left-[30%] pointer-events-auto"
              style={{ transform: 'perspective(1000px) rotateY(-8deg) rotateX(5deg) scale(1.0)' }}
            >
              <div className="transition-transform duration-500 hover:![transform:perspective(1000px)_rotateY(0deg)_rotateX(0deg)_scale(1.0)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-lg">
                <div className="w-[285px] h-[165px] sm:w-[280px] sm:h-[130px] md:w-[410px] md:h-[220px] bg-black overflow-hidden relative rounded-lg border border-white/10">
                  <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="/bendita/video_mundial.mp4" type="video/mp4" />
                    Tu navegador no soporta el formato de video.
                  </video>
                </div>
              </div>
            </div>

            {/* CONTENEDOR AGRUPADO: ESFERA Y BOTÓN MUNDIAL */}
            <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 md:gap-6 pointer-events-auto">
              
              {/* ESFERA MUNDIAL CIRCULAR */}
              <div className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_25px_rgba(0,0,0,0.8)] relative transition-transform duration-500 hover:scale-110">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                  <source src="/bendita/esfera_mundial.mp4" type="video/mp4" />
                  Tu navegador no soporta el formato de video.
                </video>
              </div>

              {/* NUEVO BOTÓN: RESERVA MUNDIAL (Con hover interactivo de colores) */}
              <Link href="/bendita/mundial" className="group flex items-center cursor-pointer transition-transform duration-300 hover:scale-105">
                <div className="flex items-center bg-[#1a1a1a] rounded-full p-1.5 shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
                  {/* Ícono Balón/Mundo */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#001021] flex items-center justify-center z-10 border-2 border-[#1a1a1a] shadow-inner relative transition-colors duration-300 group-hover:bg-[#EBE7DE]">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[#EBE7DE] group-hover:text-[#001021] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {/* Cinta de Texto interactiva */}
                  <div
                    className="bg-[#EBE7DE] text-[#001021] text-[9px] md:text-xs font-black tracking-[0.2em] uppercase py-4 pr-6 md:pr-10 pl-10 md:pl-12 -ml-6 rounded-r-full relative transition-colors duration-300 group-hover:bg-[#001021] group-hover:text-[#EBE7DE]"
                    style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 15px 100%, 0 50%)' }}
                  >
                    <div className="absolute inset-[3px] border border-[#001021]/30 group-hover:border-[#EBE7DE]/30 transition-colors duration-300 rounded-r-full" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 50%)' }}></div>
                    <span className="relative z-10 block mt-[1px]">Reserva para el mundial</span>
                  </div>
                </div>
              </Link>
              
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}