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
    <div className="container">
    <form onSubmit={onSubmit} className="row justify-content-around bg-secondary">
      <input
        className="col-6 shadow-lg "
        onChange={onChange}
        value={nweet}
        type="text"
        placeholder="쓰고싶은말 쓰세요!"
        maxLength={120}

      ></input>
      <input  className="col-3" type="file" accept="image/*" onChange={onFileChange}></input>
      <button className="btn btn-primary col-2" type="submit" >올리기!</button>
      {attachment && (
        <div>
          <img src={attachment} className="img-thumbnail"></img>
          <button onClick={onClearePhotoClick}>clear!</button>
        </div>
      )}
    </form>
    </div>
  );
};
export default NweetFactory;
