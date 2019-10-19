import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC5Z0qklsIrYRJL1tPJfWLn8zAuBKIiRh0",
  authDomain: "coderhouse-wainfeld.firebaseapp.com",
  databaseURL: "https://coderhouse-wainfeld.firebaseio.com",
  projectId: "coderhouse-wainfeld",
  storageBucket: "coderhouse-wainfeld.appspot.com",
  messagingSenderId: "887210047996",
  appId: "1:887210047996:web:be40a4f10b8abb35731a79",
  measurementId: "G-491RFKQMXJ"
};

firebase.initializeApp (firebaseConfig);

export const auth = firebase.auth ();
export const db = firebase.firestore ();