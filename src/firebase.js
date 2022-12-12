import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDuE6q8fXNL5-lPpBvHYTA0lip5U026240',
  authDomain: 'house-market-ee9f6.firebaseapp.com',
  projectId: 'house-market-ee9f6',
  storageBucket: 'house-market-ee9f6.appspot.com',
  messagingSenderId: '793111193723',
  appId: '1:793111193723:web:33388b097a5569d5fe9ade',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
