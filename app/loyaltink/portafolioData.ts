// portafolioData.ts

export type EstiloTatuaje = 
  | 'Fusión Neo-Japonesa' 
  | 'Biomecánica' 
  | 'Realismo Épico' 
  | 'Realismo Cyberpunk' 
  | 'Blackwork' 
  | 'Proyectos a Gran Escala';

export interface Tatuaje {
  id: string;
  url: string;
  artista: string;
  estilos: EstiloTatuaje[];
}

export const galeriaTatuajes: Tatuaje[] = [
  // === PORTAFOLIO DE PRANA ===
  { id: 'p1', url: '/loyaltink/portafolio_prana/dise_prana1.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala'] },
  { id: 'p2', url: '/loyaltink/portafolio_prana/dise_prana2.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p3', url: '/loyaltink/portafolio_prana/dise_prana3.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala'] },
  { id: 'p4', url: '/loyaltink/portafolio_prana/dise_prana4.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p5', url: '/loyaltink/portafolio_prana/dise_prana5.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p6', url: '/loyaltink/portafolio_prana/dise_prana6.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p7', url: '/loyaltink/portafolio_prana/dise_prana7.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala', 'Blackwork'] },
  { id: 'p8', url: '/loyaltink/portafolio_prana/dise_prana8.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala', 'Blackwork'] },
  { id: 'p9', url: '/loyaltink/portafolio_prana/dise_prana9.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p10', url: '/loyaltink/portafolio_prana/dise_prana10.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala', 'Blackwork'] },
  { id: 'p11', url: '/loyaltink/portafolio_prana/dise_prana11.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala'] },
  { id: 'p12', url: '/loyaltink/portafolio_prana/dise_prana12.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala'] },
  { id: 'p13', url: '/loyaltink/portafolio_prana/dise_prana13.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p14', url: '/loyaltink/portafolio_prana/dise_prana14.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala'] },
  { id: 'p15', url: '/loyaltink/portafolio_prana/dise_prana15.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala', 'Blackwork'] },
  { id: 'p16', url: '/loyaltink/portafolio_prana/dise_prana16.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala'] },
  { id: 'p17', url: '/loyaltink/portafolio_prana/dise_prana17.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p18', url: '/loyaltink/portafolio_prana/dise_prana18.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p19', url: '/loyaltink/portafolio_prana/dise_prana19.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala'] },
  { id: 'p20', url: '/loyaltink/portafolio_prana/dise_prana20.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p21', url: '/loyaltink/portafolio_prana/dise_prana21.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p22', url: '/loyaltink/portafolio_prana/dise_prana22.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala'] },
  { id: 'p23', url: '/loyaltink/portafolio_prana/dise_prana23.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala'] },
  { id: 'p24', url: '/loyaltink/portafolio_prana/dise_prana24.jpg', artista: 'Prana', estilos: ['Proyectos a Gran Escala'] },
  { id: 'p25', url: '/loyaltink/portafolio_prana/dise_prana25.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p26', url: '/loyaltink/portafolio_prana/dise_prana26.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p27', url: '/loyaltink/portafolio_prana/dise_prana27.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p28', url: '/loyaltink/portafolio_prana/dise_prana28.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },
  { id: 'p29', url: '/loyaltink/portafolio_prana/dise_prana29.jpg', artista: 'Prana', estilos: ['Realismo Épico'] },

  // === PORTAFOLIO DE BORIS ===
  { id: 'b1', url: '/loyaltink/portafolio_boris/dise_boris1.jpg', artista: 'Boris', estilos: ['Realismo Cyberpunk'] },
  { id: 'b2', url: '/loyaltink/portafolio_boris/dise_boris2.jpg', artista: 'Boris', estilos: ['Realismo Cyberpunk'] },
  { id: 'b3', url: '/loyaltink/portafolio_boris/dise_boris3.jpg', artista: 'Boris', estilos: ['Realismo Cyberpunk'] },
  { id: 'b4', url: '/loyaltink/portafolio_boris/dise_boris4.jpg', artista: 'Boris', estilos: ['Realismo Cyberpunk'] },
  { id: 'b5', url: '/loyaltink/portafolio_boris/dise_boris5.jpg', artista: 'Boris', estilos: ['Realismo Cyberpunk'] },
  { id: 'b6', url: '/loyaltink/portafolio_boris/dise_boris6.jpg', artista: 'Boris', estilos: ['Realismo Cyberpunk'] },
  { id: 'b7', url: '/loyaltink/portafolio_boris/dise_boris7.jpg', artista: 'Boris', estilos: ['Realismo Cyberpunk'] },
  { id: 'b8', url: '/loyaltink/portafolio_boris/dise_boris8.jpg', artista: 'Boris', estilos: ['Realismo Épico'] },
  { id: 'b9', url: '/loyaltink/portafolio_boris/dise_boris9.jpg', artista: 'Boris', estilos: ['Realismo Cyberpunk'] },
  { id: 'b10', url: '/loyaltink/portafolio_boris/dise_boris10.jpg', artista: 'Boris', estilos: ['Realismo Cyberpunk'] },
  { id: 'b11', url: '/loyaltink/portafolio_boris/dise_boris11.jpg', artista: 'Boris', estilos: ['Proyectos a Gran Escala', 'Realismo Épico'] },
  { id: 'b12', url: '/loyaltink/portafolio_boris/dise_boris12.jpg', artista: 'Boris', estilos: ['Realismo Cyberpunk'] },
  { id: 'b13', url: '/loyaltink/portafolio_boris/dise_boris13.jpg', artista: 'Boris', estilos: ['Realismo Épico'] },
  { id: 'b14', url: '/loyaltink/portafolio_boris/dise_boris14.jpg', artista: 'Boris', estilos: ['Proyectos a Gran Escala', 'Realismo Cyberpunk'] },
  { id: 'b15', url: '/loyaltink/portafolio_boris/dise_boris15.jpg', artista: 'Boris', estilos: ['Proyectos a Gran Escala', 'Realismo Cyberpunk'] },
  { id: 'b16', url: '/loyaltink/portafolio_boris/dise_boris16.jpg', artista: 'Boris', estilos: ['Realismo Cyberpunk'] },
  { id: 'b17', url: '/loyaltink/portafolio_boris/dise_boris17.jpg', artista: 'Boris', estilos: ['Realismo Épico'] },
  { id: 'b18', url: '/loyaltink/portafolio_boris/dise_boris18.jpg', artista: 'Boris', estilos: ['Realismo Épico'] },
  { id: 'b19', url: '/loyaltink/portafolio_boris/dise_boris19.jpg', artista: 'Boris', estilos: ['Realismo Cyberpunk'] },
];