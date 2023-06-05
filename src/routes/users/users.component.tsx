import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { deleteUser, getUser } from 'src/store/user';
import { changeAdminStatus, getUsers } from 'src/store/users';
import { Table } from 'rsuite';
import { User } from 'src/store/user/types';
const { Column, HeaderCell, Cell } = Table;

const Users = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data: users } = useAppSelector(state => state.users);
  const { data: user, isLoading } = useAppSelector(state => state.user);
  const router = useRouter();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (!user.isAdmin && !isLoading) {
      router.push('/');
    }
  }, [user]);

  const onDelete = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const onChangeAdminStatus = (id: string, status: boolean) => {
    dispatch(changeAdminStatus({ id, status }));
  };

  if (router.isReady && !isLoading) {
    return (
      <div className='w-full flex items-center justify-center mt-4'>
        <Table width={1300} height={1000} data={users}>
          <Column width={400} align='center' fixed>
            <HeaderCell>Id</HeaderCell>

            <Cell dataKey='id' />
          </Column>

          <Column width={150}>
            <HeaderCell>Login</HeaderCell>

            <Cell dataKey='login' />
          </Column>

          <Column width={300}>
            <HeaderCell>Email</HeaderCell>

            <Cell dataKey='email' />
          </Column>

          <Column width={100}>
            <HeaderCell>Name</HeaderCell>

            <Cell dataKey='name' />
          </Column>

          <Column width={100}>
            <HeaderCell>Phone</HeaderCell>

            <Cell dataKey='phone' />
          </Column>

          <Column width={80} fixed='right'>
            <HeaderCell>.</HeaderCell>

            <Cell>
              {(row: any) => (
                <span
                  className='cursor-pointer'
                  onClick={() => onDelete((row as User).id)}
                >
                  Delete
                </span>
              )}
            </Cell>
          </Column>

          <Column width={170} fixed='right'>
            <HeaderCell>.</HeaderCell>

            <Cell>
              {(row: any) => (
                <span
                  onClick={() =>
                    onChangeAdminStatus(
                      (row as User).id,
                      !(row as User).isAdmin
                    )
                  }
                  className='cursor-pointer'
                >
                  {(row as User).isAdmin ? 'Remove Admin' : 'Make Admin'}
                </span>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
    );
  }

  return <div />;
};

export { Users };
