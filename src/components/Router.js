import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const Approuter = ({ refreshUser, isLoggedin, userObj }) => {
  return (
    <Router>
      {isLoggedin ? <Navigation userObj={userObj}/>:null}
      <Routes>
        {isLoggedin ? (
          <>
            {" "}
            <Route path="/" element={<Home userObj={userObj}/>}>
              {" "}
            </Route>
            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}>
              {" "}
            </Route>
          </>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </Router>
  );
};
export default Approuter;
