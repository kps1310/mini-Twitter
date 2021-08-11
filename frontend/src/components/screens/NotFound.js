import React from "react";
import styled from "styled-components";
import { MainContext } from '../../Context';

// Components
import Nav from "../layout/Nav";
import MobileNav from "../layout/MobileNav";

// Styled Components

import { Container } from "../styles/app";

const Subcontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  max-width: 950px;
  width: 100%;

  .heading {
    font-size: 8rem;
    font-weight: bold;
  }

  p {
    font-size: 2rem;
  }
`;

const NotFound = () => {

  const myContext = React.useContext(MainContext);

  React.useEffect(() => {
    myContext.methods.setNav(-1);
  }, []);

  return (
    <>
      <MobileNav />
      <Container className="container">
        <Nav />
        <Subcontainer>
          <div className="heading">404</div>
          <p>Sorry this is unavailable</p>
        </Subcontainer>
      </Container>
    </>
  );
};

export default NotFound;
