import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBUlPj9SRXq6B2LeMddafV0bkQRb02zUIU",
  authDomain: "destro-notes.firebaseapp.com",
  databaseURL: "https://destro-notes.firebaseio.com",
  projectId: "destro-notes",
  storageBucket: "destro-notes.appspot.com",
  messagingSenderId: "359133466712",
  appId: "1:359133466712:web:5607ae9ca4d7f3f1c9ba2d",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
