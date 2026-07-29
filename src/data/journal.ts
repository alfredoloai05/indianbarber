export const journalItems = [
  {
    slug: 'elegir-corte-segun-rostro-rutina',
    type: 'Cortes',
    title: 'Cómo elegir un corte según tu rostro, cabello y rutina',
    excerpt: 'Qué revisar antes de guardar una referencia y cómo elegir un corte que puedas mantener todos los días.',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=86&w=1800',
  },
  {
    slug: 'cuidar-unas-semipermanentes',
    type: 'Nails',
    title: 'Cómo cuidar tus uñas semipermanentes para que duren más',
    excerpt: 'Hábitos sencillos para proteger el acabado, evitar levantamientos y mantener las uñas en buen estado.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=86&w=1800',
  },
  {
    slug: 'mantener-cabello-y-barba',
    type: 'Barbería',
    title: 'Cómo mantener el cabello y la barba entre visitas',
    excerpt: 'Lavado, hidratación, productos y pequeños retoques para conservar mejor la forma del corte y la barba.',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=86&w=1800',
  },
] as const;

export const journalBodies: Record<string, string[]> = {
  'elegir-corte-segun-rostro-rutina': [
    'Empieza por tu tipo de cabello. La misma referencia cambia por completo cuando se trabaja sobre cabello liso, ondulado, rizado, fino o con mucha densidad.',
    'También importa cuánto tiempo quieres dedicar al peinado. Un corte que exige secador, producto y retoques diarios no es la mejor elección cuando buscas algo rápido de mantener.',
    'Lleva referencias, pero conversa con el barbero sobre crecimiento, remolinos, forma del rostro y frecuencia de visita. Así la idea se adapta a ti y no al revés.',
  ],
  'cuidar-unas-semipermanentes': [
    'Durante las primeras horas evita golpes, presión excesiva y contacto prolongado con agua muy caliente. Aunque el esmalte esté curado, el cuidado inicial ayuda a proteger bordes y sellado.',
    'Usa guantes para limpieza y productos químicos. Mantener las manos hidratadas y aplicar aceite de cutícula ayuda a conservar una apariencia más limpia alrededor de la uña.',
    'No retires el producto levantándolo con los dedos. El retiro profesional evita debilitar capas de la uña natural y permite revisar su estado antes de una nueva aplicación.',
  ],
  'mantener-cabello-y-barba': [
    'Lava el cabello según tu tipo de cuero cabelludo y evita usar demasiado producto. Una pequeña cantidad bien distribuida suele dar mejor forma que acumular capas durante el día.',
    'En la barba, la limpieza y la hidratación ayudan a reducir resequedad y desorden. Peina siguiendo el crecimiento y utiliza aceite o bálsamo cuando el largo lo necesite.',
    'Cuando el contorno pierde definición o el corte cambia de forma, es mejor agendar un mantenimiento que intentar corregir líneas importantes en casa.',
  ],
};
