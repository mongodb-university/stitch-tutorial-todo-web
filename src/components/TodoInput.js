import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

TodoInput.propTypes = {
  addTodo: PropTypes.func,
};
export default function TodoInput(props) {
  const { addTodo, ...inputProps } = props;
  return (
    <Container>
      <TextInput
        {...inputProps}
        type="text"
        placeholder="What Do You Need To Do?"
      />
      <ActionButton action={props.addTodo}>Add To-Do</ActionButton>
    </Container>
  );
}
const Container = styled(InputGroup)`
  width: 100%;
`;
const TextInput = styled(Input)`
  height: 70px !important;
  background-color: white;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  line-height: 40px;
`;
const ActionButton = props => {
  const Text = styled.div`
    margin-right: 8px;
    margin-left: 8px;
  `;
  return (
    <InputGroupAddon addonType="append">
      <InputButton
        color="info"
        onClick={props.action}
        disabled={props.disabled}
      >
        <Text>{props.children}</Text>
      </InputButton>
    </InputGroupAddon>
  );
};
const InputButton = styled(Button)`
  background-color: #5e9668 !important;
`;
