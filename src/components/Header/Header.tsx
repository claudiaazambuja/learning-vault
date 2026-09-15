export function Header() {
  return <header className="site-header"><a className="brand" href={import.meta.env.BASE_URL} aria-label="Learning Vault, início"><span className="brand-mark">L<span>V</span></span><span>LEARNING VAULT</span></a><a className="header-link" href="#explore">Explorar acervo <span aria-hidden="true">↗</span></a></header>;
}
