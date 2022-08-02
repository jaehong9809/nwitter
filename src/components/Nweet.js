import { dbService, storageService } from "fbinstance";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, Setediting] = useState();
  const [neqNweet, SetnewNweet] = useState(nweetObj.text);
  async function onDeleteClick() {
    const ok = window.confirm("Are you sure you want to delete this one?");
    if (ok) {
      await deleteDoc(doc(dbService, "nweets", `${nweetObj.id}`));
      const desertRef = ref(storageService, nweetObj.attachmentUrl);
      await deleteObject(desertRef);
    }
  }
  function onChangeText(event) {
    SetnewNweet(event.target.value);
  }
  function onSubmit(event) {
    event.preventDefault();
    const ok = window.confirm("Are you sure you want to update this one?");
    console.log(ok);
    if (ok) {
      updateDoc(doc(dbService, "nweets", `${nweetObj.id}`), {
        text: neqNweet,
      });
    }
    Setediting(false);
  }
  const toggleEditing = () => Setediting((prev) => !prev);
  return (
    <div className="container shadow-lg">
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChangeText}
              type="text"
              value={neqNweet}
              required
            ></input>
            <button type="submit">바꾸기</button>
          </form>
          <button onClick={toggleEditing}>CANCEL</button>
        </>
      ) : (
        <div className="row justify-content-start p-3 bg-secondary ">
          <h4 className="col-6 border-bottom border-black rounded h-auto text-white">{nweetObj.text}</h4>
          {nweetObj.attachmentURL && (
            <img src={nweetObj.attachmentURL} className="rounded mx-auto d-block"></img>
          )}
          {isOwner && (
            <div className="col-6">
              <div className="row justify-content-around">
              <button class="btn btn-primary col-5" onClick={toggleEditing}>update nweet</button>
              <button class="btn btn-primary mx-1 col-5" onClick={onDeleteClick}> Delete nweet</button>
              </div>
            </div>
          )}
        </div>
      )}
      

    </div>
  );
};

export default Nweet;
