import type { NextSeoProps } from 'next-seo';

const DEFAULT_SEO: NextSeoProps = {
  title: 'MangaH - Collection of H titles',
  description:
    'H collection of titles in different languages. Here you can download any album for free',
  openGraph: {
    title: 'MangaH - Free catalog of H albums',
    description:
      'H collection of titles in different languages Here you can download any album for free',
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
