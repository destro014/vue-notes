
import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

// Initialize Firebase
var firebaseConfig = {
  
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore()