import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyA7dzmtJobwjy5kkaRtIM7Ixf55jal7C1M",
    authDomain: "daily-moments-94538.firebaseapp.com",
    projectId: "daily-moments-94538",
    storageBucket: "daily-moments-94538.appspot.com",
    messagingSenderId: "701115446482",
    appId: "1:701115446482:web:cb88760c57fde49b77690b"
  };

  const app = firebase.initializeApp(firebaseConfig);
  export const auth = app.auth();
  export const firestore = app.firestore();
  export const storage = app.storage();