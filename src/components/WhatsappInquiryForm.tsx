import { type FormEvent, useState } from 'react';
import { useGlobalSettings } from '../content/useSiteContent';

type WhatsappInquiryFormProps = {
  title: string;
  lead: string;
  context?: string;
  compact?: boolean;
};

export function WhatsappInquiryForm({ title, lead, context = 'Indian House', compact = false }: WhatsappInquiryFormProps) {
  const settings = useGlobalSettings();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = [
      `Hola, envío una consulta desde la web de ${settings.brandName}.`,
      `Área: ${context}`,
      `Nombre: ${name.trim()}`,
      `Teléfono: ${phone.trim()}`,
      `Mensaje: ${message.trim()}`,
    ].join('\n');
    const separator = settings.whatsappHref.includes('?') ? '&' : '?';
    window.open(`${settings.whatsappHref}${separator}text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={`whatsapp-inquiry${compact ? ' whatsapp-inquiry--compact' : ''}`}>
      <div className="whatsapp-inquiry__copy">
        <h2>{title}</h2>
        <p>{lead}</p>
      </div>
      <form className="whatsapp-inquiry__form" onSubmit={submit}>
        <label>
          <span>Nombre</span>
          <input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Tu nombre" />
        </label>
        <label>
          <span>Teléfono</span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
            inputMode="tel"
            placeholder="Tu número de contacto"
          />
        </label>
        <label className="whatsapp-inquiry__message">
          <span>Mensaje</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            rows={compact ? 3 : 5}
            placeholder={`Escribe tu consulta sobre ${context}`}
          />
        </label>
        <button type="submit">Enviar por WhatsApp ↗</button>
      </form>
    </section>
  );
}
