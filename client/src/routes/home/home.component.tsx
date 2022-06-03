import Image from 'next/image';
import { createView } from '@shared/lib/view';
import { PageList } from '@features/pagination/ui';

const props = {};

const albums = [
  {
    preview:
      'http://localhost:8080/public/images/d03c36a0-adfa-4537-8ea6-792ade6c7f8b/c355d098-bd90-49cd-9cf4-1d4a876cfec7.webp',
    title:
      'Tsukiyo no Midare Zake (Kouhen) Moonlit Intoxication ~ A Housewife Stolen by a Coworker Besides her Blackout Drunk Husband ~ Chapter 2',
    id: '0f9984fc-9011-4000-9be8-6ebd15ea935c',
    totalImages: '100',
    type: 'doujinshi',
    language: 'English'
  },
  {
    preview:
      'http://localhost:8080/public/images/d03c36a0-adfa-4537-8ea6-792ade6c7f8b/c355d098-bd90-49cd-9cf4-1d4a876cfec7.webp',
    title:
      'Tsukiyo no Midare Zake (Kouhen) Moonlit Intoxication ~ A Housewife Stolen by a Coworker Besides her Blackout Drunk Husband ~ Chapter 2',
    id: '0f9984fc-9011-4000-9be8-6ebd15ea9352',
    totalImages: '100',
    type: 'doujinshi',
    language: 'English'
  },
  {
    preview:
      'http://localhost:8080/public/images/d03c36a0-adfa-4537-8ea6-792ade6c7f8b/c355d098-bd90-49cd-9cf4-1d4a876cfec7.webp',
    title:
      'Tsukiyo no Midare Zake (Kouhen) Moonlit Intoxication ~ A Housewife Stolen by a Coworker Besides her Blackout Drunk Husband ~ Chapter 2',
    id: '0f9984fc-9011-4000-9be8-6ebd15ea9353',
    totalImages: '100',
    type: 'doujinshi',
    language: 'English'
  },
  {
    preview:
      'http://localhost:8080/public/images/d03c36a0-adfa-4537-8ea6-792ade6c7f8b/c355d098-bd90-49cd-9cf4-1d4a876cfec7.webp',
    title:
      'Tsukiyo no Midare Zake (Kouhen) Moonlit Intoxication ~ A Housewife Stolen by a Coworker Besides her Blackout Drunk Husband ~ Chapter 2',
    id: '0f9984fc-9011-4000-9be8-6ebd15ea9354',
    totalImages: '100',
    type: 'doujinshi',
    language: 'English'
  },
  {
    preview:
      'http://localhost:8080/public/images/d03c36a0-adfa-4537-8ea6-792ade6c7f8b/c355d098-bd90-49cd-9cf4-1d4a876cfec7.webp',
    title:
      'Tsukiyo no Midare Zake (Kouhen) Moonlit Intoxication ~ A Housewife Stolen by a Coworker Besides her Blackout Drunk Husband ~ Chapter 2',
    id: '0f9984fc-9011-4000-9be8-6ebd15ea9355',
    totalImages: '100',
    type: 'doujinshi',
    language: 'English'
  },
  {
    preview:
      'http://localhost:8080/public/images/d03c36a0-adfa-4537-8ea6-792ade6c7f8b/c355d098-bd90-49cd-9cf4-1d4a876cfec7.webp',
    title:
      'Tsukiyo no Midare Zake (Kouhen) Moonlit Intoxication ~ A Housewife Stolen by a Coworker Besides her Blackout Drunk Husband ~ Chapter 2',
    id: '0f9984fc-9011-4000-9be8-6ebd15ea9356',
    totalImages: '100',
    type: 'doujinshi',
    language: 'English'
  },
  {
    preview:
      'http://localhost:8080/public/images/d03c36a0-adfa-4537-8ea6-792ade6c7f8b/c355d098-bd90-49cd-9cf4-1d4a876cfec7.webp',
    title:
      'Tsukiyo no Midare Zake (Kouhen) Moonlit Intoxication ~ A Housewife Stolen by a Coworker Besides her Blackout Drunk Husband ~ Chapter 2',
    id: '0f9984fc-9011-4000-9be8-6ebd15ea9357',
    totalImages: '100',
    type: 'doujinshi',
    language: 'English'
  },
  {
    preview:
      'http://localhost:8080/public/images/d03c36a0-adfa-4537-8ea6-792ade6c7f8b/c355d098-bd90-49cd-9cf4-1d4a876cfec7.webp',
    title:
      'Tsukiyo no Midare Zake (Kouhen) Moonlit Intoxication ~ A Housewife Stolen by a Coworker Besides her Blackout Drunk Husband ~ Chapter 2',
    id: '0f9984fc-9011-4000-9be8-6ebd15ea9358',
    totalImages: '100',
    type: 'doujinshi',
    language: 'English'
  },
  {
    preview:
      'http://localhost:8080/public/images/d03c36a0-adfa-4537-8ea6-792ade6c7f8b/c355d098-bd90-49cd-9cf4-1d4a876cfec7.webp',
    title:
      'Tsukiyo no Midare Zake (Kouhen) Moonlit Intoxication ~ A Housewife Stolen by a Coworker Besides her Blackout Drunk Husband ~ Chapter 2',
    id: '0f9984fc-9011-4000-9be8-6ebd15ea999',
    totalImages: '100',
    type: 'doujinshi',
    language: 'English'
  },
  {
    preview:
      'http://localhost:8080/public/images/d03c36a0-adfa-4537-8ea6-792ade6c7f8b/c355d098-bd90-49cd-9cf4-1d4a876cfec7.webp',
    title:
      'Tsukiyo no Midare Zake (Kouhen) Moonlit Intoxication ~ A Housewife Stolen by a Coworker Besides her Blackout Drunk Husband ~ Chapter 2',
    id: '0f9984fc-9011-4000-9be8-6ebd15ea9390',
    totalImages: '100',
    type: 'doujinshi',
    language: 'English'
  },
  {
    preview:
      'http://localhost:8080/public/images/d03c36a0-adfa-4537-8ea6-792ade6c7f8b/c355d098-bd90-49cd-9cf4-1d4a876cfec7.webp',
    title:
      'Tsukiyo no Midare Zake (Kouhen) Moonlit Intoxication ~ A Housewife Stolen by a Coworker Besides her Blackout Drunk Husband ~ Chapter 2',
    id: '0f9984fc-9011-4000-9be8-6ebd15ea9311',
    totalImages: '100',
    type: 'doujinshi',
    language: 'English'
  }
];

const Home = createView()
  .props(props)
  .view(() => (
    <div className='flex flex-col items-center justify-center w-full'>
      <div className='flex flex-row items-center justify-center flex-wrap px-12 py-4'>
        {albums.map(album => (
          <div
            className='m-4 flex flex-col items-center bg-primary cursor-pointer w-80'
            key={album.id}
          >
            <Image
              src={album.preview}
              loader={({ src, width }) => `${src}?w=${width}`}
              alt='preview'
              width={300}
              height={300}
            />

            <span className='text-sm text-title text-center py-1 px-1'>
              {`[${album.language}] ${album.title}`}
            </span>
          </div>
        ))}
      </div>

      <PageList />
    </div>
  ));

export { Home };
