// React
import React from "react";
import styled from "@emotion/styled";
// Components & Hooks
import TodoApp from "./TodoApp";
import Login from "./Login";
import { StitchAuthProvider, useStitchAuth } from "./StitchAuth";
import { Button } from "reactstrap";

App.propTypes = {};
export default function App() {
  return (
    <StitchAuthProvider>
      <AppUI />
    </StitchAuthProvider>
  );
}

AppUI.propTypes = {};
function AppUI() {
  const {
    isLoggedIn,
    actions: { handleLogout },
  } = useStitchAuth();
  return (
    <Layout>
      <Navbar>
        {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
        <AppTitle>MongoDB Stitch To-Do Tutorial</AppTitle>
      </Navbar>
      {isLoggedIn ? <TodoApp /> : <Login />}
    </Layout>
  );
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  * {
    font-family: sans-serif;
  }
`;
const Navbar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  height: 62px;
  padding: 10px;
  background: #5e9668;
`;
const AppTitle = styled.h1`
  margin-right: auto;
`;
