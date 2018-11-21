import { storage } from './firebase';

export const storageRef = storage.ref();

export const resourceRef = resource => storageRef.child(resource);
