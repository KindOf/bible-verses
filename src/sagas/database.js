import { call, put, takeLatest, all, take } from 'redux-saga/effects';

import {
  getCategories, createVerses, toggleLoading, getVerses, deleteVerse, updateVerses,
  setFormValues
} from '../actions';

import { rsf } from '../utils/firebase/firebase';
import { resourceRef } from '../utils/firebase/storage';

import {
  CATEGORIES_GET_REQUEST,
  VERSES_CREATE_REQUEST,
  VERSES_UPDATE_REQUEST,
  VERSES_GET_REQUEST,
  VERSES_DELETE_REQUEST
} from '../constants/actionTypes';

import { generateRandomKey } from '../utils';

function* syncCategoriesSaga() {
  const channel = yield call(rsf.database.channel, 'categories');

  while(true) {
    const { value: categories } = yield take(channel);
    yield put(getCategories(categories).success);
  }
}

function* syncVersesSaga() {
  const channel = yield call(rsf.database.channel, 'verses');

  while(true) {
    const { value: verses } = yield take(channel);
    yield put(getVerses(verses).success);
  }
}

function* addVerse({ payload }) {
  const { bigPicture, smallPicture, soundFile, ...verse } = payload;
  try {
    yield put(toggleLoading(true));
    const bigPicturePath = `images/${generateRandomKey()}-${bigPicture[0].name}`;
    const smallPicturePath = `images/${generateRandomKey()}-${smallPicture[0].name}`;
    const soundPicturePath = `Audio/${generateRandomKey()}-${smallPicture[0].name}`;
    verse.bigPicture = bigPicturePath;
    verse.smallPicture = smallPicturePath;
    verse.soundFile = soundPicturePath;

    yield _uploadFile(bigPicture[0], bigPicturePath);
    yield _uploadFile(smallPicture[0], smallPicturePath);
    yield _uploadFile(soundFile[0], soundPicturePath);

    const key = yield call(rsf.database.create, 'verses', verse);
    yield call(rsf.database.patch, `categories/${payload.category}`, { [key]: true })
    yield put(createVerses(key).success);
    yield put(setFormValues());
    yield put(toggleLoading(false));
  } catch (e) {
    yield put(createVerses(e.message).failure);
    yield put(toggleLoading(false));
  }
}

function* updateVerseSaga({ payload }) {
  const {
    selectedVerseKey: key,
    oldVerse,
    verse: { bigPicture, smallPicture, soundFile, ...verse }
  } = payload;
  try {
    yield put(toggleLoading(true));

    if (typeof bigPicture !== 'string') {
      const bigPicturePath = `images/${generateRandomKey()}-${bigPicture[0].name}`;
      verse.bigPicture = bigPicturePath;
      yield _deleteFile(oldVerse.bigPicture)
      yield _uploadFile(bigPicture[0], bigPicturePath);
    }

    if (typeof smallPicture !== 'string') {
      const smallPicturePath = `images/${generateRandomKey()}-${smallPicture[0].name}`;
      verse.smallPicture = smallPicturePath;
      yield _deleteFile(oldVerse.smallPicture);
      yield _uploadFile(smallPicture[0], smallPicturePath);
    }

    if (typeof soundFile !== 'string') {
      const soundPicturePath = `Audio/${generateRandomKey()}-${smallPicture[0].name}`;
      verse.soundFile = soundPicturePath;
      yield _deleteFile(oldVerse.soundFile);
      yield _uploadFile(soundFile[0], soundPicturePath);
    }

    if (oldVerse.category !== verse.category) {
      const oldCategory = yield call(rsf.database.read, `categories/${oldVerse.category}`);
      const { selectedVerseKey, ...updatedCategory} = oldCategory;
      yield Promise.all([
        yield call(rsf.database.update, `categories/${oldVerse.category}`, updatedCategory),
        yield call(rsf.database.patch, `categories/${verse.category}`, { [key]: true })
      ]);
    }

    yield call(rsf.database.patch, `verses/${key}`, verse)
    yield put(updateVerses(key).success);
    yield put(setFormValues());
    yield put(toggleLoading(false));
  } catch (e) {
    console.error(e);
    yield put(updateVerses(key).failure);
    yield put(toggleLoading(false));
  }
}

function* deleteVerseSaga({ payload }) {
  const { id, verse } = payload;
  try {
    yield Promise.all([
      yield _deleteFile(verse.bigPicture),
      yield _deleteFile(verse.smallPicture),
      yield _deleteFile(verse.soundFile),
      yield call(rsf.database.delete, `verses/${id}`)
    ]);
    yield put(deleteVerse().success);
  } catch (e) {
    yield put(deleteVerse(e).failure);
  }
}

function* _uploadFile(file, path) {
  const task = yield call(
    rsf.storage.uploadFile,
    resourceRef(path),
    file
  );
  yield task;
}

function* _deleteFile(path) {
  yield call(rsf.storage.deleteFile, path);
}

export default function*() {
  yield all([
    takeLatest(CATEGORIES_GET_REQUEST, syncCategoriesSaga),
    takeLatest(VERSES_CREATE_REQUEST, addVerse),
    takeLatest(VERSES_GET_REQUEST, syncVersesSaga),
    takeLatest(VERSES_DELETE_REQUEST, deleteVerseSaga),
    takeLatest(VERSES_UPDATE_REQUEST, updateVerseSaga),
  ]);
}
