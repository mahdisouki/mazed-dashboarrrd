import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBChF6WZ2xHWcZZgZuwY-JTymUhB4Oc-qw",
  authDomain: "mazed-7c0df.firebaseapp.com",
  projectId: "mazed-7c0df",
  storageBucket: "mazed-7c0df.appspot.com",
  messagingSenderId: "436903319495",
  appId: "1:436903319495:web:f2a2f197c7b69f2ec72be2"
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Retrieve firebase messaging instance
const messaging = getMessaging(app);

export { messaging };
