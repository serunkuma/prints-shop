import {useEffect} from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
}

export function Seo({title, description, image}: SeoProps) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return null;
}
