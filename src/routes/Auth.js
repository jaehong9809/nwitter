import { authService, firebaseInstence } from "fbinstance";
import React, { useState } from "react";
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
    <div>
      <AuthForm></AuthForm>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with github
        </button>
      </div>
    </div>
  );
};

export default Auth;
