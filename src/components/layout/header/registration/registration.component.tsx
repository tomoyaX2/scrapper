import { Modal, Button } from 'rsuite';
import { useState } from 'react';
import { Input, InputGroup } from 'rsuite';
import { EyeIcon } from 'src/components/common/icons/eye';

import { useFormActions } from './utils';
import {
  changeRegistrationModalVisible,
  initiateRegistration
} from 'src/store/auth';
import { useAppDispatch, useAppSelector } from 'src/store';
import { EyeClosedIcon } from 'src/components/common/icons/closedEye';

const Registration = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { fields, errors, touched, visibleModal, isSubmitted } = useAppSelector(
    state => state.auth.registration
  );
  const { handleChange, resetFields } = useFormActions();

  const changeVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const onSubmit = async () => {
    await dispatch(initiateRegistration(fields));
  };

  const onClose = () => {
    resetFields();
    setVisiblePassword(false);
    dispatch(changeRegistrationModalVisible());
  };

  return (
    <Modal open={visibleModal} onClose={onClose}>
      <Modal.Header>
        <Modal.Title className='text-xl'>Registration</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='md:px-12 sm:px-4 xsm:px-4'>
          <div className='flex md:flex-row sm:flex-col xsm:flex-col items-center justify-between'>
            <label className='text-md'>
              Login <span className='text-red-400'>*</span>
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

          <div className='flex md:flex-row sm:flex-col xsm:flex-col items-center justify-between'>
            <label className='text-md'>
              Password <span className='text-red-400'>*</span>
            </label>

            <div className='mt-2 mb-4 w-64'>
              <InputGroup>
                <Input
                  value={fields.password}
                  type={visiblePassword ? 'text' : 'password'}
                  onChange={value => handleChange('password', value)}
                />

                <InputGroup.Addon
                  className='cursor-pointer'
                  onClick={changeVisiblePassword}
                >
                  {visiblePassword ? (
                    <EyeClosedIcon className='w-4 h-4' fill='white' />
                  ) : (
                    <EyeIcon className='w-4 h-4' fill='white' />
                  )}
                </InputGroup.Addon>
              </InputGroup>

              {errors.password && touched.password && (
                <span className='text-red-400 text-xs mt-1 ml-1'>
                  {errors.password}
                </span>
              )}
            </div>
          </div>

          <div className='flex md:flex-row sm:flex-col xsm:flex-col items-center justify-between'>
            <label className='text-md'>
              Repeat Password <span className='text-red-400'>*</span>
            </label>

            <div className='mt-2 mb-4 w-64'>
              <InputGroup>
                <Input
                  value={fields.matchPassword}
                  type={visiblePassword ? 'text' : 'password'}
                  onChange={value => handleChange('matchPassword', value)}
                />

                <InputGroup.Addon
                  className='cursor-pointer'
                  onClick={changeVisiblePassword}
                >
                  {visiblePassword ? (
                    <EyeClosedIcon className='w-4 h-4' fill='white' />
                  ) : (
                    <EyeIcon className='w-4 h-4' fill='white' />
                  )}
                </InputGroup.Addon>
              </InputGroup>

              {errors.matchPassword && touched.matchPassword && (
                <span className='text-red-400 text-xs absolute mt-1 ml-1'>
                  {errors.matchPassword}
                </span>
              )}
            </div>
          </div>

          <div className='flex md:flex-row sm:flex-col xsm:flex-col items-center justify-between'>
            <label className='text-md'>
              Email <span className='text-red-400'>*</span>
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
              Username <span className='text-red-400'>*</span>
            </label>

            <div className='mt-2 mb-4 w-64'>
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

          {/* <div className='flex flex-row items-center justify-between'>
            <label className='text-md'>Phone</label>

            <Input
              value={fields.phone}
              className='my-2 w-64'
              onChange={value => handleChange('phone', value)}
            />
          </div> */}
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

export { Registration };
