import Nweet from "components/Nweet";
import { dbService, storageService } from "fbinstance";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import NweetFactory from "components/NweetFactory";

function Home({ userObj }) {
  const [nweets, Setnweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      let nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      nweetArray.sort((a, b) => a.createdAt - b.createdAt);
      Setnweets(nweetArray);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj}></NweetFactory>
      <div class="b-example-divider"></div>
      <div>
        {nweets.map((item) => {
          return (
            <Nweet
              key={item.id}
              nweetObj={item}
              isOwner={item.creatorID === userObj.uid}
            ></Nweet>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
