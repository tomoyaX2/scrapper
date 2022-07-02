import type { NextSeoProps } from 'next-seo';

const DEFAULT_SEO: NextSeoProps = {
  title: 'mangaH - Collection of handmade titles',
  description: 'Hentai collection of handmade titles',
  openGraph: {
    title: 'mangaH - Free catalog of hentai albums',
    description: 'Hentai collection of handmade titles',
    url: 'https://mangah.org'
  }
};

const TITLE_SEO = ({
  title,
  language
}: {
  title: string;
  language: string;
}) => ({
  title: `${title} - mangaH collection`,
  description: `${title} - read on ${language}`
});

export { DEFAULT_SEO, TITLE_SEO };
