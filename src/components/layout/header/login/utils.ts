import { keys } from '@shared/utils/keys';
import { useEffect } from 'react';
import { LoginFormState } from 'src/store/auth/types';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  changeLoginErrors,
  changeLoginTouched,
  changeLoginFields,
  initialLoginValues,
  initialLoginTouched
} from 'src/store/auth';

const requiredFields = ['login', 'password'];

const useFormActions = () => {
  const dispatch = useAppDispatch();
  const { fields, errors, touched } = useAppSelector(state => state.auth.login);

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
    dispatch(changeLoginErrors(result));
  }, [fields]);

  const handleChange = (
    name: keyof LoginFormState,
    value: LoginFormState[keyof LoginFormState]
  ) => {
    dispatch(changeLoginFields({ ...fields, [name]: value }));
    dispatch(changeLoginTouched({ ...touched, [name]: true }));
  };

  const resetFields = () => {
    dispatch(changeLoginFields(initialLoginValues));
    dispatch(changeLoginErrors(initialLoginValues));
    dispatch(changeLoginTouched(initialLoginTouched));
  };

  return {
    isValid: !Object.values(errors).filter(el => !!el).length,
    handleChange,
    resetFields
  };
};

export { useFormActions };
