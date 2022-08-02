import { authService, firebaseInstence } from "fbinstance";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "components/AuthForm";
const Auth = () => {
  const onSocialClick = async (event) => {
    const { name } = event.target;
    let provider;
    if (name === "google") {
      provider = new firebaseInstence.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstence.auth.GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };
  return (
    <div className="container text-center">
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="col-6 border border-primary p-5 rounded bg-primary">
          <h1 className="font-weight-bold">NWITTER</h1>
          <AuthForm></AuthForm>
          <div className="row">
            <button
              className="col btn btn-outline-success bg-white"
              name="google"
              onClick={onSocialClick}
            >
              Continue with Google
            </button>
            <button
              className="col btn btn-outline-success bg-white"
              name="github"
              onClick={onSocialClick}
            >
              Continue with github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
