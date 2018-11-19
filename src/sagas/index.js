import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import database from './database';

export default function* root() {
  yield all([
    fork(authSaga),
    fork(database),
  ]);
}
