interface Post {
  id: string;
  category: string;
  title: string;
  summary: string;
  source: string;
  platform: string;
  url: string;
  metrics?: { value: string; label: string }[];
}

const modules = import.meta.glob<Post>('../../content/posts/**/metadata.json', {
  eager: true,
  import: 'default',
});
const posts = Object.values(modules);

export function FeaturedPosts() {
  if (!posts.length) return null;
  return <section id="posts" className="featured-posts" aria-labelledby="posts-title"><div className="posts-inner"><div className="newspaper-masthead"><span>LEARNING VAULT / LEITURAS</span><span>IDEIAS • TECNOLOGIA • EXPERIÊNCIA</span></div><div className="posts-heading"><div><p className="eyebrow">03 / NO RADAR</p><h2 id="posts-title">Posts em <em>destaque.</em></h2></div><p>Histórias e ideias que conectam tecnologia, aprendizado e resultados no mundo real.</p></div><div className="post-grid">{posts.map((post, index) => <article className="featured-post" key={post.id}><div className="post-number">{String(index + 1).padStart(2, '0')} / {post.category}</div><div className="post-editorial"><div className="post-story"><p className="post-kicker">PUBLICAÇÃO EM DESTAQUE</p><h3>{post.title}</h3><p className="post-summary">{post.summary}</p><div className="post-byline"><span>Publicado por <strong>{post.source}</strong> no {post.platform}</span><a href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`Ler publicação de ${post.source} no ${post.platform}`}>Ler publicação completa <span aria-hidden="true">↗</span></a></div></div>{post.metrics && <aside className="post-facts" aria-label="Dados destacados na publicação"><p>OS NÚMEROS DA HISTÓRIA</p>{post.metrics.map(metric => <div key={metric.value}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</aside>}</div></article>)}</div></div></section>;
}
