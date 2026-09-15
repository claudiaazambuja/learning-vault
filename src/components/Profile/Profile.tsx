import profile from '../../data/profile.json';

export function Profile() {
  return <section className="hero" aria-labelledby="profile-name"><div className="hero-inner"><p className="eyebrow"><span className="eyebrow-line" /> UM PORTFÓLIO DE APRENDIZADO</p><h1 id="profile-name">{profile.name}<span className="hero-period">.</span></h1><p className="hero-headline">{profile.headline}</p><p className="hero-summary">{profile.summary}</p><a href="#explore" className="hero-cta">Explore minha trajetória <span aria-hidden="true">↘</span></a></div><div className="hero-decoration" aria-hidden="true"><span>EVOLUIR</span><span>APRENDER</span><span>COMPARTILHAR</span></div></section>;
}
