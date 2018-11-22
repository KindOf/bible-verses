import {
  GLOBAL_TOGGLE_LOADING, GLOBAL_TOGGLE_DIALOG
} from '../constants/actionTypes';

export const toggleLoading = data => ({ type: GLOBAL_TOGGLE_LOADING, payload: data });
export const toggleDialog = id => ({ type: GLOBAL_TOGGLE_DIALOG, payload: id })
