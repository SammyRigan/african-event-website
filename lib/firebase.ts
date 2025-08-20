import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace these with your actual Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyC2xggV_UuloTJETkCot2XFflImWnHb1JU",
    authDomain: "creatives-connect-afrika.firebaseapp.com",
    projectId: "creatives-connect-afrika",
    storageBucket: "creatives-connect-afrika.firebasestorage.app",
    messagingSenderId: "638724142162",
    appId: "1:638724142162:web:0ada5112d6cea70cfa9b8b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
