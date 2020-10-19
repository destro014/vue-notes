import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBUlPj9SRXq6B2LeMddafV0bkQRb02zUIU",
  authDomain: "destro-notes.firebaseapp.com",
  databaseURL: "https://destro-notes.firebaseio.com",
  projectId: "destro-notes",
  storageBucket: "destro-notes.appspot.com",
  messagingSenderId: "359133466712",
  appId: "1:359133466712:web:5607ae9ca4d7f3f1c9ba2d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore();
