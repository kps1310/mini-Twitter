import React from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #0000002a;
  z-index: 99;
  display: ${props => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  .modalMain {
    display: flex;
    width: 90%;
    position: relative;
    max-width: 350px;
    box-shadow: 0 2px 8px #0000002a;
    border-radius: 6px;
    overflow: hidden;
    flex-direction: column;
    height: 200px;
    background: ${props => props.bgModal || "white"};
    color: ${props => props.color || "black"};

    .modalToolbar {
      display: flex;
      width: 100%;
      padding: 0.5rem;
      padding-top: 0.8rem;
      border-bottom: 1px solid ${props => props.border || "#ebebeb"};
      justify-content: space-between;

      .modalTitle {
        font-weight: bold;
      }

      .modalClose button {
        background: transparent;
        font-weight: bold;
        border: none;
        font-size: 1.1rem;
        cursor: pointer;
        color: ${props => props.color || "black"};

        &:hover {
          color: ${props => props.primary || "#2393f5"};
        }
      }
    }

    .modalButtons {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;

      button {
        transition: 0.2s all;
        width: 50%;
        padding: 8px 0;
        border: none;
        background: none;
        cursor: pointer;
        border-top: 1px solid ${props => props.border || "#ebebeb"};
        border-left: 1px solid ${props => props.border || "#ebebeb"};

        &:hover {
          background: #00000007;
        }
      }
    }
  }
`;

const Modal = props => {
  return (
    <Container show={props.show}>
      <div className="modalMain">
        <div className="modalToolbar">
          <div className="modalTitle">{props.title || "Confirm ?"}</div>
          <div className="modalClose">
            <button className="closeButton" onClick={props.exit}>
              <FiX />
            </button>
          </div>
        </div>
        <div className="modalContent">{props.children}</div>
        <div className="modalButtons">
          <button onClick={props.exit}>Cancel</button>
          <button
            onClick={e => {
              props.ok(e);
              props.exit();
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Modal;
