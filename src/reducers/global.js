import {
  GLOBAL_TOGGLE_LOADING, GLOBAL_TOGGLE_DIALOG
  } from '../constants/actionTypes';

const initialState = {
  loading: false,
  openDialogId: null
};

const globalReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GLOBAL_TOGGLE_LOADING:
      return {
        ...state,
        loading: payload
      }

    case GLOBAL_TOGGLE_DIALOG:
      return {
        ...state,
        openDialogId: payload
      }

    default:
      return state;
  }
}

export default globalReducer;
  