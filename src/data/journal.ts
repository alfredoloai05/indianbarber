export const journalItems = [
  {
    slug: 'elegir-corte-segun-rostro-rutina',
    type: 'Cortes',
    title: 'Cómo elegir un corte según tu rostro, cabello y rutina',
    excerpt: 'Qué revisar antes de guardar una referencia y cómo elegir un corte que puedas mantener todos los días.',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=86&w=1800',
    areas: ['barberia'],
  },
  {
    slug: 'cuidar-unas-semipermanentes',
    type: 'Nails',
    title: 'Cómo cuidar tus uñas semipermanentes para que duren más',
    excerpt: 'Hábitos sencillos para proteger el acabado, evitar levantamientos y mantener las uñas en buen estado.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=86&w=1800',
    areas: ['nails'],
  },
  {
    slug: 'mantener-cabello-y-barba',
    type: 'Barbería',
    title: 'Cómo mantener el cabello y la barba entre visitas',
    excerpt: 'Lavado, hidratación, productos y pequeños retoques para conservar mejor la forma del corte y la barba.',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=86&w=1800',
    areas: ['barberia'],
  },
  {
    slug: 'preparar-una-sesion-fotografica',
    type: 'Fotografía',
    title: 'Cómo prepararte para una sesión y verte natural frente a cámara',
    excerpt: 'Vestuario, referencias y pequeños detalles que ayudan a construir una sesión más auténtica.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=86&w=1800',
    areas: ['fotografia'],
  },
  {
    slug: 'prolongar-bienestar-despues-spa',
    type: 'SPA',
    title: 'Cómo prolongar la sensación de bienestar después de tu visita',
    excerpt: 'Hidratación, descanso y cuidados sencillos para acompañar mejor una experiencia de SPA.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=86&w=1800',
    areas: ['spa'],
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
  'preparar-una-sesion-fotografica': [
    'Elige prendas con las que te reconozcas y evita estrenar una imagen que no usarías fuera de la sesión. La comodidad se nota en la postura y en la expresión.',
    'Lleva dos o tres referencias para explicar el tono que buscas, pero permite que la iluminación y la dirección se adapten a ti, al espacio y al uso final de las fotografías.',
    'Descansa, llega con tiempo y confirma antes el formato de entrega. Saber si las fotos serán para redes, perfil profesional o producto ayuda a planificar cada toma.',
  ],
  'prolongar-bienestar-despues-spa': [
    'Después de una experiencia de cuidado, prioriza hidratación y descanso. Evita llenar inmediatamente el resto del día con actividades intensas cuando puedas darte un margen de calma.',
    'Sigue las recomendaciones específicas del profesional sobre productos, temperatura, exposición solar o actividad física según el tratamiento elegido.',
    'La constancia suele aportar más que una intervención aislada. Consulta la frecuencia adecuada para tu objetivo y evita repetir tratamientos sin una valoración previa.',
  ],
};
