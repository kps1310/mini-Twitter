import React from "react";
import Appbar from "../individual/Appbar";
import User from '../individual/User';
import { MainContext } from "../../Context";

const Search = () => {
  const myContext = React.useContext(MainContext);

  return (
    <div className="main-container">
      <Appbar />
      {myContext.fetched.searchedUsers.map((i, index) => {
        return (
          <User
            username={i.username}
            id={i._id}
            key={index}
            pic={i.profilePic}
          >
          </User>
        );
      })}
    </div>
  );
};

export default Search;
