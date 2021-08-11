import React from "react";
import New from "../post/New";
import Appbar from "../individual/Appbar";
import Post from "../post/Post";
import { MainContext } from "../../Context";

const Main = () => {
  const myContext = React.useContext(MainContext);

  return (
    <div className="main-container">
      <Appbar />
      <div id="newTweet"></div>
      <New />
      {myContext.fetched.allTweets.map((i, index) => {
        return (
          <Post
            username={i.ownerName}
            like={myContext.dataMethods.likeTweet}
            unlike={myContext.dataMethods.unlikeTweet}
            liked={i.liked}
            id={i._id}
            likes={i.likedBy.length}
            key={index}
            pic={i.profilePic}
          >
            {i.content}
          </Post>
        );
      })}
    </div>
  );
};

export default Main;
