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
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="display name"
          value={newDisplayName}
        ></input>
        <input type="submit" value="update profile"></input>
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
