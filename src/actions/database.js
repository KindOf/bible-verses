import {
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_FAILURE,
  VERSES_CREATE_REQUEST,
  VERSES_CREATE_SUCCESS,
  VERSES_CREATE_FAILURE,
  VERSES_GET_REQUEST,
  VERSES_GET_SUCCESS,
  VERSES_GET_FAILURE,
  VERSES_DELETE_REQUEST,
  VERSES_DELETE_SUCCESS,
  VERSES_DELETE_FAILURE
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

export const getVerses = data => ({
  request: { type: VERSES_GET_REQUEST, payload: data },
  success: { type: VERSES_GET_SUCCESS, payload: data },
  failure: { type: VERSES_GET_FAILURE, payload: data },
});

export const deleteVerse = data => ({
  request: { type: VERSES_DELETE_REQUEST, payload: data },
  success: { type: VERSES_DELETE_SUCCESS, payload: data },
  failure: { type: VERSES_DELETE_FAILURE, payload: data },
});
