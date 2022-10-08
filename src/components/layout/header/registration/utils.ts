import { keys } from '@shared/utils/keys';
import { useEffect } from 'react';
import { RegistrationFormState } from 'src/store/auth/types';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  changeRegistrationErrors,
  changeRegistrationTouched,
  changeRegistrationFields,
  initialRegistrationValues,
  initialRegistrationTouched
} from 'src/store/auth';

const requiredFields = ['login', 'password', 'matchPassword', 'email', 'name'];

const validateMatchPassword = (password: string, matchPassword: string) =>
  password === matchPassword;

const useFormActions = () => {
  const dispatch = useAppDispatch();
  const { fields, errors, touched } = useAppSelector(
    state => state.auth.registration
  );

  useEffect(() => {
    const result = { ...errors };
    for (const field of keys(fields)) {
      const isRequired = requiredFields.includes(field);
      const isInvalid = isRequired && !fields[field];
      if (
        field === 'matchPassword' &&
        !validateMatchPassword(fields.password, fields.matchPassword)
      ) {
        result[field] = "Passwords doesn't match";
      }
      if (isInvalid) {
        result[field] = 'This field is required';
      } else {
        result[field] = '';
      }
    }
    dispatch(changeRegistrationErrors(result));
  }, [fields]);

  const handleChange = (
    name: keyof RegistrationFormState,
    value: RegistrationFormState[keyof RegistrationFormState]
  ) => {
    dispatch(changeRegistrationFields({ ...fields, [name]: value }));
    dispatch(changeRegistrationTouched({ ...touched, [name]: true }));
  };

  const resetFields = () => {
    dispatch(changeRegistrationFields(initialRegistrationValues));
    dispatch(changeRegistrationErrors(initialRegistrationValues));
    dispatch(changeRegistrationTouched(initialRegistrationTouched));
  };

  return {
    isValid: !Object.values(errors).filter(el => !!el).length,
    handleChange,
    resetFields
  };
};

export { useFormActions };
