import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_OUT_REQUEST,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAILURE
  } from '../constants/actionTypes';

const initialState = {
  loading: false,
  user: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload
      }
    case AUTH_SIGN_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      }
  
    default:
      return state;
  }
}

export default authReducer;
