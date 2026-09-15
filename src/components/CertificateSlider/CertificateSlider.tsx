import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { Certificate } from '../../types/Certificate';
import { CertificateCard } from '../CertificateCard/CertificateCard';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props { certificates: Certificate[]; activeTag: string | null; onDetails: (certificate: Certificate) => void }

export function CertificateSlider({ certificates, activeTag, onDetails }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [index, setIndex] = useState(0);
  const title = activeTag ?? 'Todos os certificados';
  return <section className="collection" aria-labelledby="collection-title"><div className="collection-head"><div><p className="eyebrow">O ACERVO</p><h2 id="collection-title">{title}<span className="hero-period">.</span></h2><p className="collection-count">{certificates.length} {certificates.length === 1 ? 'certificado' : 'certificados'}</p></div><div className="slider-controls"><span className="slide-count" aria-live="polite">{certificates.length ? index + 1 : 0} <span>de</span> {certificates.length}</span><button type="button" aria-label="Certificado anterior" onClick={() => swiper?.slidePrev()} disabled={!certificates.length}>←</button><button type="button" aria-label="Próximo certificado" onClick={() => swiper?.slideNext()} disabled={!certificates.length}>→</button></div></div>{certificates.length ? <Swiper key={activeTag ?? 'all'} modules={[A11y, Pagination]} a11y={{ enabled: true }} pagination={{ clickable: true }} spaceBetween={24} slidesPerView={1} breakpoints={{ 760: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }} onSwiper={instance => { setSwiper(instance); setIndex(0); }} onSlideChange={instance => setIndex(instance.activeIndex)} className="certificate-swiper">{certificates.map(certificate => <SwiperSlide key={certificate.id}><CertificateCard certificate={certificate} onDetails={onDetails} /></SwiperSlide>)}</Swiper> : <p className="empty-state">Nenhum certificado encontrado para esta categoria.</p>}</section>;
}
