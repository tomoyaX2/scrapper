import { keys } from '@shared/utils/keys';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  changeUserErrors,
  chageUserFields,
  changeUserTouched,
  initialUserFields,
  initialUserErrors,
  initialUserTouched
} from 'src/store/user';
import { UserFormState } from 'src/store/user/types';

const requiredFields = ['login', 'name', 'email'];

const useFormActions = () => {
  const dispatch = useAppDispatch();
  const { fields, errors, touched } = useAppSelector(state => state.user);

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
    dispatch(changeUserErrors(result));
  }, [fields]);

  const handleChange = (
    name: keyof UserFormState,
    value: UserFormState[keyof UserFormState]
  ) => {
    dispatch(chageUserFields({ ...fields, [name]: value }));
    dispatch(changeUserTouched({ ...touched, [name]: true }));
  };

  const resetFields = () => {
    dispatch(chageUserFields(initialUserFields));
    dispatch(changeUserErrors(initialUserErrors));
    dispatch(changeUserTouched(initialUserTouched));
  };

  return {
    isValid: !Object.values(errors).filter(el => !!el).length,
    handleChange,
    resetFields
  };
};

export { useFormActions };
