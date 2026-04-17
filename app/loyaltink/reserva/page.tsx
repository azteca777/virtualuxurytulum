"use client";

import { useState, useEffect } from "react";
import SensorTrafico from '../../components/SensorTrafico';

// === DATOS DE LOS ARTISTAS ===
const ARTISTAS = [
  { id: "chuloski", nombre: "Chuloski", estilo: "Blackwork / Neo-Japonés", img: "/loyaltink/perfil_chuloski.png", wa: "521234567890" },
  { id: "rafa", nombre: "Rafa Moldess", estilo: "Black & Grey / Neo-Tribal", img: "/loyaltink/bio_rafa.jpg", wa: "521234567890" },
  { id: "prana", nombre: "Prana", estilo: "Realismo Épico / Mitología", img: "/loyaltink/bio_prana.jpg", wa: "521234567890" },
  { id: "nai", nombre: "Naiara", estilo: "Fine Line / Botánico / Red Ink", img: "/loyaltink/bio_nai.jpg", wa: "521234567890" },
  { id: "boris", nombre: "Boris Arga", estilo: "Micro-Realismo / Color Pop", img: "/loyaltink/bio_boris.JPG", wa: "521234567890" },
  { id: "avelino", nombre: "Avelino", estilo: "Black & Grey / Realismo / Blackwork", img: "/loyaltink/bio_avelino.jpeg", wa: "521234567890" }
];

const NOMBRES_MESES = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

