interface Props { onSignup: () => void }

export function Header({ onSignup }: Props) {
  return <header className="site-header"><a className="brand" href={import.meta.env.BASE_URL} aria-label="Learning Vault, início"><span className="brand-mark">L<span>V</span></span><span>LEARNING VAULT</span></a><nav className="header-nav" aria-label="Navegação principal"><a className="header-link" href="#explore">Explorar acervo <span aria-hidden="true">↗</span></a><a className="header-link" href="#posts">Publicações <span aria-hidden="true">↗</span></a><button type="button" className="header-signup" onClick={onSignup}>Receber novidades ↗</button></nav></header>;
}
