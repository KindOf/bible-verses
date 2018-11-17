import { all, fork } from 'redux-saga/effects';
import testSagas from './testSagas';

export default function* root() {
  yield all([
    fork(testSagas),
  ]);
}
