import {
  CATEGORIES_GET_SUCCESS,
} from '../constants/actionTypes';

const initialState = {
  data: {}
};

const categoriesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_GET_SUCCESS:
      return {
        ...state,
        data: payload
      }
  
    default:
      return state;
  }
}

export default categoriesReducer;
  