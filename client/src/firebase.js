import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "video-3c2ab.firebaseapp.com",
  projectId: "video-3c2ab",
  storageBucket: "video-3c2ab.appspot.com",
  messagingSenderId: "1030020447480",
  appId: "1:1030020447480:web:ae2e80e0129966ba1d0f0d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;