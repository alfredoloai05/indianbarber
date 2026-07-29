export const bookingUrl = import.meta.env.VITE_BOOKING_URL || 'https://indianclubec.com/citas';

export const brand = {
  name: 'Indian Club',
  campaign: 'House of Presence',
  logoMark: 'https://content.app-sources.com/s/249321345646214611/uploads/Images/Logo_Indian_Club-7891806.png?format=webp',
  logoLockup: 'https://content.app-sources.com/s/249321345646214611/uploads/NUEVO_LOGO/2-2400470.png?format=webp',
  red: '#e31b2d',
  blue: '#0878b9',
};

export const contact = {
  phone: '07 272 6042',
  phoneHref: 'tel:+59372726042',
  whatsapp: '+593 96 383 6857',
  whatsappHref: 'https://api.whatsapp.com/send?phone=593963836857',
  email: 'indianbarberia@gmail.com',
  emailHref: 'mailto:indianbarberia@gmail.com',
  address: '24 de Mayo y José Antonio Eguiguren',
  city: 'Loja 110102, Ecuador',
  mapHref: 'https://www.google.com/maps/search/?api=1&query=24+de+Mayo+%26+Jose+Antonio+Eguiguren+Loja+Ecuador',
  hours: [
    { days: 'Lunes a sábado', value: '09h00 — 21h00' },
    { days: 'Domingo', value: '10h00 — 14h00' },
  ],
};

export const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Equipo', to: '/equipo' },
  { label: 'La casa', to: '/club' },
  { label: 'Style Book', to: '/style-book' },
  { label: 'Inspírate', to: '/inspirate' },
  { label: 'Contacto', to: '/contacto' },
];

export const media = {
  hero: 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2623-4450906.jpg?format=webp',
  barber: 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2597-4450906.png?format=webp',
  barberAlt: 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2212-4450905.jpg?format=webp',
  tattoo: 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_1156-4450899.jpg?format=webp',
  nails: 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_9109.JPG-4450892.jpeg?format=webp',
  cafe: 'https://images.unsplash.com/photo-1780398645489-85968d809196?auto=format&fit=crop&q=82&w=1800',
  exterior: 'https://images.unsplash.com/photo-1771865600306-d4ef4c06ae16?auto=format&fit=crop&q=82&w=1800',
  parking: 'https://content.app-sources.com/s/249321345646214611/uploads/El_centro/7bd8d8dc-a404-4fa3-ba04-0420ee94de1d-8326539.jpeg?format=webp',
};

export const stats = [
  { value: '+7', label: 'años de experiencia' },
  { value: '4.7', label: 'estrellas en más de 420 reseñas' },
  { value: '+100k', label: 'clientes atendidos' },
];

export const services = [
  {
    slug: 'corte-de-autor',
    number: '01',
    title: 'Corte de cabello',
    kicker: 'Forma, textura y mantenimiento.',
    detail:
      'Corte profesional con lectura de rostro, textura y rutina. Incluye exfoliación facial, masaje, lavado de cuero cabelludo y peinado.',
    duration: '45–60 min',
    signature: 'Precisión visible',
    price: 'USD 10',
    image: media.barber,
    imageAlt: 'Corte realizado por Indian Club dentro de su local en Loja',
    ritual: ['Diagnóstico y referencia', 'Corte y estructura', 'Lavado, peinado y recomendación'],
    inclusions: ['Exfoliación facial', 'Masaje', 'Lavado', 'Peinado'],
  },
  {
    slug: 'barba-ritual',
    number: '02',
    title: 'Barba y afeitado',
    kicker: 'Contorno, calor y cuidado.',
    detail:
      'Perfilado preciso, afeitado clásico o trabajo con cera caliente para definir facciones y cuidar la piel sin rigidez.',
    duration: '30–45 min',
    signature: 'Detalle sereno',
    price: 'Desde USD 6',
    image: media.barberAlt,
    imageAlt: 'Resultado de barbería realizado en Indian Club',
    ritual: ['Lectura de crecimiento', 'Preparación de piel', 'Contorno, afeitado y cierre'],
    inclusions: ['Toallas calientes', 'Perfilado', 'Cuidado de piel', 'Acabado'],
  },
  {
    slug: 'combos-indian',
    number: '03',
    title: 'Combos Indian',
    kicker: 'Una sesión. Una lectura completa.',
    detail:
      'Corte Essential, Premium, Pro y Servicio VIP para resolver cabello, barba, piel y detalles en una sola visita.',
    duration: '60–100 min',
    signature: 'Ritual completo',
    price: 'Desde USD 14',
    image: media.hero,
    imageAlt: 'Cliente dentro de Indian Club después de un servicio de barbería',
    ritual: ['Consulta integral', 'Servicio combinado', 'Styling y cuidado posterior'],
    inclusions: ['Cabello', 'Barba o cejas', 'Opciones de limpieza facial', 'Bebida en servicio VIP'],
  },
  {
    slug: 'nails-studio',
    number: '04',
    title: 'Nails Studio',
    kicker: 'Cuidado preciso de manos y pies.',
    detail:
      'Manicura, pedicura, semipermanente, base rubber y Soft Gel realizados con técnica, higiene y un acabado limpio.',
    duration: 'Según servicio',
    signature: 'Cuidado en detalle',
    price: 'Consultar disponibilidad',
    image: media.nails,
    imageAlt: 'Diseño de uñas realizado por Indian Club Nails Studio',
    ritual: ['Evaluación y elección', 'Preparación e higiene', 'Aplicación y cuidado final'],
    inclusions: ['Manicura', 'Pedicura', 'Semipermanente', 'Soft Gel'],
  },
  {
    slug: 'tattoo-studio',
    number: '05',
    title: 'Tattoo Studio',
    kicker: 'Idea, trazo y permanencia.',
    detail:
      'Cotización, conversación creativa y ejecución responsable para convertir una idea en una pieza con intención y cuidado posterior.',
    duration: 'Según pieza',
    signature: 'Lenguaje propio',
    price: 'Cotización gratuita',
    image: media.tattoo,
    imageAlt: 'Tatuaje realizado por Indian Club Tattoo Studio',
    ritual: ['Brief y cotización', 'Diseño y preparación', 'Ejecución y guía de cuidado'],
    inclusions: ['Cotización', 'Diseño', 'Preparación higiénica', 'Guía posterior'],
  },
  {
    slug: 'servicios-especiales',
    number: '06',
    title: 'Servicios especiales',
    kicker: 'Pequeños detalles que cambian el conjunto.',
    detail:
      'Cejas, depilación con cera, lifting, tinturado de barba, rizos, limpieza facial y peinado para completar el ritual.',
    duration: '15–60 min',
    signature: 'Acabado consciente',
    price: 'Desde USD 3',
    image: media.exterior,
    imageAlt: 'Atmósfera nocturna de un espacio de cuidado personal',
    ritual: ['Seleccionar complemento', 'Preparación', 'Aplicación y recomendaciones'],
    inclusions: ['Cejas', 'Cera', 'Lifting', 'Limpieza facial'],
  },
];

