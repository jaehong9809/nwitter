import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { authService, firebaseInstence } from "fbinstance";
import 'bootstrap/dist/css/bootstrap.min.css';
const AuthForm = () => {
  const [email, setEmail] = useState("");

  const [pw, setPw] = useState("");
  const [newaccount, Setnewaccount] = useState(true);
  const [error, SetError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPw(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newaccount) {
        const data = await createUserWithEmailAndPassword(
          authService,
          email,
          pw
        );
        console.log(data);
      } else {
        const data = await signInWithEmailAndPassword(authService, email, pw);
        console.log(data);
      }
    } catch (error) {
      SetError(error.message);
    }
  };
  const toggle = () => Setnewaccount((prev) => !prev);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <p><input
          onChange={onChange}
          name="email"
          type="email"
          placeholder="Email"
          required="required"
          value={email}
        ></input></p>
        <p><input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="password"
          required="required"
          value={pw}
        ></input></p>
        <input
          type="submit"
          value={newaccount ? "Create Account" : "Log In"}
        ></input>
        {error}
      </form>
      <h2 className="text-white" onClick={toggle}>{newaccount ? "sign  in" : "Create Account"}</h2>
    </div>
  );
};
export default AuthForm;
