import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAxFitSzIeYKuqx4GAPJjK5sXI7AskmwCY',
  authDomain: 'chirper2-b6981.firebaseapp.com',
  projectId: 'chirper2-b6981',
  storageBucket: 'chirper2-b6981.appspot.com',
  messagingSenderId: '831357483892',
  appId: '1:831357483892:web:3530454098826250150a21',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
