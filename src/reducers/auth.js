import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAILURE,
  AUTH_SET_USER
  } from '../constants/actionTypes';

const initialState = {
  user: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_SIGN_IN_REQUEST:
      return state
    case AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        user: { ...payload }
      }
    case AUTH_SIGN_IN_FAILURE:
      return {
        ...state,
        error: { ...payload }
      }
    case AUTH_SIGN_OUT_SUCCESS:
      return {
        ...initialState
      }
    case AUTH_SIGN_OUT_FAILURE:
      return {
        ...state,
        error: payload
      }
    case AUTH_SET_USER:
      return {
        ...state,
        user: payload
      }
  
    default:
      return state;
  }
}

export default authReducer;
