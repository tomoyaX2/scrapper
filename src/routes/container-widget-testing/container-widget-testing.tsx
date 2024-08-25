/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DefaultSeo as Seo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DEFAULT_SEO } from '@shared/config/seo';
import { getTags } from 'src/store/tags';
import { getTypes } from 'src/store/types';
import { getLanguages } from 'src/store/languages';
import { getSeries } from 'src/store/series';
import { getAuthors } from 'src/store/authors';
import { getGroups } from 'src/store/groups';
import { SearchBar } from 'src/components/search-bar';
import { useAppDispatch } from 'src/store';
import ReactGA from 'react-ga4';
import { getUser } from 'src/store/user';

{
  /* <script type="module">
    import MdBot from "https://widget.metadialog.io/client.js"

    MdBot.init({
        type: 'popup',
        apiKey: 'streaming_web-yakov-karda-gmail-com',
    })
</script> */
}

const WidgetTesting = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTags());
    dispatch(getTypes());
    dispatch(getLanguages());
    dispatch(getSeries());
    dispatch(getAuthors());
    dispatch(getGroups());
    dispatch(getUser());

    ReactGA.send({ hitType: 'pageview' });
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://widget.metadialog.io/client.js';
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      //@ts-expect-error
      if (window.MdBot) {
        //@ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        window.MdBot.init({
          type: 'standard',
          apiKey: 'streaming_web-yakov-karda-gmail-com'
        });
      }
    };

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const router = useRouter();
  if (router.isReady) {
    return (
      <>
        <Seo
          {...DEFAULT_SEO}
          additionalMetaTags={[
            {
              property: 'dc:keywords',
              content:
                'mangamischief, hentai, manga, manhwa, adult manga, adult manhwa, hentai manga, hentai manhwa'
            }
          ]}
          canonical='https://mangamischief.com'
        />
        <div className='flex flex-col'>
          <SearchBar />
        </div>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ width: 600, height: 600 }}>
            <md-bot-standard />
          </div>
        </div>
      </>
    );
  }

  return <div />;
};

export { WidgetTesting };
