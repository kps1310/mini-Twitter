import React from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { MainContext } from '../../Context';

const Container = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  margin-top: 1.5rem;
`;

const DeleteConfirm = props => {

  const myContext = React.useContext(MainContext);

  return (
    <Modal title="Deleting account..." show={props.show} exit={props.exit} ok={myContext.dataMethods.deleteUser}>
      <Container show={props.show}>
        Do you want to delete this account <br />
        this won't delete your posts
      </Container>
    </Modal>
  );
};

export default DeleteConfirm;
