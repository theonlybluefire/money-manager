import React, { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//components
import DismissibleExample from "./main/Toast";
//firebase
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgoMjqs2soEsMlcgb3AztqjoDQuD5Dly8",
  authDomain: "moneyapp-5f530.firebaseapp.com",
  projectId: "moneyapp-5f530",
  storageBucket: "moneyapp-5f530.appspot.com",
  messagingSenderId: "800356072567",
  appId: "1:800356072567:web:b32b2359111e2acc761a72",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

function HandleLogin() {
  const [showToast, setshowToast] = useState('')
  const showToastFunc = () => setshowToast(<DismissibleExample message='Passwort oder Nutzername ist falsch'/>)
  const hideToastFunc = () => setshowToast('');
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    //login into user account
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        showToastFunc();
        setTimeout(() => {
          hideToastFunc();
        },3000);
      });
  }

  return (
    <div class="card text-center">
      <div class="card-header">Login</div>
      <div class="card-body">
        <h5 class="card-title">Du musst dich einloggen</h5>
        {/*Login form*/}
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="email" class="col-form-label">
              E-Mail
            </label>
            <input
              type="email"
              class="form-control"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div class="mb-3">
            <label for="password" class="col-form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <button type="submit" class="btn btn-success">
            Login
          </button>
        </form>
      </div>
      {showToast}
    </div>
  );
}

export default HandleLogin;
