import isEmail from 'validator/lib/isEmail';

export const validateEmail = value => !value || isEmail(value) ? undefined : 'Email is not valid';
export const required = value => (value ? undefined : 'Required');
export const requiredFile = value =>
  value[0] instanceof File
    || (typeof value === 'string' && value.length > 0) ? undefined : 'Required'