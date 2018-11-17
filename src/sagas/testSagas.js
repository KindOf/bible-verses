import { call, put, takeLatest, all, select } from 'redux-saga/effects';

function* testSaga() {
  yield call(console.log, 'saga is vorking')
}

export default function*() {
  yield all([
    takeLatest('TEST_SAGA', testSaga),
  ]);
}