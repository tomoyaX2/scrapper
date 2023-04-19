import { Uploader } from 'rsuite';
import { useAppDispatch, useAppSelector } from 'src/store';
import { Image } from 'src/components/common/image';
import { getUser } from 'src/store/user';

const UploadAvatar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);
  return (
    <Uploader
      fileListVisible={false}
      listType='picture'
      action='https://mangamischief.com/backend/users/upload-avatar'
      headers={{ access_token: localStorage.getItem('accessToken') }}
      onSuccess={() => {
        dispatch(getUser());
      }}
    >
      <button style={{ width: 300, height: 300 }}>
        {user?.avatarUrl && (
          <Image url={user.avatarUrl} width={300} height={300} alt='' />
        )}
      </button>
    </Uploader>
  );
};

export { UploadAvatar };
