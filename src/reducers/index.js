// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import { reducer as formReducer } from 'redux-form';
//  import { reducer as formReducer } from 'redux-form'
const rootReducer = combineReducers({
    default: (state = { test: 'value' }) => state,
    form: formReducer,
  });
  
  export default rootReducer;