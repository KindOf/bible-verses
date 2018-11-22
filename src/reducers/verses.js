import {
  VERSES_CREATE_SUCCESS,
  VERSES_CREATE_FAILURE,
  VERSES_GET_REQUEST,
  VERSES_GET_SUCCESS,
  VERSES_GET_FAILURE,
  VERSES_DELETE_REQUEST,
  VERSES_DELETE_SUCCESS,
  VERSES_DELETE_FAILURE
} from '../constants/actionTypes';

const initialState = {
  data: null,
  error: null,
  deleting: null,
};

const categoriesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case VERSES_CREATE_SUCCESS:
      return state
    case VERSES_CREATE_FAILURE:
      return {
        ...state,
        error: payload
      }
    case VERSES_GET_REQUEST:
      return {
        ...state
      }
    case VERSES_GET_SUCCESS:
      return {
        ...state,
        data: payload
      }
    case VERSES_GET_FAILURE:
      return {
        ...state,
        error: payload
      }
    case VERSES_DELETE_REQUEST:
      return {
        ...state,
        deleting: payload.id
      }
    case VERSES_DELETE_SUCCESS:
      return {
        ...state,
        deleting: null
      }
    case VERSES_DELETE_FAILURE:
      return {
        ...state,
        error: payload.message,
        deleting: null
      }
    
    default:
      return state;
  }
}

export default categoriesReducer;
  