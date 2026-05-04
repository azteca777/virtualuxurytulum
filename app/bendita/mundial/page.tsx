import React from 'react';
import Link from 'next/link'; // IMPORTANTE PARA QUE FUNCIONE EL ENLACE

export default function MundialPage() {
  
  // CALENDARIO COMPLETO DEL MUNDIAL 2026 (Fase de Grupos)
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
    { date: '20 JUN | 10:00 PM', team1: 'Túnez', flag1: '🇹🇳', team2: 'Japón', flag2: '🇯🇵' },
    // 21 Junio
    { date: '21 JUN | 10:00 AM', team1: 'España', flag1: '🇪🇸', team2: 'A. Saudita', flag2: '🇸🇦' },
    { date: '21 JUN | 1:00 PM', team1: 'Bélgica', flag1: '🇧🇪', team2: 'Irán', flag2: '🇮🇷' },
    { date: '21 JUN | 4:00 PM', team1: 'Uruguay', flag1: '🇺🇾', team2: 'Cabo Verde', flag2: '🇨🇻' },
    { date: '21 JUN | 7:00 PM', team1: 'N. Zelanda', flag1: '🇳🇿', team2: 'Egipto', flag2: '🇪🇬' },
    // 22 Junio
    { date: '22 JUN | 11:00 AM', team1: 'Argentina', flag1: '🇦🇷', team2: 'Austria', flag2: '🇦🇹' },
    { date: '22 JUN | 3:00 PM', team1: 'Francia', flag1: '🇫🇷', team2: 'Irak', flag2: '🇮🇶' },
    { date: '22 JUN | 6:00 PM', team1: 'Noruega', flag1: '🇳🇴', team2: 'Senegal', flag2: '🇸🇳' },
    { date: '22 JUN | 9:00 PM', team1: 'Jordania', flag1: '🇯🇴', team2: 'Argelia', flag2: '🇩🇿' },
    // 23 Junio
    { date: '23 JUN | 11:00 AM', team1: 'Portugal', flag1: '🇵🇹', team2: 'Uzbekistán', flag2: '🇺🇿' },
    { date: '23 JUN | 2:00 PM', team1: 'Inglaterra', flag1: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', team2: 'Ghana', flag2: '🇬🇭' },
    { date: '23 JUN | 5:00 PM', team1: 'Panamá', flag1: '🇵🇦', team2: 'Croacia', flag2: '🇭🇷' },
    { date: '23 JUN | 8:00 PM', team1: 'Colombia', flag1: '🇨🇴', team2: 'RD Congo', flag2: '🇨🇩' },
    // 24 Junio
    { date: '24 JUN | 1:00 PM', team1: 'Suiza', flag1: '🇨🇭', team2: 'Canadá', flag2: '🇨🇦' },
    { date: '24 JUN | 1:00 PM', team1: 'Bosnia H.', flag1: '🇧🇦', team2: 'Catar', flag2: '🇶🇦' },
    { date: '24 JUN | 4:00 PM', team1: 'Escocia', flag1: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', team2: 'Brasil', flag2: '🇧🇷' },
    { date: '24 JUN | 4:00 PM', team1: 'Marruecos', flag1: '🇲🇦', team2: 'Haití', flag2: '🇭🇹' },
    { date: '24 JUN | 7:00 PM', team1: 'Rep. Checa', flag1: '🇨🇿', team2: 'México', flag2: '🇲🇽' },
    { date: '24 JUN | 7:00 PM', team1: 'Sudáfrica', flag1: '🇿🇦', team2: 'Corea Sur', flag2: '🇰🇷' },
    // 25 Junio
    { date: '25 JUN | 2:00 PM', team1: 'Curazao', flag1: '🇨🇼', team2: 'Costa Marfil', flag2: '🇨🇮' },
    { date: '25 JUN | 2:00 PM', team1: 'Ecuador', flag1: '🇪🇨', team2: 'Alemania', flag2: '🇩🇪' },
    { date: '25 JUN | 5:00 PM', team1: 'Japón', flag1: '🇯🇵', team2: 'Suecia', flag2: '🇸🇪' },
    { date: '25 JUN | 5:00 PM', team1: 'Túnez', flag1: '🇹🇳', team2: 'Países Bajos', flag2: '🇳🇱' },
    { date: '25 JUN | 8:00 PM', team1: 'Turquía', flag1: '🇹🇷', team2: 'EE. UU.', flag2: '🇺🇸' },
    { date: '25 JUN | 8:00 PM', team1: 'Paraguay', flag1: '🇵🇾', team2: 'Australia', flag2: '🇦🇺' },
    // 26 Junio
    { date: '26 JUN | 1:00 PM', team1: 'Noruega', flag1: '🇳🇴', team2: 'Francia', flag2: '🇫🇷' },
    { date: '26 JUN | 1:00 PM', team1: 'Senegal', flag1: '🇸🇳', team2: 'Irak', flag2: '🇮🇶' },
    { date: '26 JUN | 6:00 PM', team1: 'Cabo Verde', flag1: '🇨🇻', team2: 'A. Saudita', flag2: '🇸🇦' },
    { date: '26 JUN | 6:00 PM', team1: 'Uruguay', flag1: '🇺🇾', team2: 'España', flag2: '🇪🇸' },
    { date: '26 JUN | 9:00 PM', team1: 'Egipto', flag1: '🇪🇬', team2: 'Irán', flag2: '🇮🇷' },
    { date: '26 JUN | 9:00 PM', team1: 'N. Zelanda', flag1: '🇳🇿', team2: 'Bélgica', flag2: '🇧🇪' },
    // 27 Junio
    { date: '27 JUN | 3:00 PM', team1: 'Panamá', flag1: '🇵🇦', team2: 'Inglaterra', flag2: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { date: '27 JUN | 3:00 PM', team1: 'Croacia', flag1: '🇭🇷', team2: 'Ghana', flag2: '🇬🇭' },
    { date: '27 JUN | 5:30 PM', team1: 'Colombia', flag1: '🇨🇴', team2: 'Portugal', flag2: '🇵🇹' },
    { date: '27 JUN | 5:30 PM', team1: 'RD Congo', flag1: '🇨🇩', team2: 'Uzbekistán', flag2: '🇺🇿' },
    { date: '27 JUN | 8:00 PM', team1: 'Argelia', flag1: '🇩🇿', team2: 'Austria', flag2: '🇦🇹' },
    { date: '27 JUN | 8:00 PM', team1: 'Jordania', flag1: '🇯🇴', team2: 'Argentina', flag2: '🇦🇷' }
  ];

  return (
    <main className="relative w-full min-h-screen bg-[#EBE7DE] text-[#1a1a1a]">
      
      {/* NAVEGACIÓN SUPERIOR */}
      <nav className="w-full px-6 py-6 md:px-12 flex justify-between items-center border-b border-[#1a1a1a]/10 bg-[#EBE7DE] sticky top-0 z-50 shadow-sm">
        
        {/* Botón de regreso con Link de Next.js */}
        <Link 
          href="/bendita" 
          className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold hover:text-[#1a1a1a]/50 transition-colors flex items-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="hidden md:block">Regresar</span>
        </Link>

        {/* Título Central */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-xl md:text-2xl font-serif tracking-[0.15em] text-[#1a1a1a]">
            BENDITA AGÜITA
          </h1>
        </div>

        {/* Espaciador para centrar el título correctamente */}
        <div className="w-[80px] md:w-[120px]"></div>
      </nav>

      {/* SECCIÓN DEL CALENDARIO */}
      <section className="w-full py-12 md:py-20 px-2 md:px-8 flex flex-col items-center">
        
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
              <div key={idx} className="flex flex-col md:flex-row items-center w-full bg-[#001021] text-white rounded overflow-hidden shadow-lg border border-[#1a1a1a]/10 hover:border-white/20 transition-colors">
                
                {/* FECHA Y HORA (Fondo Amarillo) */}
                <div className="w-full md:w-[140px] bg-[#ffd500] text-[#1a1a1a] font-bold text-[8px] sm:text-[10px] md:text-xs tracking-wider py-1.5 md:py-4 px-1 md:px-4 flex justify-center md:justify-center items-center text-center">
                  {match.date}
                </div>
                
                {/* EQUIPOS Y VS */}
                <div className="flex flex-1 w-full items-center justify-between px-1 md:px-4 py-2 md:py-0">
                  
                  {/* Equipo 1 */}
                  <div className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-end gap-0.5 md:gap-3 overflow-hidden">
                    <span className="hidden md:block text-sm font-medium tracking-wide text-right whitespace-nowrap">{match.team1}</span>
                    <span className="text-lg sm:text-xl md:text-2xl leading-none">{match.flag1}</span>
                    <span className="md:hidden text-[7px] sm:text-[9px] font-medium tracking-wide text-center leading-tight truncate w-full px-0.5">{match.team1}</span>
                  </div>
                  
                  {/* VS (Fondo Cyan) */}
                  <div className="mx-1 md:mx-2 bg-[#00b4d8] text-white text-[7px] md:text-[9px] font-black px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm shadow-inner shrink-0">
                    VS
                  </div>
                  
                  {/* Equipo 2 */}
                  <div className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-start gap-0.5 md:gap-3 overflow-hidden">
                    <span className="text-lg sm:text-xl md:text-2xl leading-none">{match.flag2}</span>
                    <span className="hidden md:block text-sm font-medium tracking-wide text-left whitespace-nowrap">{match.team2}</span>
                    <span className="md:hidden text-[7px] sm:text-[9px] font-medium tracking-wide text-center leading-tight truncate w-full px-0.5">{match.team2}</span>
                  </div>

                </div>
                
                {/* BOTÓN RESERVAR */}
                <div className="w-full md:w-auto px-2 pb-2 md:pb-0 md:py-2 md:pr-4 flex justify-center">
                  <button className="w-full md:w-auto bg-[#EBE7DE] text-[#1a1a1a] font-bold text-[8px] md:text-[10px] tracking-[0.15em] uppercase py-1.5 md:py-2 px-2 md:px-4 hover:bg-[#D4AF37] transition-colors rounded-sm shadow-md whitespace-nowrap">
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