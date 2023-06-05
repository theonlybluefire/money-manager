import React, { useState, useEffect } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
//components
import HandleLogin from './HandleLogin';
import MainPage from './main/MainPage';
//firebase     
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBgoMjqs2soEsMlcgb3AztqjoDQuD5Dly8",
      authDomain: "moneyapp-5f530.firebaseapp.com",
      projectId: "moneyapp-5f530",
      storageBucket: "moneyapp-5f530.appspot.com",
      messagingSenderId: "800356072567",
      appId: "1:800356072567:web:b32b2359111e2acc761a72"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

function IfLoggedIn() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      {user ? (
        <MainPage/>
      ) : (
        <HandleLogin/>
      )}
    </div>
  );
}

export default IfLoggedIn