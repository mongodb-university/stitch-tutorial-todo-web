import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { CheckedIcon, UncheckedIcon } from "./Icon";
import { Button } from "reactstrap";
import TodoInput from "./TodoInput";

TodoControls.propTypes = {
  items: PropTypes.array,
  actions: PropTypes.object,
};
export default function TodoControls(props) {
  const { items, actions } = props;
  const [inputText, setInputText] = useState("");
  const hasCheckedItems = items && items.filter(x => x.checked).length > 0;
  const handleInput = e => setInputText(e.target.value);
  const handleAddTodo = () => {
    if (inputText) {
      actions.addTodo(inputText);
      setInputText("");
    }
  };
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };
  const allTodosAreCompleted = items.every(item => item.checked === true);
  const someTodosAreCompleted = items.every(item => item.checked === true);
  return (
    <Layout>
      <TodoInput
        value={inputText}
        addTodo={handleAddTodo}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
      />
      <ControlBar>
        {items.length > 0 && !allTodosAreCompleted && (
          <SelectAllButton
            selected={someTodosAreCompleted}
            onClick={actions.completeAllTodos}
          />
        )}
        {hasCheckedItems && (
          <CleanupButton onClick={actions.clearCompletedTodos}>
            Clear Completed
          </CleanupButton>
        )}
      </ControlBar>
    </Layout>
  );
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
`;
const ControlBar = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const CleanupButton = styled(Button)`
  background-color: #f83d0e !important;
`;
const SelectAllButton = props => {
  const Selector = styled(Button)`
    color: black;
    border: 0.5px solid rgba(0, 0, 0, 0.6) !important;
    margin-right: 8px;
  `;
  return (
    <Selector color="inverted" onClick={props.onClick}>
      {props.selected ? (
        <span>
          <CheckedIcon />
        </span>
      ) : (
        <span>
          <UncheckedIcon /> Complete All
        </span>
      )}
    </Selector>
  );
};
const CleanupButton2 = styled.button`
  background-color: #f83d0e;
  position: relative;
  border: 1px solid black;
  display: inline-block;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  :active {
    top: 2px;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.19), 0 4px 4px rgba(0, 0, 0, 0.23);
  }
`;
