import isEmail from 'validator/lib/isEmail';

export const validateEmail = value => !value || isEmail(value) ? undefined : 'Email is not valid';
export const required = value => (value ? undefined : 'Required');