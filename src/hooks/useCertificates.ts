import { useMemo } from 'react';
import { loadCertificates } from '../utils/certificateLoader';

export function useCertificates() {
  return useMemo(loadCertificates, []);
}
