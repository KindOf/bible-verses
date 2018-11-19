import {
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_FAILURE,
  VERSES_CREATE_REQUEST,
  VERSES_CREATE_SUCCESS,
  VERSES_CREATE_FAILURE
} from '../constants/actionTypes';

export const getCategories = data => ({
  request: { type: CATEGORIES_GET_REQUEST, payload: data },
  success: { type: CATEGORIES_GET_SUCCESS, payload: data },
  failure: { type: CATEGORIES_GET_FAILURE, payload: data },
});

export const createVerses = data => ({
  request: { type: VERSES_CREATE_REQUEST, payload: data },
  success: { type: VERSES_CREATE_SUCCESS, payload: data },
  failure: { type: VERSES_CREATE_FAILURE, payload: data },
});
