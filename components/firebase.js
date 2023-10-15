import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDX3H0OAHx7QsTiAsRf1Zw6ZESSnPX3kd4",
    authDomain: "ibuqua-app.firebaseapp.com",
    projectId: "ibuqua-app",
    storageBucket: "ibuqua-app.appspot.com",
    messagingSenderId: "402170474135",
    appId: "1:402170474135:web:f360b2f49a3b7adc3583d2",
    measurementId: "G-XTZM6B822F"
  };
  
  const firebaseSApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
   const db = firebaseSApp.firestore();
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const storage = firebase.storage();
  export default {auth, db, storage};
  export  {db, googleProvider};
  export  {auth};
