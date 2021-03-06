import { call, put, takeLatest, all } from 'redux-saga/effects';
import {push} from 'connected-react-router';

import { ROUTES } from '../constants'
import { doSignIn, doSignOut } from '../utils/firebase';
import { authSignIn, authSignOut, toggleLoading } from '../actions';
import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_OUT_REQUEST
} from '../constants/actionTypes';
import { AppToaster } from '../utils/Toaster';

function* signIn({ payload }) {
  try {
    yield put(toggleLoading(true));
    const data = yield call(doSignIn, payload.email, payload.password);
    yield put(authSignIn(data.user.toJSON()).success);
    yield put(toggleLoading(false));
    AppToaster.show({ message: 'Welcome', intent: 'success', timeout: 2000 });
    yield put(push(ROUTES.VERSES_FORM));
  } catch (e) {
    AppToaster.show({ message: e.message, intent: 'danger' });
    yield put(toggleLoading(false));
    yield put(authSignIn(e).failure);
  }
}

function* signOut() {
  try {
    const data = yield call(doSignOut);
    yield put(authSignOut(data).success);
    AppToaster.show({ message: 'Goodbuy', intent: 'warning', timeout: 2000 });
    yield put(push(ROUTES.LOGIN));
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