import React from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { MainContext } from '../../Context';

const Container = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;

  .passwordContainer {
    margin: 1rem 0;
    width: 100%;

    input {
      width: 100%;
      padding: 7px;
      border: none;
      border-radius: 40px;
      overflow: hidden;
      background: ${props => props.inputBg || "rgb(230, 236, 240)"};
    }

    input:last-of-type {
      margin-top: 1rem;
    }
  }
`;

const Password = props => {

  const myContext = React.useContext(MainContext);

  return (
    <Modal title="Enter New Password..." show={props.show} exit={props.exit} ok={myContext.dataMethods.resetPass}>
      <Container show={props.show}>
        <div className="passwordContainer">
          <input
            type="password"
            name="mainPassword"
            id="mainPassword"
            placeholder="New Password *"
            onChange={myContext.methods.settingsData}
            value={myContext.settingsData.changePassword.main}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm New Password *"
            onChange={myContext.methods.settingsData}
            value={myContext.settingsData.changePassword.confirmation}
          />
        </div>
      </Container>
    </Modal>
  );
};

export default Password;
