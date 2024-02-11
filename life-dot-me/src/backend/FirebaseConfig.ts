// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS43RTlm_iTbslFqlKCID9KYxYBA6ObOk",
  authDomain: "lifedotme-28a11.firebaseapp.com",
  projectId: "lifedotme-28a11",
  storageBucket: "lifedotme-28a11.appspot.com",
  messagingSenderId: "1087730355821",
  appId: "1:1087730355821:web:5e3f44e95293673bd1f964",
  measurementId: "G-82S9J5Z7PJ",
  databaseURL: "https://lifedotme-28a11-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);

export { firebaseConfig, app };