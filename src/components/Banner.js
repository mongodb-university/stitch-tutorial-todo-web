import React from "react";
import styled from "@emotion/styled";

const BannerContainer = styled.div`
  margin: 10px;
  background-color: #acdbae;
  grid-area: banner;
`;

const RequireLoggedInUser = props => props.isLoggedIn ? <>{props.children}</> : <></>
const Banner = props => {
  const { children, isLoggedIn } = props;
  return (
    <BannerContainer>
      {children}
      <RequireLoggedInUser>
        Logged In
      </RequireLoggedInUser>
    </BannerContainer>
  )
};
export default Banner;
