import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA7YBo-skegxrJ_C674MbOXPYbp8Jed5RY',
  authDomain: 'chirper-8178a.firebaseapp.com',
  projectId: 'chirper-8178a',
  storageBucket: 'chirper-8178a.appspot.com',
  messagingSenderId: '181864712167',
  appId: '1:181864712167:web:8fe86b9052d4f6bd8f9f42',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
