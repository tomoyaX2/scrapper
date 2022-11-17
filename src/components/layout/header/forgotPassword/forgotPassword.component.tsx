import { Modal, Button, useToaster } from 'rsuite';
import { Input } from 'rsuite';

import { useFormActions } from './utils';
import {
  changeForgotPasswordModalVisible,
  initiateForgotPassword
} from 'src/store/auth';
import { useAppDispatch, useAppSelector } from 'src/store';
import { Toast } from 'src/components/common/toast';

const ForgotPassword = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { fields, errors, touched, visibleModal, isSubmitted } = useAppSelector(
    state => state.auth.forgotPassword
  );
  const toaster = useToaster();

  const { handleChange, resetFields } = useFormActions();

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
        text='Restore link was sent to your email'
      />,
      {
        placement: 'topEnd'
      }
    );
  };

  const onSubmit = async () => {
    dispatch(changeForgotPasswordModalVisible());
    await dispatch(initiateForgotPassword({ fields, onError, onSuccess }));
  };

  const onClose = () => {
    resetFields();
    dispatch(changeForgotPasswordModalVisible());
  };

  return (
    <Modal open={visibleModal} onClose={onClose}>
      <Modal.Header>
        <Modal.Title className='text-xl'>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='md:px-12 sm:px-4 xsm:px-4'>
          <div className='flex md:flex-row sm:flex-col xsm:flex-col items-center justify-between'>
            <label className='text-md'>
              Email
              {!fields.login && !fields.email && (
                <span className='text-red-400'>*</span>
              )}
            </label>

            <div className='mt-2 mb-4 w-64'>
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

          <div className='flex md:flex-row sm:flex-col xsm:flex-col items-center justify-between'>
            <label className='text-md'>
              Login
              {!fields.login && !fields.email && (
                <span className='text-red-400'>*</span>
              )}
            </label>

            <div className='mt-2 mb-4 w-64'>
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
        </div>
      </Modal.Body>

      <Modal.Footer className='flex items-center md:justify-end sm:justify-center xsm:justify-center'>
        <Button
          onClick={onSubmit}
          disabled={isSubmitted}
          loading={isSubmitted}
          type='submit'
        >
          Submit
        </Button>

        <Button onClick={onClose} appearance='subtle'>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ForgotPassword };
