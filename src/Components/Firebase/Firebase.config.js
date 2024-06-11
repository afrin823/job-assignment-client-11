import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsUN2KQPRzOEmQSf73U5W4rAgKOyJSM8E",
  authDomain: "job-assignment-11.firebaseapp.com",
  projectId: "job-assignment-11",
  storageBucket: "job-assignment-11.appspot.com",
  messagingSenderId: "365368686631",
  appId: "1:365368686631:web:0ab29f9d1c074c60653602"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
