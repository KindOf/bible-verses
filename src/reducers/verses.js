import {
  VERSES_CREATE_SUCCESS,
  VERSES_CREATE_FAILURE,
  VERSES_UPDATE_FAILURE,
  VERSES_GET_REQUEST,
  VERSES_GET_SUCCESS,
  VERSES_GET_FAILURE,
  VERSES_DELETE_REQUEST,
  VERSES_DELETE_SUCCESS,
  VERSES_DELETE_FAILURE,
  VERSES_FORM_SET_VALUES
} from '../constants/actionTypes';

const initialState = {
  data: null,
  error: null,
  deleting: null,
  selectedVerseKey: null,
  formInitialValues: {
    bigPicture: '',
    category: '',
    isLive: false,
    isPremium: false,
    note: '',
    smallPicture: '',
    soundFile: '',
    verseNumber: '',
    verseText: '',
    videoUrl: ''
  }
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
    case VERSES_UPDATE_FAILURE:
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
    case VERSES_FORM_SET_VALUES:
      return {
        ...state,
        formInitialValues: payload ? state.data[payload] : initialState.formInitialValues,
        selectedVerseKey: payload
      }
    
    default:
      return state;
  }
}

export default categoriesReducer;
  