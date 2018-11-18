import {
  GLOBAL_TOGGLE_LOADING
} from '../constants/actionTypes';

export const toggleLoading = data => ({ type: GLOBAL_TOGGLE_LOADING, payload: data });
