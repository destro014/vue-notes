
import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

// Initialize Firebase
var firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "name.firebaseapp.com",
  databaseURL: "https://name.firebaseio.com",
  projectId: "vue-notes"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore()
