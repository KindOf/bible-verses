import { call, put, takeLatest, all } from 'redux-saga/effects';

import { doSignIn, doSignOut } from '../utils/firebase';
import { authSignIn, authSignOut } from '../actions';
import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_OUT_REQUEST
} from '../constants/actionTypes';

function* signIn({ payload }) {
  try {
    const data = yield call(doSignIn, payload.email, payload.password);
    yield put(authSignIn(data).success);
  } catch (e) {
    yield put(authSignIn(e).failure);
  }
}

function* signOut() {
  try {
    const data = yield call(doSignOut);
    yield put(authSignOut(data).success);
  } catch (e) {
    yield put(authSignOut(e).failure);
  }
}

export default function*() {
  yield all([
    takeLatest(AUTH_SIGN_IN_REQUEST, signIn),
    takeLatest(AUTH_SIGN_OUT_REQUEST, signOut)
  ]);
}