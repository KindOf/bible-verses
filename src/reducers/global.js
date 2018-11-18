import {
  GLOBAL_TOGGLE_LOADING
  } from '../constants/actionTypes';

const initialState = {
  loading: false
};

const globalReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBAL_TOGGLE_LOADING:
      return {
        ...state,
        loading: payload
      }
  
    default:
      return state;
  }
}

export default globalReducer;
  