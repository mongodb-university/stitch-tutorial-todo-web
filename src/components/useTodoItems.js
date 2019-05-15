import React from "react";
import { items } from "../stitch";

const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case "setTodos": {
      return {
        ...state,
        hasHadTodos: payload.todos.length > 0,
        todos: payload.todos || [],
      };
    }
    case "addTodo": {
      const newTodo = {
        ...payload,
        checked: typeof payload.checked === "boolean" ? payload.checked : false,
      };
      return {
        ...state,
        hasHadTodos: true,
        todos: [...state.todos, newTodo],
      };
    }
    case "removeTodo": {
      const removeSpecifiedTodo = todo => todo.id !== payload.id;
      return {
        ...state,
        todos: state.todos.filter(removeSpecifiedTodo),
      };
    }
    case "clearCompletedTodos": {
      const isNotCompleted = todo => todo.checked !== true;
      return {
        ...state,
        todos: state.todos.filter(isNotCompleted),
      };
    }
    case "clearTodos": {
      return { ...state, todos: [] };
    }
    case "setTodoStatus": {
      const updateTodoStatus = todo => {
        const isThisTodo = todo._id === payload.id;
        return isThisTodo ? { ...todo, status: payload.status } : todo;
      };
      return {
        ...state,
        todos: state.todos.map(updateTodoStatus),
      };
    }
    case "completeAllTodos": {
      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, checked: true })),
      };
    }
    case "toggleTodoStatus": {
      const updateStatus = todo => {
        const isThisTodo = todo._id === payload.id;
        return isThisTodo ? { ...todo, checked: !todo.checked } : todo;
      };
      return {
        ...state,
        todos: state.todos.map(updateStatus),
      };
    }
    default: {
      console.error(`Received invalid todo action type: ${type}`);
    }
  }
};

export function useTodoItems(userId) {
  //
  const [state, dispatch] = React.useReducer(todoReducer, { todos: [] });
  // Todo Actions
  const loadTodos = async () => {
    const todos = await items.find({}, { limit: 1000 }).asArray();
    dispatch({ type: "setTodos", payload: { todos } });
  };
  const addTodo = async task => {
    const todo = { task, owner_id: userId };
    const result = await items.insertOne(todo);
    dispatch({ type: "addTodo", payload: { ...todo, _id: result.insertedId } });
  };
  const removeTodo = async todoId => {
    await items.deleteOne({ _id: todoId });
    dispatch({ type: "removeTodo", payload: { id: todoId } });
  };
  const clearTodos = async () => {
    await items.deleteMany({});
    dispatch({ type: "clearTodos" });
  };
  const clearCompletedTodos = async () => {
    await items.deleteMany({ checked: true });
    dispatch({ type: "clearCompletedTodos" });
  };
  const setTodoCompletionStatus = async (todoId, status) => {
    await items.updateOne(
      { _id: todoId },
      { $set: { checked: status } },
      { returnNewDocument: true },
    );
    dispatch({ type: "setTodoStatus", payload: { todoId, status } });
  };
  const completeAllTodos = async () => {
    await items.updateMany({ owner_id: userId }, { $set: { checked: true } });
    dispatch({ type: "completeAllTodos" });
  };
  const toggleTodoStatus = async todoId => {
    const todo = state.todos.find(t => t._id === todoId);
    await items.updateOne(
      { _id: todoId },
      { $set: { checked: !todo.currentStatus } },
    );
    dispatch({ type: "toggleTodoStatus", payload: { id: todoId } });
  };

  React.useEffect(() => {
    loadTodos();
  }, []);
  return {
    items: state.todos,
    hasHadTodos: state.hasHadTodos,
    actions: {
      addTodo,
      removeTodo,
      setTodoCompletionStatus,
      clearTodos,
      clearCompletedTodos,
      completeAllTodos,
      toggleTodoStatus,
    },
  };
}
