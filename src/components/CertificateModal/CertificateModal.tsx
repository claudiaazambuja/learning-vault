import { useEffect, useRef } from 'react';
import type { Certificate } from '../../types/Certificate';
import { resolvePublicPath } from '../../utils/publicPath';

interface Props { certificate: Certificate | null; onClose: () => void }

export function CertificateModal({ certificate, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!certificate) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const focusables = [...document.querySelectorAll<HTMLElement>('.modal-panel a, .modal-panel button')];
        const first = focusables[0]; const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; previousFocus?.focus(); };
  }, [certificate, onClose]);
  if (!certificate) return null;
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button ref={closeRef} type="button" className="modal-close" onClick={onClose} aria-label="Fechar detalhes">×</button><p className="eyebrow">DETALHES DO CERTIFICADO</p><h2 id="modal-title">{certificate.title}</h2><dl><div><dt>Instituição</dt><dd>{certificate.institution}</dd></div><div><dt>Ano</dt><dd>{certificate.year}</dd></div>{certificate.date && <div><dt>Data</dt><dd>{certificate.date}</dd></div>}<div><dt>Descrição</dt><dd>{certificate.summary}</dd></div><div><dt>Áreas</dt><dd>{certificate.tags.join(' · ')}</dd></div>{certificate.credentialCode && <div><dt>Código da credencial</dt><dd>{certificate.credentialCode}</dd></div>}{certificate.credentialUrl && <div><dt>Credencial</dt><dd><a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">Ver credencial ↗</a></dd></div>}</dl><a className="modal-pdf" href={resolvePublicPath(certificate.certificate)} target="_blank" rel="noopener noreferrer">Abrir PDF <span aria-hidden="true">↗</span></a></div></div>;
}
