import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAmhiDTZoskOOLQrkpsGHO4SZs6G5rpYhk",
  authDomain: "memory-game-4a39a.firebaseapp.com",
  projectId: "memory-game-4a39a",
  storageBucket: "memory-game-4a39a.firebasestorage.app",
  messagingSenderId: "20740521980",
  appId: "1:20740521980:web:a34e3eb973ae83ab307c79",
  measurementId: "G-SDPV9DNW6M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };