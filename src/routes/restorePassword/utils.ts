import { keys } from '@shared/utils/keys';
import { useEffect } from 'react';
import { RestorePasswordState } from 'src/store/auth/types';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  changeRestorePasswordErrors,
  changeRestorePasswordTouched,
  changeRestorePasswordFields,
  initialRestorePasswordValues,
  initialRestorePasswordTouched
} from 'src/store/auth';

const requiredFields = ['newPassword', 'confirmPassword'];

const validateMatchPassword = (password: string, matchPassword: string) =>
  password === matchPassword;

const useFormActions = () => {
  const dispatch = useAppDispatch();
  const { fields, errors, touched } = useAppSelector(
    state => state.auth.restorePassword
  );

  useEffect(() => {
    const result = { ...errors };
    for (const field of keys(fields)) {
      const isRequired = requiredFields.includes(field);
      const isInvalid = isRequired && !fields[field];
      if (
        field === 'confirmPassword' &&
        !validateMatchPassword(fields.newPassword, fields.confirmPassword)
      ) {
        result[field] = "Passwords doesn't match";
      }
      if (isInvalid) {
        result[field] = 'This field is required';
      } else {
        result[field] = '';
      }
    }
    dispatch(changeRestorePasswordErrors(result));
  }, [fields]);

  const handleChange = (
    name: keyof RestorePasswordState,
    value: RestorePasswordState[keyof RestorePasswordState]
  ) => {
    dispatch(changeRestorePasswordFields({ ...fields, [name]: value }));
    dispatch(changeRestorePasswordTouched({ ...touched, [name]: true }));
  };

  const resetFields = () => {
    dispatch(changeRestorePasswordFields(initialRestorePasswordValues));
    dispatch(changeRestorePasswordErrors(initialRestorePasswordValues));
    dispatch(changeRestorePasswordTouched(initialRestorePasswordTouched));
  };

  return {
    isValid: !Object.values(errors).filter(el => !!el).length,
    handleChange,
    resetFields
  };
};

export { useFormActions };
