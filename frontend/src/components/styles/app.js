import styled from "styled-components";

export const Button = styled.button`
  transition: 0.2s all;
  display: inline-block;
  padding: 10px 15px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  font-size: 1.1rem;
  border-radius: 40px;
  color: ${props => props.color || "white"};
  background: ${props => props.bg || "#2c9cff"};

  &:hover {
    background: #1b7ace;
  }

  &:focus {
    outline: none;
  }
`;

export const BtnDiv = styled.div`
  width: 100%;
  .btn {
    width: 100%;
    text-align: center;
    transition: 0.2s all;
    display: inline-block;
    padding: 10px 15px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    font-size: 1.1rem;
    border-radius: 40px;
    color: ${props => props.color || "white"};
    background: ${props => props.bg || "#2c9cff"};

    &:hover {
      background: #1b7ace;
    }

    &:focus {
      outline: none;
    }

    @media (max-width: 1180px) {
      width: auto;
      padding: 10px 16px;
      margin: 9px 0;
      border-radius: 50%;
    }
  }
`;

// Small Button

export const SmallBtn = styled.button`
  transition: 0.2s all;
  background: transparent;
  cursor: pointer;
  color: ${props => props.color || "black"};
  border: none;
  padding: 5px 8px;
  padding-top: ${props => props.mgt || "10px"};
  border-radius: 50%;

  &.m2 {
    margin-left: -8px;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${props => props.colorHv || "#2393f5"};
  }
  &:active {
    background: ${props => props.colorHv + "2a" || "#2393f52a"};
  }
`;

export const Textarea = styled.textarea`
  display: inline-block;
  padding: 8px 12px;
  font-weight: bold;
  color: ${props => props.color || "black"};
`;

export const Bigbutton = styled.button`
  transition: 0.2s all;
  display: block;
  width: 100%;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  font-weight: bold;
  color: ${props => props.color || "white"};
  background: ${props => props.bg || "#77bfff"};

  &:focus {
    outline: none;
  }

  &:hover {
    background: #1392ff;
  }

  &:active {
    background: #226eb1;
  }
`;

export const Card = styled.div`
  background: ${props => props.bg || "white"};
  color: ${props => props.color || "black"};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgb(214, 214, 214);
`;

export const CardForm = styled.form`
  background: ${props => props.bg || "white"};
  color: ${props => props.color || "black"};
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgb(214, 214, 214);

  div {
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem;
    justify-content: center;
    align-items: center;

    label {
      color: #878787;
      margin: 0.3rem;
      display: flex;
      margin-bottom: 1rem;
      justify-content: center;
      align-items: center;
      border-bottom: 2px solid #c7c7c7;

      input {
        border: none;
        padding: 5px;
        color: #878787;

        &::placeholder {
          color: #878787;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }
`;

export const BrownContainer = styled.div`
  background: ${props => props.bg || "#e2e2e3"};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  background: ${props => props.bg};
`;

export const Subcontainer = styled.div`
  display: flex;
  position: relative;
  max-width: 950px;
  width: 100%;

  @media (max-width: 1180px) {
    max-width: 100%;
  }
`;

export const Navbutton = styled.li`
  display: block;
  margin: 9px 0;

  a {
    transition: 0.2s all;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 40px;
    cursor: pointer;
    font-weight: 550;
    color: black;
    font-size: 1.3rem;

    div:first-child {
      display: flex;
      margin-right: 12px;
      font-size: 1.5rem;
    }

    div:last-child {
      display: flex;
      justify-content: center;
    }

    &:hover {
      background: #2393f526;
      color: ${props => props.hover || "#2393f5"};
    }

    @media (max-width: 1180px) {
      border-radius: 50%;
      padding: 12px;
      div:first-child {
        margin-right: 0;
      }
    }
  }

  &.active {
    a {
      color: ${props => props.activeColor || "#2393f5"};
    }
  }
`;

export const Logobutton = styled.span`
  display: block;

  a {
    transition: 0.2s all;
    display: block;
    padding: 5px 15px;
    border-radius: 50%;
    cursor: pointer;
    font-weight: bold;
    color: #2393f5;
    font-size: 1.6rem;

    &:hover {
      background: #2393f526;
      color: ${props => props.hover || "#2393f5"};
    }
  }
`;

// Tweets

export const ProfilePart = styled.div`
  display: flex;
  justify-content: space-between;

  .part-one {
    display: flex;
    align-items: center;
    height: 100%;

    .tweet-username {
      color: ${props => props.dColor || "#9a9a9a"};
      a {
        font-weight: bold;
        text-decoration: none;
        color: ${props => props.color || "black"};

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
