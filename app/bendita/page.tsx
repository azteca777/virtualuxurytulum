import React from 'react';

export default function BenditaPage() {
  
  // AQUÍ ESTÁN TODOS LOS PARTIDOS DEL MUNDIAL EXTRAÍDOS DE TUS IMÁGENES
  const mundialMatches = [
    // 11 Junio
    { date: '11 JUN | 1:00 PM', team1: 'México', flag1: '🇲🇽', team2: 'Sudáfrica', flag2: '🇿🇦' },
    { date: '11 JUN | 8:00 PM', team1: 'Corea Sur', flag1: '🇰🇷', team2: 'Rep. Checa', flag2: '🇨🇿' },
    // 12 Junio
    { date: '12 JUN | 1:00 PM', team1: 'Canadá', flag1: '🇨🇦', team2: 'Bosnia H.', flag2: '🇧🇦' },
    { date: '12 JUN | 7:00 PM', team1: 'EE. UU.', flag1: '🇺🇸', team2: 'Paraguay', flag2: '🇵🇾' },
    // 13 Junio
    { date: '13 JUN | 1:00 PM', team1: 'Catar', flag1: '🇶🇦', team2: 'Suiza', flag2: '🇨🇭' },
    { date: '13 JUN | 4:00 PM', team1: 'Brasil', flag1: '🇧🇷', team2: 'Marruecos', flag2: '🇲🇦' },
    { date: '13 JUN | 7:00 PM', team1: 'Haití', flag1: '🇭🇹', team2: 'Escocia', flag2: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    { date: '13 JUN | 10:00 PM', team1: 'Australia', flag1: '🇦🇺', team2: 'Turquía', flag2: '🇹🇷' },
    // 14 Junio
    { date: '14 JUN | 11:00 AM', team1: 'Alemania', flag1: '🇩🇪', team2: 'Curazao', flag2: '🇨🇼' },
    { date: '14 JUN | 2:00 PM', team1: 'Países Bajos', flag1: '🇳🇱', team2: 'Japón', flag2: '🇯🇵' },
    { date: '14 JUN | 5:00 PM', team1: 'Costa Marfil', flag1: '🇨🇮', team2: 'Ecuador', flag2: '🇪🇨' },
    { date: '14 JUN | 8:00 PM', team1: 'Suecia', flag1: '🇸🇪', team2: 'Túnez', flag2: '🇹🇳' },
    // 15 Junio
    { date: '15 JUN | 10:00 AM', team1: 'España', flag1: '🇪🇸', team2: 'Cabo Verde', flag2: '🇨🇻' },
    { date: '15 JUN | 1:00 PM', team1: 'Bélgica', flag1: '🇧🇪', team2: 'Egipto', flag2: '🇪🇬' },
    { date: '15 JUN | 4:00 PM', team1: 'A. Saudita', flag1: '🇸🇦', team2: 'Uruguay', flag2: '🇺🇾' },
    { date: '15 JUN | 7:00 PM', team1: 'Irán', flag1: '🇮🇷', team2: 'N. Zelanda', flag2: '🇳🇿' },
    // 16 Junio
    { date: '16 JUN | 1:00 PM', team1: 'Francia', flag1: '🇫🇷', team2: 'Senegal', flag2: '🇸🇳' },
    { date: '16 JUN | 4:00 PM', team1: 'Irak', flag1: '🇮🇶', team2: 'Noruega', flag2: '🇳🇴' },
    { date: '16 JUN | 7:00 PM', team1: 'Argentina', flag1: '🇦🇷', team2: 'Argelia', flag2: '🇩🇿' },
    { date: '16 JUN | 10:00 PM', team1: 'Austria', flag1: '🇦🇹', team2: 'Jordania', flag2: '🇯🇴' },
    // 17 Junio
    { date: '17 JUN | 11:00 AM', team1: 'Portugal', flag1: '🇵🇹', team2: 'RD Congo', flag2: '🇨🇩' },
    { date: '17 JUN | 2:00 PM', team1: 'Inglaterra', flag1: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', team2: 'Croacia', flag2: '🇭🇷' },
    { date: '17 JUN | 5:00 PM', team1: 'Ghana', flag1: '🇬🇭', team2: 'Panamá', flag2: '🇵🇦' },
    { date: '17 JUN | 8:00 PM', team1: 'Uzbekistán', flag1: '🇺🇿', team2: 'Colombia', flag2: '🇨🇴' },
    // 18 Junio
    { date: '18 JUN | 10:00 AM', team1: 'Rep. Checa', flag1: '🇨🇿', team2: 'Sudáfrica', flag2: '🇿🇦' },
    { date: '18 JUN | 1:00 PM', team1: 'Suiza', flag1: '🇨🇭', team2: 'Bosnia H.', flag2: '🇧🇦' },
    { date: '18 JUN | 4:00 PM', team1: 'Canadá', flag1: '🇨🇦', team2: 'Catar', flag2: '🇶🇦' },
    { date: '18 JUN | 7:00 PM', team1: 'México', flag1: '🇲🇽', team2: 'Corea Sur', flag2: '🇰🇷' },
    // 19 Junio
    { date: '19 JUN | 1:00 PM', team1: 'EE. UU.', flag1: '🇺🇸', team2: 'Australia', flag2: '🇦🇺' },
    { date: '19 JUN | 4:00 PM', team1: 'Escocia', flag1: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', team2: 'Marruecos', flag2: '🇲🇦' },
    { date: '19 JUN | 6:30 PM', team1: 'Brasil', flag1: '🇧🇷', team2: 'Haití', flag2: '🇭🇹' },
    { date: '19 JUN | 9:00 PM', team1: 'Turquía', flag1: '🇹🇷', team2: 'Paraguay', flag2: '🇵🇾' },
    // 20 Junio
    { date: '20 JUN | 11:00 AM', team1: 'Países Bajos', flag1: '🇳🇱', team2: 'Suecia', flag2: '🇸🇪' },
    { date: '20 JUN | 2:00 PM', team1: 'Alemania', flag1: '🇩🇪', team2: 'Costa Marfil', flag2: '🇨🇮' },
    { date: '20 JUN | 6:00 PM', team1: 'Ecuador', flag1: '🇪🇨', team2: 'Curazao', flag2: '🇨🇼' },
    { date: '20 JUN | 10:00 PM', team1: 'Túnez', flag1: '🇹🇳', team2: 'Japón', flag2: '🇯🇵' }
  ];

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

      {/* ========================================= */}
      {/* SECCIÓN 5: CALENDARIO MUNDIAL 2026 (Grid 2 Columnas siempre) */}
      {/* ========================================= */}
      <section className="relative z-40 w-full bg-[#EBE7DE] py-16 md:py-24 px-2 md:px-8 flex flex-col items-center border-t border-[#1a1a1a]/10">
        
        <div className="w-full max-w-6xl flex flex-col items-center">
          
          <h2 className="text-xl md:text-4xl font-serif tracking-[0.15em] text-[#1a1a1a] mb-1 md:mb-2 uppercase text-center font-bold italic">
            Calendario
          </h2>
          <h2 className="text-2xl md:text-5xl font-sans tracking-[0.1em] text-[#1a1a1a] mb-8 md:mb-12 uppercase text-center font-black">
            Mundial 2026
          </h2>

          {/* GRID DE 2 COLUMNAS PARA MÓVIL Y PC */}
          <div className="w-full grid grid-cols-2 gap-2 md:gap-4 pointer-events-auto">
            {mundialMatches.map((match, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center w-full bg-[#001021] text-white rounded overflow-hidden shadow-lg border border-white/5">
                
                {/* FECHA Y HORA (Fondo Amarillo) */}
                <div className="w-full md:w-[140px] bg-[#ffd500] text-[#1a1a1a] font-bold text-[8px] sm:text-[10px] md:text-xs tracking-wider py-1.5 md:py-4 px-1 md:px-4 flex justify-center md:justify-center items-center text-center">
                  {match.date}
                </div>
                
                {/* EQUIPOS Y VS */}
                <div className="flex flex-1 w-full items-center justify-between px-1 md:px-4 py-2 md:py-0">
                  
                  {/* Equipo 1: En móvil apila la bandera sobre el nombre, en PC lado a lado */}
                  <div className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-end gap-0.5 md:gap-3 overflow-hidden">
                    <span className="hidden md:block text-sm font-medium tracking-wide text-right whitespace-nowrap">{match.team1}</span>
                    <span className="text-lg sm:text-xl md:text-2xl leading-none">{match.flag1}</span>
                    <span className="md:hidden text-[7px] sm:text-[9px] font-medium tracking-wide text-center leading-tight truncate w-full px-0.5">{match.team1}</span>
                  </div>
                  
                  {/* VS (Fondo Cyan) */}
                  <div className="mx-1 md:mx-2 bg-[#00b4d8] text-white text-[7px] md:text-[9px] font-black px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm shadow-inner shrink-0">
                    VS
                  </div>
                  
                  {/* Equipo 2: Igual que Equipo 1 */}
                  <div className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-start gap-0.5 md:gap-3 overflow-hidden">
                    <span className="text-lg sm:text-xl md:text-2xl leading-none">{match.flag2}</span>
                    <span className="hidden md:block text-sm font-medium tracking-wide text-left whitespace-nowrap">{match.team2}</span>
                    <span className="md:hidden text-[7px] sm:text-[9px] font-medium tracking-wide text-center leading-tight truncate w-full px-0.5">{match.team2}</span>
                  </div>

                </div>
                
                {/* BOTÓN RESERVAR */}
                <div className="w-full md:w-auto px-2 pb-2 md:pb-0 md:py-2 md:pr-4 flex justify-center">
                  <button className="w-full md:w-auto bg-[#EBE7DE] text-[#1a1a1a] font-bold text-[8px] md:text-[10px] tracking-[0.15em] uppercase py-1.5 md:py-2 px-2 md:px-4 hover:bg-white transition-colors rounded-sm shadow-md whitespace-nowrap">
                    Reservar
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}