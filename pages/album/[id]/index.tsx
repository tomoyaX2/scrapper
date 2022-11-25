import { Album } from '@routes/album';
import { backendUrl } from '@shared/api';
import { AlbumState } from 'src/store/album/types';
import axios from 'axios';
import { GetServerSideProps } from 'next/types';

const Page = (props: { initialData: AlbumState }) => <Album {...props} />;

export const getServerSideProps: GetServerSideProps<{
  initialData: AlbumState;
}> = async context => {
  const res = await axios.get<AlbumState>(
    `${backendUrl}/albums/${context.params?.id as string}`
  );
  return { props: { initialData: res.data } };
};

export default Page;
