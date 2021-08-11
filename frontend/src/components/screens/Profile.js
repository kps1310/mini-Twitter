import React from "react";
import styled from "styled-components";
import { MainContext } from "../../Context";

// Components
import Nav from "../layout/Nav";
import ProfilePicture from "../individual/Profile";

// Styled Components

import { Container } from "../styles/app";
import MobileNav from "../layout/MobileNav";
import Right from "../layout/Right";

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

export const Subcontainer = styled.div`
  display: flex;
  position: relative;
  max-width: 950px;
  width: 100%;
  color: ${props => props.color || "black"};

  @media (max-width: 1180px) {
    max-width: 100%;
  }

  .followBtn {
    display: ${props => (props.currentUser ? "none" : "inline-block")};
  }

  .saveBtn {
    display: ${props => (props.currentUser ? "inline-block" : "none")};
  }

  .followBtn,
  .saveBtn {
    transition: 0.2s all;
    border: none;
    background: #2393f5;
    border-radius: 3px;
    padding: 5px 8px;
    margin-top: 10px;
    color: white;
    cursor: pointer;

    &:hover {
      background: #1b86e4;
    }
  }

  .mainContainer {
    width: 100%;
    max-width: 600px;
    padding: 0;

    @media (max-width: 1180px) {
      max-width: 100%;
    }

    .logout-container {
      margin-top: 8px;
      display: ${props => (props.currentUser ? "block" : "none")};
      button {
        background: transparent;
        color: red;
        font-weight: bold;
        cursor: pointer;
        border: none;
      }
    }

    .dataContainer {
      &[placeholder]:empty:before {
        content: attr(placeholder);
        color: #bababa;
      }
    }

    .profileContainer {
      display: flex;
      flex-direction: column;
      margin: 1rem 12px;

      .baseInfo {
        display: flex;

        @media (max-width: 720px) {
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .infoContainer {
          @media (max-width: 720px) {
            margin-top: 1rem;
          }

          .unameContainer {
            font-weight: 500;
            @media (max-width: 720px) {
              text-align: center;
            }

            h2 {
              &[placeholder]:empty:before {
                content: attr(placeholder);
                color: #bababa;
              }
            }
          }

          .followData {
            margin: 1rem 0;
            display: flex;
            div {
              margin-right: 12px;
              display: flex;
              span {
                display: block;
                margin-right: 8px;
              }
            }
          }
        }

        .saveProfileContainer {
          margin: 1rem 0;
          display: flex;
          justify-content: center;
        }

        .saveProfile {
          display: ${props => (props.currentUser ? "inline-block" : "none")};
          cursor: pointer;
          background: transparent;
          font-weight: bold;
          border: none;
          color: #0088ff;
        }

        .pictureContainer {
          position: relative;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 3rem;

          &:hover {
            .changeProfilePic {
              opacity: 1;
            }
          }

          .changeProfilePic {
            transition: 0.2s all;
            cursor: pointer;
            border-radius: 50%;
            background: ${props => props.bgProf || "#2b2b2b8a"};
            width: 100%;
            height: 100%;
            z-index: 2;
            position: absolute;
            display: ${props => (props.currentUser ? "flex" : "none")};
            justify-content: center;
            align-items: flex-end;
            opacity: 0;
            top: 0;

            input[type="file"] {
              display: none;
            }

            .button {
              display: inline-block;
              text-align: center;
              transition: 0.2s all;
              background: #1d7bce;
              padding: 1rem;
              cursor: pointer;
              width: 100%;
              border: none;
              font-size: 1.5rem;
              color: white;

              &:hover {
                color: #ebebeb;
              }

              &:focus {
                outline: none;
              }
            }
          }
        }
      }
    }
  }
`;

const Profile = props => {
  const myContext = React.useContext(MainContext);
  const [profilePic, setProfilePic] = React.useState(null);

  const saveButton = profilePic ? "Save" : "Saved";

  const bioRef = React.useRef(null);
  const followFunction = myContext.profileData.following
    ? myContext.dataMethods.unfollow
    : myContext.dataMethods.follow;

  const followText = myContext.profileData.following ? "Unfollow" : "Follow";

  const onChangeContentEditable = () => {
    let bio = bioRef.current;
    bio.addEventListener("input", e => {
      myContext.methods.profileData(e);
    });
  };

  const setProfilePicc = (val) => {
    setProfilePic(val);
  }

  React.useEffect(() => {
    myContext.dataMethods.fetchProfile(props.match.params.username);
    localStorage.setItem(
      "profile_data_jack",
      JSON.stringify(myContext.profileData)
    );
    myContext.methods.setNav(2);
    onChangeContentEditable();
  }, [myContext.depends]);

  return (
    <>
      <MobileNav />
      <Container className="container">
        <Nav />
        <Subcontainer currentUser={myContext.profileData.current}>
          <div className="mainContainer">
            <Titlebar>Profile</Titlebar>
            <div className="profileContainer">
              <div className="baseInfo">
                <div>
                  <div className="pictureContainer">
                    <ProfilePicture h="150px" w="150px" pic={myContext.profileData.picture}  />
                    <div className="changeProfilePic">
                      <label className="button" htmlFor="profilePic">
                        <input type="file" id="profilePic" name="profilePic" accept=".png, .jpg, .jpeg" onChange={e => setProfilePic(e.target.files[0])} />+
                      </label>
                    </div>
                  </div>
                  <div className="saveProfileContainer">
                  <button className="saveProfile" onClick={e => myContext.dataMethods.updateProfilePic(profilePic, setProfilePicc, myContext.profileData.username)}>{saveButton}</button>
                  </div>
                </div>
                <div className="infoContainer">
                  <h2
                    className="unameContainer"
                    id="username"
                    placeholder="Username"
                  >
                    {myContext.profileData.username}
                  </h2>
                  <div className="followData">
                    <div>
                      <span>
                        <strong>{myContext.profileData.posts.length}</strong>
                      </span>
                      Posts
                    </div>
                    <div>
                      <span>
                        <strong>
                          {myContext.profileData.followers.length}
                        </strong>
                      </span>
                      Followers
                    </div>
                    <div>
                      <span>
                        <strong>
                          {myContext.profileData.followings.length}
                        </strong>
                      </span>
                      Followings
                    </div>
                  </div>
                  <div className="bioContainer">
                    <strong>Bio</strong>
                    <div
                      className="dataContainer"
                      contentEditable={
                        myContext.profileData.current ? "true" : "false"
                      }
                      id="bio"
                      ref={bioRef}
                      suppressContentEditableWarning={true}
                      placeholder="Some information..."
                    >
                      {
                        new DOMParser().parseFromString(
                          myContext.profileData.bio,
                          "text/html"
                        ).body.innerHTML
                      }
                    </div>
                  </div>
                  <div className="follow-save-container">
                    <button
                      className="followBtn"
                      onClick={e => {
                        e.preventDefault();
                        followFunction();
                      }}
                    >
                      {followText}
                    </button>
                    <button
                      className="saveBtn"
                      onClick={e =>
                        myContext.dataMethods.updateProfile(
                          props.match.params.username
                        )
                      }
                    >
                      Save
                    </button>
                  </div>
                  <div className="logout-container">
                    <button onClick={myContext.dataMethods.logout}>
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Right />
        </Subcontainer>
      </Container>
    </>
  );
};

export default Profile;
