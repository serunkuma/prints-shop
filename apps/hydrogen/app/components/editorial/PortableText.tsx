interface PortableTextProps {
  blocks: any[];
}

function renderBlock(block: any) {
  switch (block._type) {
    case 'block':
      return renderBlockContent(block);
    case 'imageBlock':
      return (
        <figure className="my-8">
          <img
            src={block.image?.asset?.url}
            alt={block.image?.alt || ''}
            className="w-full rounded-xs"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="text-body-small text-text-muted mt-2 text-center">{block.caption}</figcaption>
          )}
        </figure>
      );
    case 'productEmbed':
      return (
        <div className="my-8 p-4 card-surface rounded-xs">
          <p className="text-body-small text-text-muted">Featured print</p>
          <a href={`/products/${block.productHandle}`} className="text-gold hover:opacity-80 transition-opacity">
            {block.productTitle || block.productHandle}
          </a>
        </div>
      );
    default:
      return null;
  }
}

function renderBlockContent(block: any) {
  const style = block.style || 'normal';
  const children = block.children?.map((child: any, i: number) => {
    let text = child.text;
    if (child.marks?.includes('strong')) text = <strong key={i}>{text}</strong>;
    if (child.marks?.includes('em')) text = <em key={i}>{text}</em>;
    if (child.marks?.includes('underline')) text = <u key={i}>{text}</u>;
    if (child._type === 'link') {
      text = <a key={i} href={child.url} className="text-gold hover:opacity-80">{text}</a>;
    }
    return <span key={i}>{text}</span>;
  });

  switch (style) {
    case 'h2': return <h2 key={block._key} className="text-h2 mt-10 mb-4">{children}</h2>;
    case 'h3': return <h3 key={block._key} className="text-h3 mt-8 mb-3">{children}</h3>;
    case 'h4': return <h4 key={block._key} className="text-h4 mt-6 mb-2">{children}</h4>;
    case 'blockquote': return <blockquote key={block._key} className="pl-6 border-l-2 border-gold text-h4 text-text-primary italic my-6">{children}</blockquote>;
    default: return <p key={block._key} className="text-body text-text-secondary leading-relaxed mb-4">{children}</p>;
  }
}

export function PortableText({blocks}: PortableTextProps) {
  if (!blocks?.length) return null;

  return (
    <div>
      {blocks.map((block: any) => (
        <div key={block._key || block._type}>
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
}
