import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAmhiDTZoskOOLQrkpsGHO4SZs6G5rpYhk',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'memory-game-4a39a.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'memory-game-4a39a',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'memory-game-4a39a.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '20740521980',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:20740521980:web:a34e3eb973ae83ab307c79',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-SDPV9DNW6M'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
