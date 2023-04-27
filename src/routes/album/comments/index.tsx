import { useEffect, useState } from 'react';
import { Avatar } from 'rsuite';
import { Arrow } from 'src/components/common/icons/arrow';
import { useAppDispatch, useAppSelector } from 'src/store';
import { Input, Button } from 'rsuite';
import { deleteComment, getComments, sendComment } from 'src/store/album';
import { useRouter } from 'next/router';
import { TrashIcon } from 'src/components/common/icons/trash';

const Comments = () => {
  const router = useRouter();
  const { data: user } = useAppSelector(state => state.user);

  const [isExpanded, setExpanded] = useState(true);
  const [currentComment, setCurrentComment] = useState('');
  const comments = useAppSelector(state => state.album.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getComments({ albumId: router.query?.id as string }));
  }, []);

  const changeExpandState = () => {
    setExpanded(!isExpanded);
  };

  const handleChangeComment = (value: string) => {
    setCurrentComment(value);
  };

  const onSendComment = async () => {
    if (!!currentComment) {
      await dispatch(
        sendComment({
          albumId: (router.query?.id as string) ?? '',
          text: currentComment
        })
      );

      setCurrentComment('');
    }
  };

  const onDeleteComment = (commentId: string) => {
    dispatch(
      deleteComment({ albumId: (router.query?.id as string) ?? '', commentId })
    );
  };

  return (
    <div className='ml-4 flex flex-col w-80 xl:block xsm:hidden'>
      <div
        className='flex flex-row items-center justify-start h-12 w-full bg-secondary px-4 cursor-pointer'
        onClick={changeExpandState}
      >
        <Arrow
          fill='white'
          className={`${isExpanded ? 'rotate-90' : '-rotate-90'}`}
        />
        <span className='ml-4 text-md font-semibold'> Comments</span>
      </div>
      {isExpanded && (
        <>
          {user?.id && (
            <div className='flex flex-col mt-2'>
              <Input
                as='textarea'
                rows={3}
                placeholder='Your comment...'
                value={currentComment}
                onChange={handleChangeComment}
              />
              <Button onClick={onSendComment} className='bg-secondary mt-2'>
                Send
              </Button>
            </div>
          )}
          <div className='flex flex-col items-center justify-start w-full text-white-300'>
            {comments?.map(el => (
              <div
                className='flex flex-row items-center justify-start px-4 py-2 w-full mt-4 bg-secondary rounded'
                key={el.id}
              >
                <Avatar src={el?.author?.avatarUrl} />
                <div className='flex flex-col w-full ml-4'>
                  <span className='text-lg font-semibold'>
                    {el?.author?.login}
                  </span>
                  <span className=''>{el.text}</span>
                </div>
                {el.author.id === user.id ||
                  (user.isAdmin && (
                    <TrashIcon
                      onClick={() => onDeleteComment(el.id)}
                      className='w-8 h-8 cursor-pointer'
                    />
                  ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export { Comments };
