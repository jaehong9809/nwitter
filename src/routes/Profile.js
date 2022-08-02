import { authService, dbService } from "fbinstance";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "@firebase/firestore";
import { updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile({ refreshUser, userObj }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorID", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
  };
  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  async function onSubmit(event) {
    event.preventDefault();
    if(userObj.displayName!==newDisplayName){
        await updateProfile(userObj, {displayName: newDisplayName});
        refreshUser();
    }
  }
  return (
    <div className="container row justify-content-around m-3">
      <form onSubmit={onSubmit} className="row justify-content-around p-5">
        <input className="col-6 shadow-lg"
          onChange={onChange}
          type="text"
          placeholder="display name"
          value={newDisplayName}
        ></input>
        <button type="submit" className="col-3 btn btn-primary">update profile</button>
      </form>
      <button onClick={onLogOutClick} className="col-3 btn btn-danger">Log Out</button>
    </div>
  );
}

export default Profile;
