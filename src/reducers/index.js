// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import { reducer as formReducer } from 'redux-form';
 import globalReducer from './global';
 import authReducer from './auth';
 import categories from './categories';
 import verses from './verses';

const rootReducer = combineReducers({
    global: globalReducer,
    form: formReducer,
    auth: authReducer,
    categories,
    verses,
  });
  
  export default rootReducer;