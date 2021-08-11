import React from "react";
import styled from "styled-components";
import { Button } from "../styles/app";
import Profile from "../individual/Profile";
import { MainContext } from "../../Context";

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 0.5rem;
  background: ${props => props.bg || "white"};
  border-bottom: 10px solid
    ${props => props.borderColor || "rgb(230, 236, 240)"};

  .addNewTweet {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;

    .profile1 {
      margin-right: 10px;
    }

    .textarea {
      display: block;
      flex: 1;
      margin-top: 6px;
      font-size: 1.4rem;

      &[placeholder]:empty:before {
        content: attr(placeholder);
        color: #bababa;
      }

      &:focus {
        outline: none;

        &[placeholder]:empty:before {
          color: #cacaca;
        }
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: flex-end;
  }
`;

const New = () => {
  const tweetStateRef = React.useRef(null);
  const myContext = React.useContext(MainContext);

  React.useEffect(() => {
    changingState();
  }, []);

  const changingState = () => {
    tweetStateRef.current.addEventListener("input", e => {
      myContext.methods.currentTweet(e);
    });
  };

  return (
    <Container>
      <div className="addNewTweet">
        <Profile w="45px" h="45px" newClass="profile1" pic={myContext.fetched.currentUser.picture} />
        <div
          role="textbox"
          className="textarea"
          placeholder="What's up?"
          name="tweet"
          id="tweet"
          contentEditable="true"
          ref={tweetStateRef}
          suppressContentEditableWarning={true}
        >
        </div>
      </div>
      <div className="bottom">
        <Button onClick={e => myContext.dataMethods.addTweet()}>Post</Button>
      </div>
    </Container>
  );
};

export default New;
