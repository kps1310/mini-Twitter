import React from "react";
import styled from "styled-components";
import { ProfilePart } from "../styles/app";
import Profile from "../individual/Profile";
import { Link } from "react-router-dom";
import {MainContext} from '../../Context';

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

  return (
    <Container>
      <Profile w="45px" h="45px" newClass="tweet-prof" pic={props.pic} />
      <div className="content">
        <ProfilePart>
          <div className="part-one">
            <div className="tweet-username">
              <Link to={"/profiles/" + props.username || '1'}>{props.username || "No name"}</Link>
            </div>
          </div>
        </ProfilePart>
      </div>
    </Container>
  );
};

export default Post;
