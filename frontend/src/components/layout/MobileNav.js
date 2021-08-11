import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiHome, FiSettings } from "react-icons/fi";
import Profile from "../individual/Profile";
import { Navbutton } from "../styles/app";
import { MainContext } from "../../Context";
import { FiSearch } from "react-icons/fi";

const Container = styled.div`
  width: 100%;
  background: ${props => props.bg || "white"};
  color: ${props => props.color || "black"};
  padding: 6px;
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: 1px solid #ebebeb;
  position: sticky;
  display: none;
  flex-direction: column;
  top: 0;
  z-index: 4;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      margin: 0 8px;
      margin-left: 4px;
      margin-top: 2px; 
      color: #8a8a8a;
      display: none;
    }

    #search-mobile {
      display: none;
      width: 100%;
      height: 100%;
      padding: 8px 5px;
      font-size: 1.2rem;
      border: none;

      &:focus {
        outline: none;
      }
    }

    @media (max-width: 600px) {
      label {
        display: initial;
      }

      .primary {
        display: none;
      }

      #search-mobile {
        display: block;
      }
    }

  }

  ul {
    display: flex;
    justify-content: center;
    flex-direction: row;

    li {
      margin: 2px 4px;
    }
  }

  @media (max-width: 600px) {
    display: flex;
  }
`;

const MobileNav = () => {
  const myContext = React.useContext(MainContext);

  const jsxData = [
    {
      data: (
        <Link to="/">
          <div>
            <FiHome />
          </div>
        </Link>
      )
    },
    {
      data: (
        <Link to="/settings">
          <div>
            <FiSettings />
          </div>
        </Link>
      )
    },
    {
      data: (
        <Link to={ "/profiles/" + myContext.fetched.currentUser.username }>
          <Profile pic={myContext.fetched.currentUser.picture} />
        </Link>
      )
    }
  ];

  return (
    <Container>
      <div>
        <label htmlFor="searchMobile">
          <FiSearch />
        </label>
        <input
          type="text"
          name="search"
          id="search-mobile"
          placeholder="Search Jack"
          value={myContext.search}
          onChange={myContext.dataMethods.searchedUsers}
        ></input>
      </div>
      <ul className="navbar">
        {jsxData.map((e, i) => {
          if (i === myContext.nav) {
            return (
              <Navbutton className="active" key={i}>
                {e.data}
              </Navbutton>
            );
          } else {
            return <Navbutton key={i}>{e.data}</Navbutton>;
          }
        })}
      </ul>
    </Container>
  );
};

export default MobileNav;
