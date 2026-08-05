export function bookingPath(area?: string, service?: string) {
  const params = new URLSearchParams();

  if (area) params.set('area', area);
  if (service) params.set('service', service);

  const query = params.toString();
  return `/reservar${query ? `?${query}` : ''}`;
}
