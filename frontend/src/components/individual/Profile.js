import React from "react";
import profileImg from "../../assets/tweet.png";
import styled from "styled-components";
import { MainContext } from '../../Context';

const Container = styled.div`
  width: ${props => props.w || '26px'};
  height: ${props => props.h || '26px'};
`;

const Profile = (props) => {

  const myContext = React.useContext(MainContext);
  const profilePic = props.pic === "" || props.pic === undefined ? profileImg : myContext.url + "assets/" + props.pic;

  React.useEffect(e => {
    console.log(props.pic);
  })

  return (
    <Container w={props.w} h={props.h} className={props.newClass + " profilePic"} >
      <img src={profilePic} alt="my-pic" />
    </Container>
  );
};

export default Profile;
