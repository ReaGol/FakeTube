import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAhVwJkQO_V5mqaS-8f_kN1wD2Lk05LDXI",
  authDomain: "video-3c2ab.firebaseapp.com",
  projectId: "video-3c2ab",
  storageBucket: "video-3c2ab.appspot.com",
  messagingSenderId: "1030020447480",
  appId: "1:1030020447480:web:ae2e80e0129966ba1d0f0d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;