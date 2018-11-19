import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase'

import config from './config';

const app = firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();
const rsf = new ReduxSagaFirebase(app);

export {
  auth,
  database,
  rsf,
};