import * as bootstrap from "bootstrap";
import React from "react";
const { useState, useEffect, useRef } = React;

const { Toast } = bootstrap;

const ErrorToast = (message) => {
  const [messageToShow, setMessage] = useState("");
  setMessage(message);
  var [toast, setToast] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    var myToast = toastRef.current;
    var bsToast = bootstrap.Toast.getInstance(myToast);
    if (!bsToast) {
      // initialize Toast
      bsToast = new Toast(myToast, { autohide: true });
      // hide after init
      bsToast.hide();
      setToast(false);
    } else {
      //sdf
      // toggle
      toast ? bsToast.show() : bsToast.hide();
    }
  });

  return (
    <div className="py-2">
      <button
        className="btn btn-success"
        onClick={() => setToast((toast) => !toast)}
      >
        Toast {toast ? "hide" : "show"}
      </button>
      <div className="toast position-absolute m-4" role="alert" ref={toastRef}>
        <div className="toast-body">{messageToShow}</div>
      </div>
    </div>
  );
};
export default ErrorToast;
