import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgoMjqs2soEsMlcgb3AztqjoDQuD5Dly8",
  authDomain: "moneyapp-5f530.firebaseapp.com",
  projectId: "moneyapp-5f530",
  storageBucket: "moneyapp-5f530.appspot.com",
  messagingSenderId: "800356072567",
  appId: "1:800356072567:web:b32b2359111e2acc761a72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const Handle = (note) => {
    const moneyTable = {
        "1":5,
        "1-":4,
        "1-2":3,
        "2+":2,
        "2":1,
        "2-":0

    }
    let money = moneyTable[note]
    return money
}

export default Handle