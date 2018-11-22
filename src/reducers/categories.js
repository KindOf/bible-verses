import {
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_CREATE_FAILURE,
  CATEGORIES_DELETE_FAILURE,
  CATEGORIES_CREATE_REQUEST,
  CATEGORIES_CREATE_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  data: {},
  error: null,
  loading: false
};

const categoriesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_GET_SUCCESS:
      return {
        ...state,
        data: payload
      }
    case CATEGORIES_CREATE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CATEGORIES_CREATE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case CATEGORIES_CREATE_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case CATEGORIES_DELETE_FAILURE:
      return {
        ...state,
        error: payload
      }
  
    default:
      return state;
  }
}

export default categoriesReducer;
  