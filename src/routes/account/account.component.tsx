import React, { useEffect } from 'react';
import { UploadAvatar } from 'src/components/common/uploader';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getUser, updateUser } from 'src/store/user';
import { useFormActions } from './utils';
import { Button, Input } from 'rsuite';
import { initiateForgotPassword } from 'src/store/auth';
import { useRouter } from 'next/router';

const Account = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { fields, errors, touched, isSubmitted, isLoading, data } =
    useAppSelector(state => state.user);
  const { handleChange } = useFormActions();
  const router = useRouter();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (!isLoading && !data?.id) {
      router.push('/');
    }
  }, [isLoading, data?.id]);

  const onSubmit = () => {
    dispatch(
      updateUser({
        fields
      })
    );
  };

  const onResetPassword = () => {
    dispatch(
      initiateForgotPassword({
        fields: { email: fields.email, login: fields.login }
      })
    );
  };

  return (
    <div className='flex flex-row items-center justify-start w-full'>
      <div className='flex md:flex-row sm:flex-col xsm:flex-col sm:px-4 xsm:px-4 lg:px-24 md:px-4 py-4 bg-secondary lg:max-w-gallery md:max-w-unset sm:max-w-unset xs:max-w-unset md:w-full sm:w-full xsm:w-full mt-4'>
        <UploadAvatar />

        <div className='flex flex-col items-center'>
          <div className='md:px-12 sm:px-4 xsm:px-4'>
            <div className='flex md:flex-row sm:flex-col xsm:flex-col items-center justify-between pb-4 mt-2'>
              <label className='text-md'>
                Login <span className='text-red-400'>*</span>
              </label>

              <div className='w-64 ml-2'>
                <Input
                  value={fields.login}
                  onChange={value => handleChange('login', value)}
                />

                {errors.login && touched.login && (
                  <span className='text-red-400 text-xs absolute mt-1 ml-1'>
                    {errors.login}
                  </span>
                )}
              </div>
            </div>
            <div className='flex md:flex-row sm:flex-col xsm:flex-col items-center justify-between pb-4'>
              <label className='text-md'>
                Name <span className='text-red-400'>*</span>
              </label>

              <div className='w-64 ml-2'>
                <Input
                  value={fields.name}
                  onChange={value => handleChange('name', value)}
                />

                {errors.name && touched.name && (
                  <span className='text-red-400 text-xs absolute mt-1 ml-1'>
                    {errors.name}
                  </span>
                )}
              </div>
            </div>
            <div className='flex md:flex-row sm:flex-col xsm:flex-col items-center justify-between pb-4'>
              <label className='text-md'>
                Email <span className='text-red-400'>*</span>
              </label>

              <div className='w-64 ml-2'>
                <Input
                  value={fields.email}
                  onChange={value => handleChange('email', value)}
                />

                {errors.email && touched.email && (
                  <span className='text-red-400 text-xs absolute mt-1 ml-1'>
                    {errors.email}
                  </span>
                )}
              </div>
            </div>
            <div className='flex md:flex-row sm:flex-col xsm:flex-col items-center justify-between pb-4'>
              <label className='text-md'>Phone</label>

              <div className='w-64 ml-2'>
                <Input
                  value={fields.phone}
                  onChange={value => handleChange('phone', value)}
                />

                {errors.phone && touched.phone && (
                  <span className='text-red-400 text-xs absolute mt-1 ml-1'>
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>
            <div className='flex w-full justify-end'>
              <Button onClick={onResetPassword} className='mr-2'>
                Reset password
              </Button>
              <Button
                onClick={onSubmit}
                disabled={isSubmitted}
                loading={isSubmitted}
                type='submit'
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Account };
