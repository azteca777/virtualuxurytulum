import React from 'react';
import Link from 'next/link'; // IMPORTANTE PARA QUE FUNCIONE EL ENLACE

export default function MundialPage() {
  
  // Función mágica para convertir la fecha del calendario al enlace de OpenTable
  const getOpenTableUrl = (dateStr: string) => {
    try {
      // 1. Separamos la fecha y la hora (Ej: "11 JUN" y "1:00 PM")
      const [datePart, timePart] = dateStr.split(' | ');
      const [day, monthName] = datePart.split(' ');
      
      // 2. Damos formato al día y mes
      const formattedDay = day.padStart(2, '0');
      const month = monthName.toUpperCase() === 'JUN' ? '06' : '07';

      // 3. Convertimos la hora de AM/PM a formato 24 horas (Militar)
      const [time, period] = timePart.split(' ');
      
      const [hoursString, minutes] = time.split(':');
      let hours = parseInt(hoursString, 10);
      
      // Si dice "PM" y no son las 12, le sumamos 12 hrs. (Ej: 1:00 PM -> 13:00)
      if (period === 'PM' && hours !== 12) hours += 12;
      // Si dice "AM" y son las 12, son las 00:00 hrs.
      if (period === 'AM' && hours === 12) hours = 0;
      
      const formattedHours = hours.toString().padStart(2, '0');

      // 4. Construimos la fecha exacta que pide OpenTable (YYYY-MM-DDTHH:MM:00)
      const isoDate = `2026-${month}-${formattedDay}T${formattedHours}:${minutes}:00`;
      
      // 5. Devolvemos el enlace limpio directo a tu restaurante p=2 (2 personas por defecto)
      return `https://www.opentable.com.mx/r/bendita-aguita-merida?p=2&sd=${isoDate}`;
    } catch (e) {
      // Si algo falla, mandamos al enlace general
      return "https://www.opentable.com.mx/r/bendita-aguita-merida";
    }
  };

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
                
                {/* BOTÓN RESERVAR DIRECTO A OPENTABLE (Estilo Listón Compacto) */}
                <div className="w-full md:w-auto px-2 pb-2 md:pb-0 md:py-2 md:pr-4 flex justify-center">
                  <a 
                    href={getOpenTableUrl(match.date)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center cursor-pointer transition-transform duration-300 hover:scale-105"
                  >
                    <div className="flex items-center bg-[#1a1a1a] rounded-full p-1 shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
                      {/* Ícono de Calendario */}
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#001021] flex items-center justify-center z-10 border border-[#1a1a1a] shadow-inner relative transition-colors duration-300 group-hover:bg-[#EBE7DE]">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-[#EBE7DE] group-hover:text-[#001021] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      {/* Cinta de Texto */}
                      <div
                        className="bg-[#EBE7DE] text-[#001021] text-[7px] md:text-[9px] font-black tracking-[0.15em] uppercase py-1.5 md:py-2 pr-4 md:pr-6 pl-6 md:pl-8 -ml-4 rounded-r-full relative transition-colors duration-300 group-hover:bg-[#001021] group-hover:text-[#EBE7DE]"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 10px 100%, 0 50%)' }}
                      >
                        <div className="absolute inset-[1.5px] border border-[#001021]/30 group-hover:border-[#EBE7DE]/30 transition-colors duration-300 rounded-r-full" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 8px 100%, 0 50%)' }}></div>
                        <span className="relative z-10 block mt-[1px] whitespace-nowrap">Reservar</span>
                      </div>
                    </div>
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}