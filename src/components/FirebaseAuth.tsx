// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "./StyledFirebaseAuth";
import App from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../store/userReducer";
// Configure Firebase.
const config = {
  apiKey: "AIzaSyD29iSupGaAQ33FJPyDKIFMIV2YFmrCwmM",
  authDomain: "simple-weather-b2b4d.firebaseapp.com",
  // ...
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

const FirebaseAuth = (props: any) => {
  const userId = useSelector((state: any) => state.user.userId);
  const dispatch = useDispatch();

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user: any) => {
        dispatch(setUserId(user?.uid));
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <div>
      {!userId ? (
        <div className="mx-auto max-w-sm my-8">
          <p>Please sign-in:</p>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      ) : (
        <div>
          <div className="text-right">
            <a
              className="px-4 py-2 rounded-2xl bg-sky-300 hover:bg-sky-400 cursor-pointer text-white"
              onClick={() => {
                dispatch(setUserId(null));
                firebase.auth().signOut();
              }}
            >
              Sign-out
            </a>
          </div>
          {props.children}
        </div>
      )}
    </div>
  );
};

export default FirebaseAuth;
