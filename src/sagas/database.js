import { call, put, takeLatest, all, take } from 'redux-saga/effects';

import {
  getCategories, createVerses, toggleLoading, getVerses, deleteVerse, updateVerses,
  setFormValues, createCategory, deleteCategory
} from '../actions';

import { rsf } from '../utils/firebase/firebase';
import { resourceRef } from '../utils/firebase/storage';
import { getRef } from '../utils/firebase'
import { AppToaster } from '../utils/Toaster';

import {
  CATEGORIES_GET_REQUEST,
  CATEGORIES_CREATE_REQUEST,
  CATEGORIES_DELETE_REQUEST,
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

function* createCategorySaga({ payload }) {
  const categoryPath = `categories/${payload}`;
  try {
    const key = yield call(setData, categoryPath, { initial: true });
    AppToaster.show({ message: 'Category created.', intent: 'success', timeout: 2000 });
    yield put(createCategory(key).success);
  } catch(e) {
    AppToaster.show({ message: e.message, intent: 'danger' });
    yield put(createCategory(e).failure);
  }

}

function* deleteCategorySaga({ payload }) {
  const { key, category } = payload;
  const categoryPath = `categories/${key}`;

  const isCategoryEmpty = Object.keys(category).length === 1
    && Object.keys(category)[0] === 'initial';

  try {
    if (!isCategoryEmpty) {
      throw new Error('Category is not empty');
    }

    yield call(rsf.database.delete, categoryPath);
    AppToaster.show({ message: 'Category deleted.', intent: 'success', timeout: 2000 });
    yield put(deleteCategory().success);
  } catch (e) {
    AppToaster.show({ message: e.message, intent: 'danger' });
    yield put(deleteCategory().failure);
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
    AppToaster.show({ message: 'Verse created', intent: 'success', timeout: 2000 });
  } catch (e) {
    yield put(createVerses(e.message).failure);
    yield put(toggleLoading(false));
    AppToaster.show({ message: e.message, intent: 'danger' });
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
      const soundFilePath = `Audio/${generateRandomKey()}-${soundFile[0].name}`;
      verse.soundFile = soundFilePath;
      if (oldVerse.soundFile !== '') {
        yield _deleteFile(oldVerse.soundFile);
      }
      yield _uploadFile(soundFile[0], soundFilePath);
    }

    if (soundFile === '' && oldVerse.soundFile !== '') {
      yield _deleteFile(oldVerse.soundFile);
      verse.soundFile = '';
    }

    if (oldVerse.category !== verse.category) {
      const oldCategory = yield call(rsf.database.read, `categories/${oldVerse.category}`);
      // eslint-disable-next-line no-unused-vars
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
    AppToaster.show({ message: 'Verse updated', intent: 'success', timeout: 2000 });
  } catch (e) {
    AppToaster.show({ message: e.message, intent: 'danger' });
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
      yield call(rsf.database.delete, `categories/${verse.category}/${id}`),
      yield call(rsf.database.delete, `verses/${id}`)
    ]);
    yield put(deleteVerse().success);
    AppToaster.show({ message: 'Verse deleted', intent: 'success', timeout: 2000 });
  } catch (e) {
    AppToaster.show({ message: e.message, intent: 'danger' });
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

function* setData(path, data) {
  const ref = getRef(path);
  const result = yield call([ref, ref.set], data)

  return result;
}

export default function*() {
  yield all([
    takeLatest(CATEGORIES_GET_REQUEST, syncCategoriesSaga),
    takeLatest(VERSES_CREATE_REQUEST, addVerse),
    takeLatest(VERSES_GET_REQUEST, syncVersesSaga),
    takeLatest(VERSES_DELETE_REQUEST, deleteVerseSaga),
    takeLatest(VERSES_UPDATE_REQUEST, updateVerseSaga),
    takeLatest(CATEGORIES_CREATE_REQUEST, createCategorySaga),
    takeLatest(CATEGORIES_DELETE_REQUEST, deleteCategorySaga)
  ]);
}
