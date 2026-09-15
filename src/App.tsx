import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Certificate } from './types/Certificate';
import { useCertificates } from './hooks/useCertificates';
import { getTagCounts } from './utils/tagUtils';
import { Header } from './components/Header/Header';
import { Profile } from './components/Profile/Profile';
import { TagCloud } from './components/TagCloud/TagCloud';
import { CertificateSlider } from './components/CertificateSlider/CertificateSlider';
import { CertificateModal } from './components/CertificateModal/CertificateModal';
import { Footer } from './components/Footer/Footer';
import { FeaturedPosts } from './components/FeaturedPosts/FeaturedPosts';
import { NewsSignup } from './components/NewsSignup/NewsSignup';

function readTag() { return new URLSearchParams(window.location.search).get('tag'); }

export default function App() {
  const certificates = useCertificates();
  const tags = useMemo(() => getTagCounts(certificates), [certificates]);
  const [activeTag, setActiveTag] = useState<string | null>(readTag);
  const [details, setDetails] = useState<Certificate | null>(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const closeDetails = useCallback(() => setDetails(null), []);
  const filteredCertificates = useMemo(() => activeTag === null ? certificates : certificates.filter(certificate => certificate.tags.includes(activeTag)), [activeTag, certificates]);
  const institutions = useMemo(() => new Set(certificates.map(certificate => certificate.institution)).size, [certificates]);
  useEffect(() => { const onPopState = () => setActiveTag(readTag()); window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState); }, []);
  function selectTag(tag: string | null) {
    setActiveTag(tag);
    const url = new URL(window.location.href);
    if (tag) url.searchParams.set('tag', tag); else url.searchParams.delete('tag');
    window.history.pushState({}, '', url);
  }
  return <div id="top"><Header onSignup={() => setSignupOpen(true)} /><main><Profile /><section id="explore" className="explore" aria-labelledby="explore-title"><div className="explore-intro"><div><p className="eyebrow">01 / EXPLORE MEU APRENDIZADO</p><h2 id="explore-title">Cada aprendizado<br />é um degrau.<br /><em>Cada degrau me torna uma profissional melhor.</em></h2></div><p>Escolha uma perspectiva para navegar pelas experiências que formam minha trajetória profissional.</p></div><div className="stats" aria-label="Resumo do acervo"><div><strong>{String(certificates.length).padStart(2, '0')}</strong><span>certificados</span></div><div><strong>{String(tags.length).padStart(2, '0')}</strong><span>áreas de conhecimento</span></div><div><strong>{String(institutions).padStart(2, '0')}</strong><span>instituições</span></div></div><TagCloud tags={tags} activeTag={activeTag} onTagClick={selectTag} /></section><CertificateSlider certificates={filteredCertificates} activeTag={activeTag} onDetails={setDetails} /><FeaturedPosts /><section className="news-cta" aria-labelledby="news-cta-title"><div><p className="eyebrow">04 / CONTINUE ACOMPANHANDO</p><h2 id="news-cta-title">O próximo capítulo<br /><em>começa aqui.</em></h2><p>Novidades sobre indústria, tecnologia e ideias que vale a pena compartilhar.</p></div><button type="button" onClick={() => setSignupOpen(true)}>Receber novidades <span aria-hidden="true">↗</span></button></section></main><Footer /><CertificateModal certificate={details} onClose={closeDetails} /><NewsSignup open={signupOpen} onClose={() => setSignupOpen(false)} /></div>;
}
