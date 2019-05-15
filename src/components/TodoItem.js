import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { CheckedIcon, UncheckedIcon } from "./Icon";
import { Card, CardBody } from "reactstrap";

TodoItem.propTypes = {
  item: PropTypes.object,
  remove: PropTypes.func,
  setStatus: PropTypes.func,
  toggleStatus: PropTypes.func,
};
export default function TodoItem(props) {
  const { item, toggleStatus } = props;
  const Checkbox = item.checked ? CheckedIcon : UncheckedIcon;
  return (
    <Todo onClick={toggleStatus}>
      <Layout>
        <Checkbox />
        <Text>{item.task}</Text>
      </Layout>
    </Todo>
  );
}
const Todo = styled(Card)`
  margin: 4px auto;
  :first-of-type {
    margin-top: 0px;
  }
`;
const Layout = styled(CardBody)`
  display: flex;
  align-items: top;
  padding: 10px !important;
`;
const Text = styled.span`
  font-size: 18px;
  line-height: 24px;
  margin-left: 10px;
  max-width: calc(100% - 24px - 10px);
`;
