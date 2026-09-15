import type { Certificate } from '../../types/Certificate';
import { resolvePublicPath } from '../../utils/publicPath';

interface Props { certificate: Certificate; onDetails: (certificate: Certificate) => void }

export function CertificateCard({ certificate, onDetails }: Props) {
  return <article className="certificate-card"><div className="certificate-image-wrap"><img src={resolvePublicPath(certificate.preview)} alt={`Prévia do certificado ${certificate.title}`} loading="lazy" /><span className="certificate-image-label">CERTIFICADO / {certificate.year}</span></div><div className="certificate-body"><div className="certificate-meta"><span>{certificate.institution}</span><span>{certificate.year}</span></div><h3>{certificate.title}</h3><p className="certificate-summary">{certificate.summary}</p><div className="certificate-tags">{certificate.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="certificate-actions"><a href={resolvePublicPath(certificate.certificate)} target="_blank" rel="noopener noreferrer" className="certificate-primary">Ver certificado <span aria-hidden="true">↗</span></a><button type="button" onClick={() => onDetails(certificate)} className="certificate-details">Detalhes</button></div></div></article>;
}
