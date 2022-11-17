import { keys } from '@shared/utils/keys';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  changeForgotPasswordFields,
  changeForgotPasswordErrors,
  changeForgotPasswordTouched,
  initialForgotPasswordValues,
  initialForgotPasswordTouched
} from 'src/store/auth';
import { ForgotPasswordState } from 'src/store/auth/types';

const useFormActions = () => {
  const dispatch = useAppDispatch();
  const { fields, errors, touched } = useAppSelector(
    state => state.auth.forgotPassword
  );
  const requiredFields =
    !!fields.email || !!fields.login ? [] : ['email', 'login'];

  useEffect(() => {
    const result = { ...errors };
    for (const field of keys(fields)) {
      const isRequired = requiredFields.includes(field);
      const isInvalid = isRequired && !fields[field];
      if (isInvalid) {
        result[field] = 'This field is required';
      } else {
        result[field] = '';
      }
    }
    dispatch(changeForgotPasswordErrors(result));
  }, [fields]);

  const handleChange = (
    name: keyof ForgotPasswordState,
    value: ForgotPasswordState[keyof ForgotPasswordState]
  ) => {
    dispatch(changeForgotPasswordFields({ ...fields, [name]: value }));
    dispatch(changeForgotPasswordTouched({ ...touched, [name]: true }));
  };

  const resetFields = () => {
    dispatch(changeForgotPasswordFields(initialForgotPasswordValues));
    dispatch(changeForgotPasswordErrors(initialForgotPasswordValues));
    dispatch(changeForgotPasswordTouched(initialForgotPasswordTouched));
  };

  return {
    isValid: !Object.values(errors).filter(el => !!el).length,
    handleChange,
    resetFields
  };
};

export { useFormActions };
