import React from "react";
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import { CheckedIcon, UncheckedIcon } from "./Icon";
import { Card } from "reactstrap";

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
        <Text>{item.text}</Text>
      </Layout>
    </Todo>
   );
}
const Todo = styled(Card)`
  margin: 4px auto;
`;
const Layout = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`
const Text = styled.span`
	font-size: 18px;
  line-height: 24px;
  margin-left: 10px;
  color: #115500;
`
