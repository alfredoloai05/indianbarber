import type { SpacePageContent, SocialLink } from '../content/useSiteContent';

export const indianSocialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/indianclubec' },
  { label: 'TikTok', href: 'https://tiktok.com/@indianclubec' },
  { label: 'Facebook', href: 'https://www.facebook.com/Indianclubec' },
  { label: 'Todas las redes', href: 'https://linktr.ee/indianclubec' },
];

export const spacePages: SpacePageContent[] = [
  {
    id: 'barberia',
    title: 'Barbería Indian.',
    lead: 'Corte, barba, afeitado, combos y detalles pensados para sostener tu estilo fuera de la silla.',
    servicesTitle: 'Elige cómo quieres verte.',
    teamTitle: 'El equipo detrás de cada acabado.',
    styleBookTitle: 'Resultados de barbería, sin referencias genéricas.',
    adviceTitle: 'Cuida mejor el corte y la barba entre visitas.',
    benefitsTitle: 'Beneficios para volver con intención.',
    inquiryTitle: 'Habla con Barbería Indian.',
    inquiryLead: 'Cuéntanos qué quieres cambiar, qué referencia tienes o qué duda necesitas resolver.',
    benefits: [
      { title: 'Combos dentro de Barbería', description: 'Cabello, barba, cejas y limpieza facial pueden resolverse en una misma visita.' },
      { title: 'Reserva con contexto', description: 'Elige servicio, profesional, fecha y hora antes de enviar la solicitud.' },
      { title: 'Mantenimiento claro', description: 'Recibe recomendaciones para sostener mejor la forma y el acabado.' },
    ],
  },
  {
    id: 'fotografia',
    title: 'Estudio Fotográfico Indian.',
    lead: 'Retratos, marca personal, contenido para redes y producto dentro de una experiencia dirigida.',
    servicesTitle: 'Elige qué necesitas comunicar.',
    teamTitle: 'Dirección y producción para tu sesión.',
    styleBookTitle: 'Imágenes que muestran intención, no poses vacías.',
    adviceTitle: 'Llega mejor preparado a tu próxima sesión.',
    benefitsTitle: 'Una sesión pensada para el uso real de tus imágenes.',
    inquiryTitle: 'Cuéntanos la idea de tu sesión.',
    inquiryLead: 'Indica si buscas retrato, marca personal, contenido o producto y te ayudamos a definir el formato.',
    benefits: [
      { title: 'Dirección durante la sesión', description: 'Acompañamiento para postura, expresión y construcción de cada toma.' },
      { title: 'Dentro de Indian House', description: 'Puedes combinar fotografía con barbería, nails o preparación previa.' },
      { title: 'Propuesta según objetivo', description: 'La sesión se plantea según dónde y cómo utilizarás las imágenes.' },
    ],
  },
  {
    id: 'nails',
    title: 'Nails Studio Indian.',
    lead: 'Manicura, pedicura y sistemas semipermanentes con preparación, higiene y acabado profesional.',
    servicesTitle: 'Elige el acabado y el cuidado que necesitas.',
    teamTitle: 'Técnica y detalle en cada proceso.',
    styleBookTitle: 'Diseños y acabados para encontrar tu referencia.',
    adviceTitle: 'Cuida mejor tus uñas entre una cita y la siguiente.',
    benefitsTitle: 'Beneficios para manos, pies y mantenimiento.',
    inquiryTitle: 'Haz una consulta a Nails Studio.',
    inquiryLead: 'Envíanos tu idea, referencia o duda sobre el sistema que mejor se adapta a tus uñas.',
    benefits: [
      { title: 'Preparación e higiene', description: 'Cada servicio parte del estado de la uña y del resultado que quieres mantener.' },
      { title: 'Opciones para manos y pies', description: 'Manicura, pedicura, semipermanente, base rubber, Soft Gel y retiro.' },
      { title: 'Reserva directa con Nails', description: 'La consulta y la cita llegan identificadas con el área seleccionada.' },
    ],
  },
  {
    id: 'spa',
    title: 'SPA Indian.',
    lead: 'Experiencias de bienestar, relajación y cuidado personal coordinadas según tu objetivo.',
    servicesTitle: 'Elige el momento de cuidado que buscas.',
    teamTitle: 'Atención preparada para cada experiencia.',
    styleBookTitle: 'Una mirada al ambiente y al cuidado detrás del SPA.',
    adviceTitle: 'Prolonga el bienestar después de tu visita.',
    benefitsTitle: 'Beneficios para bajar el ritmo y cuidarte mejor.',
    inquiryTitle: 'Consulta con el equipo SPA.',
    inquiryLead: 'Cuéntanos qué experiencia buscas y te orientamos según tratamientos y disponibilidad.',
    benefits: [
      { title: 'Valoración previa', description: 'La experiencia se coordina según tus necesidades y el servicio disponible.' },
      { title: 'Tiempo dedicado al cuidado', description: 'Rituales faciales, relajación y opciones personalizadas con reserva previa.' },
      { title: 'Orientación directa', description: 'Resuelve dudas por WhatsApp antes de seleccionar la fecha y hora.' },
    ],
  },
];
