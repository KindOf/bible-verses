import { auth } from './firebase';

// Sign in
export const doSignIn = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
  auth.signOut();