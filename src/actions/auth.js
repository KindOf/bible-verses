import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_OUT_REQUEST,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAILURE,
  AUTH_SET_USER
} from '../constants/actionTypes';

export const authSignIn = data => ({
  request: { type: AUTH_SIGN_IN_REQUEST, payload: data },
  success: { type: AUTH_SIGN_IN_SUCCESS, payload: data },
  failure: { type: AUTH_SIGN_IN_FAILURE, payload: data },
});

export const authSignOut = data => ({
  request: { type: AUTH_SIGN_OUT_REQUEST, payload: data },
  success: { type: AUTH_SIGN_OUT_SUCCESS, payload: data },
  failure: { type: AUTH_SIGN_OUT_FAILURE, payload: data },
});

export const setUser = data => ({ type: AUTH_SET_USER, payload: data })