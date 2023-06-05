import { AnimePage } from '@routes/anime/page';
import { backendUrl } from '@shared/api';
import axios from 'axios';
import { GetServerSideProps } from 'next/types';
import { VideoState } from 'src/store/anime/item/types';

const Page = (props: { initialData: VideoState }) => <AnimePage {...props} />;

export const getServerSideProps: GetServerSideProps<{
  initialData: VideoState | null;
}> = async context => {
  try {
    const res = await axios.get<VideoState>(
      `${backendUrl}/videos/${context.params?.id as string}`
    );

    return { props: { initialData: res.data } };
  } catch (e) {
    return { props: { initialData: null } };
  }
};

export default Page;
