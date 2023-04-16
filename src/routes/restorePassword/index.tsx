import { Modal, Button, useToaster } from 'rsuite';
import { Input } from 'rsuite';
import { useRouter } from 'next/router';

import { useFormActions } from './utils';
import { initiateRestorePassword } from 'src/store/auth';
import { useAppDispatch, useAppSelector } from 'src/store';
import { Toast } from 'src/components/common/toast';

const RestorePassword = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { fields, errors, touched, isSubmitted } = useAppSelector(
    state => state.auth.restorePassword
  );
  const toaster = useToaster();
  const router = useRouter();

  const { handleChange } = useFormActions();

  const onError = (errorText?: string) => {
    toaster.push(<Toast type='error' header='Error' text={errorText ?? ''} />, {
      placement: 'topEnd'
    });
  };

  const onSuccess = () => {
    toaster.push(
      <Toast
        type='success'
        header='Success'
        text='Password has been changed. Please, log in'
      />,
      {
        placement: 'topEnd'
      }
    );
    router.push('/');
  };

  const onSubmit = async () => {
    await dispatch(
      initiateRestorePassword({
        fields: { ...fields, token: router.query.token as string },
        onError,
        onSuccess
      })
    );
  };

  const onCancel = () => {
    router.push('/');
  };
  return (
    <Modal open onClose={onCancel}>
      <Modal.Header>
        <Modal.Title className='text-xl'>Restore Password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='md:px-12 sm:px-4 xsm:px-4'>
          <div className='flex md:flex-row sm:flex-col xsm:flex-col items-center justify-between'>
            <label className='text-md'>
              New Password
              <span className='text-red-400'>*</span>
            </label>

            <div className='mt-2 mb-4 w-64'>
              <Input
                value={fields.newPassword}
                onChange={value => handleChange('newPassword', value)}
              />

              {errors.newPassword && touched.newPassword && (
                <span className='text-red-400 text-xs absolute mt-1 ml-1'>
                  {errors.newPassword}
                </span>
              )}
            </div>
          </div>

          <div className='flex md:flex-row sm:flex-col xsm:flex-col items-center justify-between'>
            <label className='text-md'>
              Confirm Password
              <span className='text-red-400'>*</span>
            </label>

            <div className='mt-2 mb-4 w-64'>
              <Input
                value={fields.confirmPassword}
                onChange={value => handleChange('confirmPassword', value)}
              />

              {errors.confirmPassword && touched.confirmPassword && (
                <span className='text-red-400 text-xs absolute mt-1 ml-1'>
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className='flex items-center md:justify-end sm:justify-center xsm:justify-center'>
        <Button onClick={onCancel}>Cancel</Button>

        <Button
          onClick={onSubmit}
          disabled={isSubmitted}
          loading={isSubmitted}
          type='submit'
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { RestorePassword };
