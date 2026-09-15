import profile from '../../data/profile.json';

export function Profile() {
  return <section className="hero" aria-labelledby="profile-name"><div className="hero-inner"><p className="eyebrow"><span className="eyebrow-line" /> UM PORTFÓLIO DE APRENDIZADO</p><h1 id="profile-name">{profile.name}<span className="hero-period">.</span></h1><p className="hero-headline">{profile.headline}</p><p className="hero-summary">{profile.summary}</p><div className="hero-links"><a href="#explore" className="hero-cta">Explore minha trajetória <span aria-hidden="true">↘</span></a><a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div><div className="hero-decoration" aria-hidden="true"><span>Instituições</span><span>Produto</span><span>Tecnologias</span></div></section>;
}
