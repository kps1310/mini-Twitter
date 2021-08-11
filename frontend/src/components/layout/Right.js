import React from "react";
import Search from "../individual/Search";
import styled from "styled-components";
import Suggestions from "../siderbars/Suggestions";

const Container = styled.div`
  position: relative;
  top: 0;
  padding: 0 1rem;
  border-left: 1px solid #ebebeb;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  padding-left: 1.2rem;

  @media (max-width: 1180px) {
    display: none;
  }
`;

const Right = () => {
  return (
    <Container>
      <Search />
      <Suggestions />
    </Container>
  );
};

export default Right;
