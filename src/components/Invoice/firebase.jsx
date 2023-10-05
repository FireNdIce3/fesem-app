import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARVarzHCVuEfMFpL2aN9p-8bIn6ITk-q8",
  authDomain: "abheyshahpersonalproject.firebaseapp.com",
  databaseURL: "https://abheyshahpersonalproject-default-rtdb.firebaseio.com",
  projectId: "abheyshahpersonalproject",
  storageBucket: "abheyshahpersonalproject.appspot.com",
  messagingSenderId: "769083347589",
  appId: "1:769083347589:web:12069c4614006777e38fec",
  measurementId: "G-D159Y5Z10B",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
