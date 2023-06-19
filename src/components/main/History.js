import React, { useState, useEffect } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
  import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
  //components
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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



const LoadHistory = () => {
  //load history
  const [setHistory, History] = useState('')
  function load() {
    console.log('loadHistory')
    auth.onAuthStateChanged(user => {
      if(user != null) {
        console.log('logged in ')
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const userId = user.uid;
        const db = getDatabase();
        const getHistory = ref(db, 'users/' + userId + '/history');
          console.log('passed 1')
          onValue(getHistory, (snapshot) => {
          const data = snapshot.value();
          console.log('passed 2')
          console.log(data)
          setHistory(data)
        });
    }
    else {
        console.log('Not logged in ')
    }
  

  },700)
}
  load()
    

    return (
      <div>
        {History}
      </div>
    )
}

export default LoadHistory

