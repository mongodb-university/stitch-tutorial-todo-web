// React
import React from "react";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
// To-Do Components & Hooks
import TodoList from "./TodoList";
import TodoControls from "./TodoControls";
import { useStitchAuth } from "./StitchAuth";
import { useTodoItems } from "./useTodoItems";
import { Card, CardTitle } from "reactstrap";

TodoApp.propTypes = {};
export default function TodoApp() {
  const { currentUser } = useStitchAuth();
  const todo = useTodoItems(currentUser.id);
  // const { items, hasHadTodos, actions } = useTodoItems(currentUser.id);
  return (
    <ErrorBoundary>
      <Layout>
        <TodoCard>
          <Title>
            <h1>Your To-Do List</h1>
          </Title>
          <TodoControls {...todo} />
          <TodoList {...todo} />
        </TodoCard>
      </Layout>
    </ErrorBoundary>
  );
}
const Layout = styled.div`
  background: #eeeeee;
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TodoCard = styled(Card)`
  max-width: 600px;
  align-items: center;
  width: 100%;
`;
const Title = styled(CardTitle)`
  margin: 0;
  h1 {
    padding: 20px;
    margin: 0;
  }
`;
