import { call, put, takeLatest, all, take } from 'redux-saga/effects';

import { getCategories, createVerses, toggleLoading } from '../actions';

import { rsf } from '../utils/firebase/firebase';

import {
  CATEGORIES_GET_REQUEST,
  VERSES_CREATE_REQUEST,
} from '../constants/actionTypes';

function* syncCategoriesSaga() {
  const channel = yield call(rsf.database.channel, 'categories');

  while(true) {
    const { value: categories } = yield take(channel);
    yield put(getCategories(categories).success);
  }
}

function* addVerse({ payload }) {
  try {
    yield put(toggleLoading(true));
    const key = yield call(rsf.database.create, 'verses', payload);
    yield put(createVerses(key).success);
    yield put(toggleLoading(false));
  } catch (e) {
    yield put(createVerses(e).failure);
    yield put(toggleLoading(false));
  }
}

export default function*() {
  yield all([
    takeLatest(CATEGORIES_GET_REQUEST, syncCategoriesSaga),
    takeLatest(VERSES_CREATE_REQUEST, addVerse),
  ]);
}
