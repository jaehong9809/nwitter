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
    <div>
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
        <div>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentURL && (
            <img src={nweetObj.attachmentURL} width="50px" height="50px"></img>
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}> Delete nweet</button>
              <button onClick={toggleEditing}>update nweet</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Nweet;
