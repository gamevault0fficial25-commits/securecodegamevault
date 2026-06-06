// ============================================================
// firebase-config.js
// Single source of truth for Firebase initialization.
// Import this in any module that needs Firestore.
// ============================================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey:            'AIzaSyCMKY0LTMwcVW__SkhxGBz3rcvjvWjUGtU',
  authDomain:        'gamevault-380f7.firebaseapp.com',
  projectId:         'gamevault-380f7',
  storageBucket:     'gamevault-380f7.firebasestorage.app',
  messagingSenderId: '533825597908',
  appId:             '1:533825597908:web:598d526a9dc4c6ea6de641',
  measurementId:     'G-SKDJVGJ4S0'
};

const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);
