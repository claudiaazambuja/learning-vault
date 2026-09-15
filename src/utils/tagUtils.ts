import type { Certificate } from '../types/Certificate';

export interface TagCount { name: string; count: number }

export function getTagCounts(certificates: Certificate[]): TagCount[] {
  const counts = new Map<string, number>();
  for (const certificate of certificates) {
    for (const tag of new Set(certificate.tags)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts].map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'pt-BR'));
}