export const team = [
  {
    name: 'René Chamba',
    role: 'CEO de Indian Club',
    statement: 'Lidera Indian Club y su propuesta de barbería, tattoo y nails en Loja.',
    image: 'https://content.app-sources.com/s/249321345646214611/uploads/El_centro/equipo_indian_club_1-8394408.png?format=webp',
  },
  {
    name: 'César Castejón',
    role: 'Tatuador especializado en diseños personalizados',
    statement: 'Convierte ideas personales en piezas trabajadas con conversación, criterio y cuidado.',
    image: 'https://content.app-sources.com/s/249321345646214611/uploads/El_centro/equipo_indian_club_5-8394408.png?format=webp',
  },
  {
    name: 'Alisson Ruiz',
    role: 'Manicurista experta en uñas acrílicas y esculpidas',
    statement: 'Trabaja técnica, higiene y detalle para construir resultados con identidad propia.',
    image: 'https://content.app-sources.com/s/249321345646214611/thumbnails/640x480/El_centro/equipo_indian_club_6-8394408.png?format=webp',
  },
  {
    name: 'Santiago Vivanco',
    role: 'Barbero experto en cortes y perfilado de barba',
    statement: 'Lee forma y crecimiento antes de ejecutar un corte que pueda sostenerse fuera de la silla.',
    image: 'https://content.app-sources.com/s/249321345646214611/uploads/El_centro/equipo_indian_club_2-8394408.png?format=webp',
  },
  {
    name: 'Adrián Pardo',
    role: 'Barbero experto en cortes y perfilado de barba',
    statement: 'Cuida proporción, textura y acabado para que cada resultado se sienta propio.',
    image: 'https://content.app-sources.com/s/249321345646214611/thumbnails/640x480/El_centro/equipo_indian_club_8-8394407.png?format=webp',
  },
];

export const promotions = [
  {
    eyebrow: 'Primera visita',
    title: '20% en tu primer servicio de tattoo o nails',
    note: 'Disponible para nuevos clientes y sujeto a preconfirmación del centro.',
  },
  {
    eyebrow: 'Martes',
    title: '3 × 2 en servicios de barbería',
    note: 'Puedes compartirlo con dos amigos o combinar tres servicios para ti.',
  },
  {
    eyebrow: 'Jueves',
    title: '20% para universitarios',
    note: 'Presenta tu carnet antes de iniciar el servicio.',
  },
  {
    eyebrow: 'Tu cumpleaños',
    title: '15% de descuento',
    note: 'Disponible todos los días y sujeto a validación del centro.',
  },
];

export const journalItems = [
  {
    slug: 'corte-que-dura-tres-semanas',
    number: '01',
    type: 'Guía',
    title: 'Cómo elegir un corte que funcione también dentro de tres semanas',
    excerpt: 'Una guía para pensar en caída, mantenimiento y rutina antes de elegir una referencia.',
    image: media.barber,
  },
  {
    slug: 'diagnostico-antes-del-corte',
    number: '02',
    type: 'Oficio',
    title: 'Lo que un buen diagnóstico revela antes del primer corte',
    excerpt: 'Rostro, textura, hábitos y contexto: la conversación que evita decisiones genéricas.',
    image: media.barberAlt,
  },
  {
    slug: 'cafe-conversacion-y-ritmo',
    number: '03',
    type: 'Casa',
    title: 'Café, conversación y el valor de bajar el ritmo',
    excerpt: 'Por qué Indian Club se diseña como un lugar para llegar, no solo como una cita que cumplir.',
    image: media.cafe,
  },
];

export const ritualSteps = [
  ['Escuchar', 'Antes de tocar una herramienta, entendemos contexto, rutina y lo que necesitas comunicar.'],
  ['Construir', 'Técnica, proporción y detalle convierten la intención en una forma precisa.'],
  ['Cerrar', 'Revisamos, afinamos y dejamos claro cómo sostener el resultado fuera de Indian.'],
  ['Volver', 'La relación continúa con memoria, recomendación y un próximo momento sin fricción.'],
];
