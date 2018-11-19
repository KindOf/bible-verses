import {
  VERSES_CREATE_SUCCESS,
  VERSES_CREATE_FAILURE
} from '../constants/actionTypes';

const initialState = {
  data: {},
  error: null
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
  
    default:
      return state;
  }
}

export default categoriesReducer;
  