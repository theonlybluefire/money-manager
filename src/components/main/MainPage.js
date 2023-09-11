//React, Bootstrap
import React, { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.js";
import "bootstrap";// Import the functions you need from the SDKs you need
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
  remove
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
//components
import Handle from "../Handle";
import { HandleDB, ShowDB } from "./readDB.js";
import ErrorToast from "./Toast";
import writeUserData from "../writeDB";
import "../../index.css";
import { DeleteData } from "../DeleteData";
import DismissibleExample from "./Toast";
//firebase
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
//Main Page
const MainPage = () => {
  //handle Input
  const [note, setNote] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    console.log(typeof Handle(note));
    if (typeof Handle(note) == "string" || typeof Handle(note) == "number") {
      //validation input
      let output = Handle(note);
      writeUserData(note);
      setNote(""); //rest input
    }
  }
  const Logout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  //del data function not
    const [showToast, setshowToast] = useState('')
    const showToastFunc = () => setshowToast(<DismissibleExample message='Ihre noten wurden erfolgreich gelöscht'/>)
    const hideToastFunc = () => setshowToast('')
    const Del = () => {
      auth.onAuthStateChanged((user) => {
        if (user != null) {
          const displayName = user.displayName;
          const email = user.email;
          const photoURL = user.photoURL;
          const emailVerified = user.emailVerified;
          const userId = user.uid;
          const db = getDatabase();
          //del data
          const dbRef = ref(db, "users/" + userId);
          remove(dbRef)
          .then(() => {
              console.log('Data under UID',userId,' deleted successfully.');
              showToastFunc();
              setTimeout(() => {
                hideToastFunc();
              },2000)
            })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
        } else {
          console.log("Not logged in ");
        }
      });
    };
  
  
  return (
    <div>
      <div class="text-center">
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#staticBackdrop"
        aria-controls="staticBackdrop"
      >
        History
      </button>
      </div>

      <div
        class="offcanvas offcanvas-start"
        data-bs-backdrop="static"
        tabindex="-1"
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="staticBackdropLabel">
            History
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div>
            {/* Render History (read DB) */}
            <ShowDB/>
          </div>
        </div>
      </div>
      <div class="DBOutput">
        <HandleDB />
      </div>
      {/*Form */}
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label"></label>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Note(1-6)"
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
          />
          <button class="btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div>
      <button class="btn btn-danger col-5" onClick={Logout}>
        Logout
      </button>
      {/*Del date component*/}
        <button class="btn btn-danger col-5 float-right" onClick={Del}>
          Delete Data
        </button>

      {/*Toast cooming soon*/}
      </div>        
      {showToast}

    </div>
  );
};
export default MainPage;
