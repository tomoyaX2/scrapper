import type { NextSeoProps } from 'next-seo';

const DEFAULT_SEO: NextSeoProps = {
  title: 'X-Manga - Collection of H titles',
  description:
    'H collection of titles in different languages. Here you can download any album for free',
  openGraph: {
    title: 'X-Manga - Free catalog of H albums',
    description:
      'H collection of titles in different languages Here you can download any album for free',
    url: 'https://xmanga.org'
  }
};

const TITLE_SEO = ({
  title,
  language
}: {
  title: string;
  language: string;
}) => ({
  title: `${title} - X-Manga collection`,
  description: `${title} - read on ${language} x manga`
});

export { DEFAULT_SEO, TITLE_SEO };
