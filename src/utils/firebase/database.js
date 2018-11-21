import { database } from './firebase';

export const getCategories = () => database.ref('categories');

export const getVerses = () => database.ref('verses');