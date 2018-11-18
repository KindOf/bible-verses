// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import { reducer as formReducer } from 'redux-form';
 import authReducer from './auth';

const rootReducer = combineReducers({
    // default: (state = { test: 'value' }) => state,
    form: formReducer,
    auth: authReducer
  });
  
  export default rootReducer;