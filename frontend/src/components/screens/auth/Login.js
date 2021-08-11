import React from "react";
import { CardForm, Bigbutton, BrownContainer } from "../../styles/app";
import { FiUser, FiKey } from "react-icons/fi";
import { Link, Redirect } from "react-router-dom";
import { MainContext } from "../../../Context";

const Login = () => {
  const myContext = React.useContext(MainContext);

  if(myContext.isloggedIn) {
    return <Redirect to="/" />
  }

  return (
    <>
      <BrownContainer>
        <CardForm>
          <div>
            <label htmlFor="username">
              <FiUser />
              <input
                type="text"
                name="username"
                id="username"
                aria-label="username"
                aria-required="true"
                placeholder="Username"
                onChange={myContext.methods.setLogin}
                value={myContext.login.username}
              />
            </label>
            <br />
            <label htmlFor="password">
              <FiKey />
              <input
                type="password"
                name="password"
                id="password"
                aria-label="password"
                aria-required="true"
                placeholder="Password"
                onChange={myContext.methods.setLogin}
                value={myContext.login.password}
              />
            </label>
          </div>
          <Bigbutton type="submit" onClick={myContext.dataMethods.login}>Login</Bigbutton>
        </CardForm>
        <span id="sign-text">
          New User. <Link to="/signup">Sign Up</Link>
        </span>
      </BrownContainer>
    </>
  );
};

export default Login;
