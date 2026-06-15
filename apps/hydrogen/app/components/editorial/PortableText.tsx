import {PortableText as PortableTextRenderer, type PortableTextComponents} from '@portabletext/react';
import {SanityImage} from '~/components/shared/SanityImage';

interface PortableTextProps {
  value?: any[] | string;
  blocks?: any[] | string;
}

const components: PortableTextComponents = {
  block: {
    h1: ({children}) => <h1 className="text-h1 mt-10 mb-5">{children}</h1>,
    normal: ({children}) => <p className="text-body text-text-secondary leading-relaxed mb-4">{children}</p>,
    h2: ({children}) => <h2 className="text-h2 mt-10 mb-4">{children}</h2>,
    h3: ({children}) => <h3 className="text-h3 mt-8 mb-3">{children}</h3>,
    h4: ({children}) => <h4 className="text-h4 mt-6 mb-2">{children}</h4>,
    blockquote: ({children}) => (
      <blockquote className="pl-6 border-l-2 border-gold text-h4 text-text-primary italic my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="mb-4 ml-6 list-disc text-body text-text-secondary">{children}</ul>,
    number: ({children}) => <ol className="mb-4 ml-6 list-decimal text-body text-text-secondary">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className="mb-2">{children}</li>,
    number: ({children}) => <li className="mb-2">{children}</li>,
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold text-text-primary">{children}</strong>,
    em: ({children}) => <em>{children}</em>,
    underline: ({children}) => <u>{children}</u>,
    link: ({children, value}) => {
      const href = value?.href || value?.url || '#';
      const openInNewTab = value?.openInNewTab || /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noreferrer noopener' : undefined}
          className="text-gold hover:opacity-80"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    imageBlock: ({value}) => (
      <figure className="my-8">
        <SanityImage
          image={value.image}
          alt={value.image?.alt || value.alt || ''}
          width={1200}
          className="w-full rounded-xs"
          loading="lazy"
        />
        {value.caption && (
          <figcaption className="text-body-small text-text-muted mt-2 text-center">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    image: ({value}) => (
      <figure className="my-8">
        <SanityImage
          image={value}
          alt={value.alt || ''}
          width={1200}
          className="w-full rounded-xs"
          loading="lazy"
        />
        {value.caption && (
          <figcaption className="text-body-small text-text-muted mt-2 text-center">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    productEmbed: ({value}) => (
      <div className="my-8 p-4 card-surface rounded-xs">
        <p className="text-body-small text-text-muted">Featured print</p>
        <a href={`/products/${value.productHandle}`} className="text-gold hover:opacity-80 transition-opacity">
          {value.productTitle || value.productHandle}
        </a>
      </div>
    ),
  },
};

export function PortableText({value, blocks}: PortableTextProps) {
  const portableText = value || blocks;
  if (typeof portableText === 'string') {
    return <p className="text-body text-text-secondary leading-relaxed mb-4">{portableText}</p>;
  }
  if (!portableText?.length) return null;

  const cleanBlocks = portableText.filter(
    (block) => block && typeof block === 'object' && typeof block._type === 'string',
  );

  if (!cleanBlocks.length) return null;

  return <PortableTextRenderer value={cleanBlocks} components={components} />;
}
