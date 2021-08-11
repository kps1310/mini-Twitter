import React from "react";
import styled from "styled-components";
import Logo from "../siderbars/Logo";
import { Navbutton } from "../styles/app";
import { Link } from "react-router-dom";
import { FiHome, FiSettings } from "react-icons/fi";
import { BtnDiv } from "../styles/app";
import Profile from "../individual/Profile";
import { MainContext } from "../../Context";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0;
  padding-right: 2rem;
  width: 240px;
  height: 100vh;
  position: sticky;
  top: 0;
  border-right: 1px solid #ebebeb;

  @media (max-width: 1180px) {
    width: auto;
    padding: 1rem;
  }

  @media (max-width: 600px) {
    display: none;
  }

  ul li a div.secondary,
  .btn .secondary {
    @media (max-width: 1180px) {
      display: none;
    }
  }

  .btn .primary {
    display: none;
    @media (max-width: 1180px) {
      display: inline-block;
    }
  }
`;

const Left = () => {
  const myContext = React.useContext(MainContext);

  const jsxData = [
    {
      data: (
        <Link to="/">
          <div>
            <FiHome />
          </div>
          <div className="secondary">Home</div>
        </Link>
      )
    },
    {
      data: (
        <Link to="/settings">
          <div>
            <FiSettings />
          </div>
          <div className="secondary">Settings</div>
        </Link>
      )
    },
    {
      data: (
        <Link to={ "/profiles/" + myContext.fetched.currentUser.username }>
          <Profile pic={myContext.fetched.currentUser.picture} />
          <div className="secondary">Profile</div>
        </Link>
      )
    }
  ];

  return (
    <Container>
      <Logo />
      <ul className="navbar">
      {
        jsxData.map((e, i) => {
          if(i === myContext.nav) {
            return (
              <Navbutton className="active" key={i}>
                {e.data}
              </Navbutton>
            )
          }else {
            return (
              <Navbutton key={i}>
                {e.data}
              </Navbutton>
            )
          }
        })
      }
      </ul>
      <BtnDiv className="btn-wrapper">
        <a href="/#newTweet" className="btn btn-primary">
          <span className="primary">P</span>
          <span className="secondary">Post</span>
        </a>
      </BtnDiv>
    </Container>
  );
};

export default Left;
