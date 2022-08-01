import Nweet from "components/Nweet";
import { dbService, storageService } from "fbinstance";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({ userObj }) => {
  const [nweet, Setnweet] = useState("");
  const [attachment, Setattachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentURL = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentURL = await getDownloadURL(ref(storageService, response.ref));
    }
    const newnweet = {
      text: nweet,
      createdAt: Date.now(),
      creatorID: userObj.uid,
      attachmentURL,
    };
    await addDoc(collection(dbService, "nweets"), newnweet);
    Setnweet("");
    Setattachment("");
  };
  const onChange = (event) => {
    const value = event.target.value;
    Setnweet(value);
  };
  const onFileChange = (event) => {
    const files = event.target.files;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const url = finishedEvent.currentTarget.result;
      Setattachment(url);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearePhotoClick = () => {
    Setattachment("");
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        value={nweet}
        type="text"
        placeholder="what's ont your mind?"
        maxLength={120}
      ></input>
      <input type="file" accept="image/*" onChange={onFileChange}></input>
      <input type="submit" value={"Tweet"}></input>
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px"></img>
          <button onClick={onClearePhotoClick}>clear!</button>
        </div>
      )}
    </form>
  );
};
export default NweetFactory;
