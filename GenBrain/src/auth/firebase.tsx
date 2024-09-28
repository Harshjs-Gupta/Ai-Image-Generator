import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdiaNeymikt-Fz_xb-m36sAIg9y5hzYBY",
  authDomain: "genbrain-e9de6.firebaseapp.com",
  projectId: "genbrain-e9de6",
  storageBucket: "genbrain-e9de6.appspot.com",
  messagingSenderId: "273253601970",
  appId: "1:273253601970:web:1d1c766360f87887c46fab",
  measurementId: "G-VMRSPN1Z2H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
