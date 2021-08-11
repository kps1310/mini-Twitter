import React from "react";
import styled from "styled-components";
import { MainContext } from "../../Context";

// Components
import Nav from "../layout/Nav";
import Right from "../layout/Right";
import MobileNav from "../layout/MobileNav";

// Styled Components
import { Container, Subcontainer } from "../styles/app";
import DeleteConfirm from "../modals/DeleteConfirm";
import Password from "../modals/Password";

const Main = styled.div`
  max-width: 600px;
  width: 100%;
  margin-bottom: 3rem;

  @media (max-width: 1180px) {
    max-width: 100%;
  }

  @media (max-width: 600px) {
    max-width: 600px;
  }
`;

const Titlebar = styled.div`
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

  @media (max-width: 600px) {
    display: none;
  }
`;

const Setting = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: ${props => props.bg || "white"};
  color: ${props => props.color || "black"};
  border-bottom: 1px solid ${props => props.border || "#ebebeb"};

  input {
    display: block;
  }

  .heading {
    font-weight: bold;
    font-size: 1.1rem;

    .sub {
      font-size: 12px;
      color: ${props => props.scolor || "#ababab"};
    }
  }

  #deleteAcc {
    color: red;
  }

  #changePassword {
    color: #0088ff;
  }

  #deleteAcc,
  #changePassword {
    background: transparent;
    border: none;
    font-weight: bold;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;

const Settings = () => {
  const [deleteAccount, setDeletion] = React.useState(false);
  const [changePassword, setChangePass] = React.useState(false);
  const myContext = React.useContext(MainContext);

  React.useEffect(() => {
    myContext.methods.setNav(1);
  }, []);

  const setDeleteAcc = () => {
    if (!deleteAccount) {
      setDeletion(true);
    } else {
      setDeletion(false);
    }
  };

  const setPasswordDialog = () => {
    if (!changePassword) {
      setChangePass(true);
    } else {
      setChangePass(false);
    }
  };

  return (
    <>
      <MobileNav />
      <Container className="container">
        <Nav />
        <Subcontainer>
          <Main>
            <Titlebar>Settings</Titlebar>
            <Setting>
              <label className="heading" htmlFor="darkMode">
                Turn on dark mode
                <br />
                <span className="sub">Enable light mode</span>
              </label>
              <input type="checkbox" name="darkMode" id="darkMode" />
            </Setting>
            <Setting>
              <label className="heading" htmlFor="deleteAcc">
                Delete account
                <br />
                <span className="sub">
                  Delete your account and data from jack...
                </span>
              </label>
              <input
                type="button"
                value="Delete Account..."
                name="deleteAcc"
                id="deleteAcc"
                onClick={setDeleteAcc}
              />
            </Setting>
            <Setting>
              <label className="heading" htmlFor="changePassword">
                Change Password
                <br />
                <span className="sub">Change login password</span>
              </label>
              <input
                type="button"
                value="Change Password..."
                name="changePassword"
                id="changePassword"
                onClick={setPasswordDialog}
              />
            </Setting>
          </Main>
          <Right />
        </Subcontainer>
      </Container>
      <DeleteConfirm show={deleteAccount} exit={setDeleteAcc} />
      <Password show={changePassword} exit={setPasswordDialog} />
    </>
  );
};

export default Settings;
