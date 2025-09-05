import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "workathome-39c21.firebaseapp.com",
  projectId: "workathome-39c21",
  storageBucket: "workathome-39c21.firebasestorage.app",
  messagingSenderId: "172347672770",
  appId: "1:172347672770:web:c66cf535dd1e41424f135b",
  measurementId: "G-L78ZKFMVPD",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

const messaging = getMessaging(app);

export { messaging };

export default app;
