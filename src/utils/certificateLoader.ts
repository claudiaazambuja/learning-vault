import type { Certificate } from '../types/Certificate';

const modules = import.meta.glob<Certificate>('../content/certificates/**/metadata.json', {
  eager: true,
  import: 'default',
});

export function loadCertificates(): Certificate[] {
  return Object.values(modules).sort((a, b) => {
    const aDate = a.date ?? String(a.year);
    const bDate = b.date ?? String(b.year);
    return bDate.localeCompare(aDate) || a.title.localeCompare(b.title);
  });
}
