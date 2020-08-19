import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyCFSUBg00MPQ_nJxn-m4Msua4xSXCGExd4",
  authDomain: "goalhut-9fae1.firebaseapp.com",
  databaseURL: "https://goalhut-9fae1.firebaseio.com",
  projectId: "goalhut-9fae1",
  storageBucket: "goalhut-9fae1.appspot.com",
  messagingSenderId: "259808152386",
  appId: "1:259808152386:web:284c4f56095601394fd6db"
};
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