export default function ReservaLoyaltink() {
  const [paso, setPaso] = useState(1); 
  const [artistaSeleccionado, setArtistaSeleccionado] = useState<any>(null);
  
  // Estados Calculadora Mini
  const [size, setSize] = useState(15);
  const [colorType, setColorType] = useState("Blanco y Negro");
  const [complexity, setComplexity] = useState("Moderada");
  const [style, setStyle] = useState("Blackwork"); 
  
  // Estados de Usuario
  const [nombreCliente, setNombreCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("");

  // Estados Calendario REALES Y DINÁMICOS
  const hoy = new Date();
  const [mesActual, setMesActual] = useState(hoy.getMonth()); 
  const [anioActual, setAnioActual] = useState(hoy.getFullYear());
  const [fecha, setFecha] = useState<number | null>(null);
  const [hora, setHora] = useState<string | null>(null);
  const [diasOcupados, setDiasOcupados] = useState<number[]>([]);
  const [cargandoCalendario, setCargandoCalendario] = useState(false);
  const [procesandoPago, setProcesandoPago] = useState(false);

  // Cálculos matemáticos del calendario para pintar los días correctamente
  const diasEnMes = new Date(anioActual, mesActual + 1, 0).getDate();
  const primerDiaSemana = new Date(anioActual, mesActual, 1).getDay(); // 0 = Domingo, 1 = Lunes, etc.

  const cambiarMes = (direccion: number) => {
    let nuevoMes = mesActual + direccion;
    let nuevoAnio = anioActual;
    if (nuevoMes < 0) { nuevoMes = 11; nuevoAnio--; }
    else if (nuevoMes > 11) { nuevoMes = 0; nuevoAnio++; }
    setMesActual(nuevoMes);
    setAnioActual(nuevoAnio);
    setFecha(null);
    setHora(null);
  };

  // --- LÓGICA DE CÁLCULO DE COSTO ---
  const getCostoTotal = () => {
    let base = 80;
    let sizeMultiplier = size * 8;
    let colorMult = colorType === "Color" ? 1.3 : 1;
    let compMult = complexity === "Moderada" ? 1 : complexity === "Compleja" ? 1.5 : 2;
    return Math.floor((base + sizeMultiplier) * colorMult * compMult);
  };

  const costoTotal = getCostoTotal();
  const anticipo = Math.floor(costoTotal * 0.20);

  const handleWhatsApp = (artista: any) => {
    const mensaje = `Hola, quiero iniciar una consulta para tatuarme con ${artista.nombre}. ¿Me pueden dar más información?`;
    window.open(`https://wa.me/${artista.wa}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  // --- NUEVA LÓGICA: CONSULTAR DISPONIBILIDAD DINÁMICA ---
  const consultarDisponibilidad = async (artistaId: string) => {
    setCargandoCalendario(true);
    try {
      const primerDiaIso = new Date(anioActual, mesActual, 1).toISOString();
      const ultimoDiaIso = new Date(anioActual, mesActual + 1, 0, 23, 59, 59).toISOString();

      const res = await fetch(`/api/calendar?artistaId=${artistaId}&timeMin=${primerDiaIso}&timeMax=${ultimoDiaIso}`);
      const data = await res.json();
      
      if (data.fechasOcupadas) {
        const diasOcupadosSet = new Set<number>();
        data.fechasOcupadas.forEach((fechaIso: string) => {
           if(fechaIso) {
             const fechaObj = new Date(fechaIso);
             if (fechaObj.getMonth() === mesActual && fechaObj.getFullYear() === anioActual) {
                diasOcupadosSet.add(fechaObj.getDate());
             }
           }
        });
        setDiasOcupados(Array.from(diasOcupadosSet));
      }
    } catch (error) {
      console.error("Error cargando calendario", error);
    }
    setCargandoCalendario(false);
  };

  useEffect(() => {
    if (paso === 3 && artistaSeleccionado) {
      consultarDisponibilidad(artistaSeleccionado.id);
    }
  }, [paso, artistaSeleccionado, mesActual, anioActual]);

  // --- LÓGICA REAL: CONEXIÓN CON TU API GOD MODE (MERCADO PAGO) ---
  const procesarPagoMercadoPago = async () => {
    setProcesandoPago(true);
    
    // 1. Convertimos el anticipo de USD a MXN (Asumiendo $18 MXN por dólar)
    const TASA_MXN = 18;
    const anticipoMXN = anticipo * TASA_MXN;

    try {
      // 2. Llamamos a tu API centralizada de Checkout
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: anticipoMXN, // Tu API espera "amount"
          serviceName: `Anticipo Cita Tatuaje - ${artistaSeleccionado.nombre}`, // Tu API espera "serviceName"
          proveedor: 'mercadopago', // Le decimos a tu API qué pasarela usar
          negocioSlug: 'loyaltink', // Tu API buscará MP_ACCESS_TOKEN_LOYALTINK
          carrito: [
            {
              nombre: `Cita con ${artistaSeleccionado.nombre} (${fecha}/${mesActual + 1}/${anioActual} a las ${hora})`,
              precio: anticipoMXN,
              cantidad: 1,
              detalles: `Cliente: ${nombreCliente} | WA: ${telefonoCliente} | Tamaño: ${size}cm | Color: ${colorType}`
            }
          ]
        })
      });

      const data = await res.json();

      // 3. Redirigimos al cliente a la pantalla segura de Mercado Pago
      if (res.ok && data.url) {
        window.location.href = data.url; 
      } else {
        console.error("Error de la API:", data.error);
        alert(`Hubo un error al generar el link de pago: ${data.error || 'Intenta de nuevo.'}`);
        setProcesandoPago(false);
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de conexión con la pasarela de pago.");
      setProcesandoPago(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-[#8B5CF6] selection:text-white pb-24">
      <SensorTrafico marca="LOYALTINK_RESERVA" />

      {/* NAVEGACIÓN SUPERIOR */}
      <nav className="sticky top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/10 flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = '/loyaltink'}>
          <div className="w-10 h-10 bg-[#8B5CF6] rounded-full overflow-hidden border border-white/20">
             <img src="/loyaltink/logo_loyaltink.jpeg" alt="Loyaltink" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-black text-white tracking-widest uppercase">RESERVAS</span>
        </div>
        <button onClick={() => window.location.href = '/loyaltink'} className="text-[10px] font-bold tracking-widest text-zinc-400 hover:text-white uppercase transition-colors">
          ✕ CANCELAR
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        
        {/* BARRA DE PROGRESO */}
        <div className="flex justify-between mb-12 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-1 before:bg-[#222] before:-z-10">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${paso >= num ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-[#111] border-[#333] text-zinc-500'}`}>
              {num}
            </div>
          ))}
        </div>

        {/* PASO 1: SELECCIONAR ARTISTA */}
        {paso === 1 && (
          <div className="animate-[fadeIn_0.5s_ease-in-out]">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2 text-center">ELIGE A TU ARTISTA</h2>
            <p className="text-zinc-400 text-center mb-10 text-sm">Selecciona al artista con el que deseas agendar o hazle una consulta previa.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {ARTISTAS.map((artista) => (
                <div key={artista.id} className="bg-[#111] border border-[#222] rounded-xl overflow-hidden hover:border-[#06b6d4] transition-all group flex flex-col">
                  <div className="h-64 bg-zinc-800 overflow-hidden relative">
                    <img src={artista.img} alt={artista.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white uppercase">{artista.nombre}</h3>
                      <p className="text-[#06b6d4] text-[10px] font-bold tracking-widest uppercase">{artista.estilo}</p>
                    </div>
                  </div>
                  <div className="p-4 flex gap-2">
                    <button 
                      onClick={() => { setArtistaSeleccionado(artista); setPaso(2); }}
                      className="flex-1 bg-white text-black font-bold py-3 text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors rounded-md"
                    >
                      AGENDAR
                    </button>
                    <button 
                      onClick={() => handleWhatsApp(artista)}
                      className="w-12 bg-[#25D366] text-white flex items-center justify-center rounded-md hover:bg-[#20b858] transition-colors"
                      title="Consulta rápida por WhatsApp"
                    >
                      💬
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PASO 2: COTIZADOR MINI */}
        {paso === 2 && (
          <div className="animate-[fadeIn_0.5s_ease-in-out] max-w-2xl mx-auto bg-[#111] border border-[#333] p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">DETALLES DE LA PIEZA</h2>
            <p className="text-zinc-400 text-xs mb-8">Cotización dinámica para tu cita con <span className="text-[#06b6d4] font-bold">{artistaSeleccionado?.nombre}</span></p>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Tamaño aprox ({size} cm)</label>
                </div>
                <input type="range" min="5" max="60" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Color</label>
                  <select value={colorType} onChange={(e) => setColorType(e.target.value)} className="w-full bg-[#222] border border-[#333] text-white text-xs rounded-lg p-3 outline-none focus:border-[#8B5CF6]">
                    <option>Blanco y Negro</option>
                    <option>Color</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Complejidad</label>
                  <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className="w-full bg-[#222] border border-[#333] text-white text-xs rounded-lg p-3 outline-none focus:border-[#8B5CF6]">
                    <option>Moderada</option>
                    <option>Compleja</option>
                    <option>Fotorrealismo</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Costo Estimado Total</p>
                  <p className="text-3xl font-black text-white">${costoTotal} <span className="text-sm font-normal text-zinc-500">USD</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#06b6d4] font-bold uppercase tracking-widest mb-1">Anticipo Requerido (20%)</p>
                  <p className="text-xl font-bold text-[#06b6d4]">${anticipo} <span className="text-xs font-normal">USD</span></p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setPaso(1)} className="px-6 py-3 border border-[#333] text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white rounded-md transition-colors">Volver</button>
                <button onClick={() => setPaso(3)} className="flex-1 bg-[#8B5CF6] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#7c3aed] rounded-md transition-colors shadow-[0_0_20px_rgba(139,92,246,0.3)]">Continuar al Calendario</button>
              </div>
            </div>
          </div>
        )}

        {/* PASO 3: CALENDARIO DE DISPONIBILIDAD CON GOOGLE CALENDAR */}
        {paso === 3 && (
          <div className="animate-[fadeIn_0.5s_ease-in-out] max-w-2xl mx-auto bg-[#111] border border-[#333] p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">SELECCIONA FECHA Y HORA</h2>
            <p className="text-zinc-400 text-xs mb-8">Agenda en tiempo real de <span className="text-[#8B5CF6] font-bold">{artistaSeleccionado?.nombre}</span></p>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <button onClick={() => cambiarMes(-1)} className="text-zinc-500 hover:text-white w-8 h-8 rounded-full hover:bg-[#222]">◀</button>
                <p className="text-sm font-bold text-white uppercase tracking-widest">{NOMBRES_MESES[mesActual]} {anioActual}</p>
                <button onClick={() => cambiarMes(1)} className="text-zinc-500 hover:text-white w-8 h-8 rounded-full hover:bg-[#222]">▶</button>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[10px] font-bold text-zinc-500">
                <span>DO</span><span>LU</span><span>MA</span><span>MI</span><span>JU</span><span>VI</span><span>SA</span>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {cargandoCalendario ? (
                  <div className="col-span-7 py-10 flex flex-col items-center">
                    <div className="w-6 h-6 border-2 border-[#06b6d4] border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-[#06b6d4] text-[10px] font-bold tracking-widest uppercase">Sincronizando calendario...</p>
                  </div>
                ) : (
                  <>
                    {/* Espacios vacíos para que el día 1 caiga en el día de la semana correcto */}
                    {Array.from({ length: primerDiaSemana }).map((_, i) => (
                      <div key={`empty-${i}`} className="aspect-square"></div>
                    ))}
                    
                    {/* Días reales del mes */}
                    {Array.from({ length: diasEnMes }, (_, i) => i + 1).map((dia) => {
                      const ocupado = diasOcupados.includes(dia);
                      const seleccionado = fecha === dia;
                      // Validar que no se reserve en el pasado
                      const esPasado = (anioActual === hoy.getFullYear() && mesActual === hoy.getMonth() && dia < hoy.getDate());
                      const deshabilitado = ocupado || esPasado;

                      return (
                        <button 
                          key={dia} 
                          disabled={deshabilitado}
                          onClick={() => { setFecha(dia); setHora(null); }}
                          className={`aspect-square rounded-md flex items-center justify-center text-xs transition-all
                            ${esPasado ? 'bg-[#0a0a0a] text-[#222] cursor-not-allowed' : 
                              ocupado ? 'bg-[#0a0a0a] text-zinc-700 cursor-not-allowed line-through border border-red-900/30' : 
                              seleccionado ? 'bg-[#06b6d4] text-white font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 
                              'bg-[#222] text-zinc-300 hover:bg-[#333] hover:text-white'}`}
                        >
                          {dia}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            </div>

            {fecha && !cargandoCalendario && (
              <div className="mb-8 animate-[fadeIn_0.3s_ease-in-out]">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Horarios Disponibles el {fecha} de {NOMBRES_MESES[mesActual]}</p>
                <div className="flex gap-3">
                  {['13:00', '15:30', '18:00'].map((h) => (
                    <button 
                      key={h} onClick={() => setHora(h)}
                      className={`px-4 py-2 rounded-md text-xs font-bold border transition-all ${hora === h ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-[0_0_10px_rgba(139,92,246,0.3)]' : 'bg-[#0a0a0a] border-[#333] text-zinc-400 hover:border-zinc-500'}`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 border-t border-[#222] pt-6">
              <button onClick={() => setPaso(2)} className="px-6 py-3 border border-[#333] text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white rounded-md transition-colors">Volver</button>
              <button 
                disabled={!fecha || !hora} 
                onClick={() => setPaso(4)} 
                className="flex-1 bg-[#8B5CF6] disabled:bg-[#333] disabled:text-zinc-600 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#7c3aed] rounded-md transition-colors"
              >
                Confirmar Horario
              </button>
            </div>
          </div>
        )}

        {/* PASO 4: CHECKOUT Y MERCADO PAGO */}
        {paso === 4 && (
          <div className="animate-[fadeIn_0.5s_ease-in-out] max-w-xl mx-auto bg-[#111] border border-[#333] p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-6 text-center">CONFIRMAR RESERVA</h2>
            
            <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 mb-8 space-y-4">
              <div className="flex items-center gap-4 border-b border-[#222] pb-4">
                <img src={artistaSeleccionado?.img} className="w-12 h-12 rounded-full object-cover border border-[#333]" />
                <div>
                  <p className="text-white font-bold">{artistaSeleccionado?.nombre}</p>
                  <p className="text-[10px] text-zinc-500 uppercase">{artistaSeleccionado?.estilo}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Fecha y Hora:</span>
                <span className="text-white font-bold">{fecha} de {NOMBRES_MESES[mesActual]} {anioActual}, {hora}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Costo Estimado Total:</span>
                <span className="text-white font-bold">${costoTotal} USD</span>
              </div>
              <div className="flex justify-between items-center text-sm bg-[#222] p-3 rounded-lg border border-[#333]">
                <span className="text-[#06b6d4] font-bold uppercase tracking-widest text-[10px]">Anticipo a pagar hoy:</span>
                <span className="text-[#06b6d4] font-black text-xl">${anticipo} USD</span>
              </div>
            </div>

            <p className="text-[10px] text-zinc-500 text-center mb-6 px-4">
              Ingresa tus datos de contacto. Al procesar el pago, tu cita quedará confirmada automáticamente en el calendario del artista.
            </p>

            <div className="space-y-3 mb-8">
               <input 
                 type="text" 
                 placeholder="Tu Nombre Completo" 
                 value={nombreCliente}
                 onChange={(e) => setNombreCliente(e.target.value)}
                 className="w-full bg-[#222] border border-[#333] text-white text-sm rounded-lg p-3 outline-none focus:border-[#8B5CF6]"
               />
               <input 
                 type="tel" 
                 placeholder="Tu número de WhatsApp (Ej: +52...)" 
                 value={telefonoCliente}
                 onChange={(e) => setTelefonoCliente(e.target.value)}
                 className="w-full bg-[#222] border border-[#333] text-white text-sm rounded-lg p-3 outline-none focus:border-[#8B5CF6]"
               />
            </div>

            <div className="flex flex-col gap-4">
              {/* BOTÓN DE MERCADO PAGO REAL */}
              <button 
                onClick={procesarPagoMercadoPago} 
                disabled={procesandoPago || !nombreCliente || !telefonoCliente}
                className="w-full bg-[#009EE3] disabled:bg-[#333] disabled:text-zinc-500 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-[#0088cc] transition-colors shadow-lg"
              >
                {procesandoPago ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    PROCESANDO PAGO Y RESERVA...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M14.53 10.37h-1.92v-3.4a.63.63 0 00-.63-.64H8.02a.63.63 0 00-.63.64v7.71h1.92V11.6h1.56l2.18 3.1h2.2l-2.45-3.32a2.03 2.03 0 001.73-2.01z" />
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18.18A8.18 8.18 0 1112 3.82a8.18 8.18 0 010 16.36z" />
                    </svg>
                    PAGAR ANTICIPO CON MERCADO PAGO
                  </>
                )}
              </button>
              
              <button 
                onClick={() => setPaso(3)} 
                disabled={procesandoPago}
                className="w-full py-3 text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors disabled:opacity-50"
              >
                Modificar Fecha
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}