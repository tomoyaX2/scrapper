import { Album } from '@routes/album';
import { backendUrl } from '@shared/api';
import { AlbumState } from 'src/store/album/types';
import axios from 'axios';
import { GetServerSideProps } from 'next/types';

const Page = (props: { initialData: AlbumState }) => <Album {...props} />;

export const getServerSideProps: GetServerSideProps<{
  initialData: AlbumState | null;
}> = async context => {
  try {
    const res = await axios.get<AlbumState>(
      `${backendUrl}/albums/${context.params?.id as string}`
    );
    return { props: { initialData: res.data } };
  } catch (e) {
    return { props: { initialData: null } };
  }
};

export default Page;
