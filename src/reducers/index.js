// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import { reducer as formReducer } from 'redux-form';
 import globalReducer from './global';
 import authReducer from './auth';
 import categories from './categories';

const rootReducer = combineReducers({
    global: globalReducer,
    form: formReducer,
    auth: authReducer,
    categories,
  });
  
  export default rootReducer;