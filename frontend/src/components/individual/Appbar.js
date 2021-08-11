import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { MainContext } from '../../Context';

const Container = styled.form`
  width: 100%;
  background: ${props => props.bg || "white"};
  color: ${props => props.color || "black"};
  padding: 12px;
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: 1px solid #ebebeb;
  position: sticky;
  top: 0;
  z-index: 4;

  @media (max-width: 1180px) {
    padding: 5px;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      margin-top: 2px;
      margin-right: 8px;
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

    @media (max-width: 1180px) {

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

  @media(max-width: 600px) {
    display: none;
  }
`;

const Appbar = props => {

  const myContext = React.useContext(MainContext);

  return (
    <Container>
      <div className="toolbar">
        <div className="primary">Home</div>
        <label htmlFor="searchMobile">
        <FiSearch />
        </label>
        <input
          type="search"
          name="searchMobile"
          id="search-mobile"
          placeholder="Search Jack"
          value={myContext.search}
          onChange={myContext.methods.setSearch}
        ></input>
      </div>
    </Container>
  );
};

export default Appbar;
