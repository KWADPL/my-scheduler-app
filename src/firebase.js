import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAG4ArB8cepFy6GhhHQ8_EVXH36aaz5cHM",
  authDomain: "kalendarz-a5e33.firebaseapp.com",
  projectId: "kalendarz-a5e33",
  storageBucket: "kalendarz-a5e33.appspot.com",
  messagingSenderId: "880382005040",
  appId: "1:880382005040:web:5ee0d96fa55bb6f82d02f5",
  measurementId: "G-RTFDHQY3CR",
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const analytics = getAnalytics(app);

export { db };
