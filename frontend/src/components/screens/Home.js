import React from "react";
import { MainContext } from "../../Context";
import { Redirect } from "react-router-dom";

// Components
import Nav from "../layout/Nav";
import Right from "../layout/Right";
import Main from "../layout/Main";
import Search from "../layout/Search";

// Styled Components

import { Container, Subcontainer } from "../styles/app";
import MobileNav from "../layout/MobileNav";

const Home = () => {
  const myContext = React.useContext(MainContext);

  React.useEffect(() => {
    myContext.methods.setNav(0);
    myContext.dataMethods.allTweets();
  }, []);

  if (!myContext.isloggedIn) {
    return <Redirect to="/login" />;
  }

  if(myContext.search.length >= 1) {
    return <>
      <MobileNav />
      <Container className="container">
        <Nav />
        <Subcontainer>
          <Search />
          <Right />
        </Subcontainer>
      </Container>
    </>
  }

  return (
    <>
      <MobileNav />
      <Container className="container">
        <Nav />
        <Subcontainer>
          <Main />
          <Right />
        </Subcontainer>
      </Container>
    </>
  );
};

export default Home;
