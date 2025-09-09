import { headers } from 'next/headers';

export async function getSubdomain() {
  const host = headers().get('host'); // get host in server-side context

  if (!host) return 'radiance-salon'; // fallback

  if (host.includes('localhost')) {
    // Use a query param fallback for local dev
    return 'radiance-salon';
  }

  // Production: first part of the hostname is subdomain
  return host.split('.')[0];
}
