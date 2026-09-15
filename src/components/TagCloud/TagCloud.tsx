import type { TagCount } from '../../utils/tagUtils';

interface Props { tags: TagCount[]; activeTag: string | null; onTagClick: (tag: string | null) => void }

export function TagCloud({ tags, activeTag, onTagClick }: Props) {
  const max = Math.max(1, ...tags.map(tag => tag.count));
  return <div className="tag-cloud" aria-label="Filtrar certificados por área"><button className={`tag tag-all ${activeTag === null ? 'active' : ''}`} type="button" aria-pressed={activeTag === null} onClick={() => onTagClick(null)}>Todos <span aria-hidden="true">↗</span></button>{tags.map((tag, index) => <button key={tag.name} type="button" className={`tag tag-${index % 4} ${activeTag === tag.name ? 'active' : ''}`} style={{ fontSize: `${1 + (tag.count / max) * .22}rem` }} aria-pressed={activeTag === tag.name} onClick={() => onTagClick(tag.name)}>{tag.name}<span className="tag-count">{String(tag.count).padStart(2, '0')}</span></button>)}</div>;
}
