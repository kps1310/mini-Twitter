import React from "react";
import styled from "styled-components";
import { ProfilePart, SmallBtn } from "../styles/app";
import Profile from "../individual/Profile";
import { Link } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { MainContext } from '../../Context';

const Container = styled.div`
  transition: 0.4s all;
  width: 100%;
  padding: 1rem;
  position: relative;
  display: flex;
  border-bottom: 1px solid #ebebeb;

  div {
    position: relative;
  }

  &:hover {
    background: #bac8ce1b;
  }

  .tweet-prof {
    margin-right: 10px;
  }

  .content {
    flex: 1;
  }
`;

const Post = props => {

  const myContext = React.useContext(MainContext);

  const likedOr = props.liked ? <MdFavorite /> : <MdFavoriteBorder />;
  const likedOrMethod = props.liked ? props.unlike : props.like;
  const color = props.liked ? "#ff3995" : "black";
  const likes = props.likes || 0;

  return (
    <Container>
      <Profile w="45px" h="45px" newClass="tweet-prof" pic={props.pic} />
      <div className="content">
        <ProfilePart>
          <div className="part-one">
            <div className="tweet-username">
              <Link to={"/profiles/" + props.username || '1'}>{props.username || "No name"}</Link> - {props.date || "10 Oct"}
            </div>
          </div>
        </ProfilePart>
        <div className="contentPart">{props.children || "Hello World"}</div>
        <SmallBtn colorHv="#ff3995" bgHv="ff39952a" className="m2" color={color} onClick={e => likedOrMethod(props.id, likes + 1)}>
          { likedOr }
        </SmallBtn> <small>{props.likes}</small>
      </div>
    </Container>
  );
};

export default Post;
