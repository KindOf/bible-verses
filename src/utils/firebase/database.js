import { database } from './firebase';

export const getCategories = () => database.ref('categories');