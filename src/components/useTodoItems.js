import React from "react";
import { items } from "../stitch";
import { watchItems } from "../stitch/mongodb"

const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case "setTodos": {
      return {
        ...state,
        hasHadTodos: payload.todos.length > 0,
        todos: payload.todos || [],
      };
    }
    case "updateTodo": {
      const updatedTodo = payload; 
      const updateTodo = todo => {
        const isThisTodo = todo._id.toString() === updatedTodo._id.toString();
        return isThisTodo ? updatedTodo : todo;
      }; 
      return { 
        ...state, 
        todos: state.todos.map(updateTodo)
      }
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
      const todoId = payload; 
      const removeSpecifiedTodo = todo => todo._id.toString() !== todoId.toString();
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
    case "setTodoStatus": {
      const updateTodoStatus = todo => {
        const isThisTodo = todo._id == payload.id;
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

  const useWatchItems = () => { 
    const [getStream, closeStream] = watchItems(); 
    React.useEffect(() => {
      getStream().then(stream => stream.onNext( (changeEvent) => {
        switch(changeEvent.operationType) {
          case "insert": {
            dispatch({ type: "addTodo", payload: changeEvent.fullDocument}); 
            break; 
          }
          case "delete": { 
            dispatch({ type: "removeTodo", payload: changeEvent.documentKey._id}); 
            break; 
          }
          case "update": {
            dispatch({ type: "updateTodo", payload: changeEvent.fullDocument});
            break; 
          }
          default: {}
        }
      } )); 
     return closeStream; 
    }, [])
  }; 

  const addTodo = async task => {
    const todo = { task, owner_id: userId };
    const result = await items.insertOne(todo);
  };
  const removeTodo = async todoId => {
    await items.deleteOne({ _id: todoId });
  };
  const clearCompletedTodos = async () => {
    await items.deleteMany({ checked: true });
  };
  const setTodoCompletionStatus = async (todoId, status) => { 
    const result = await items.updateOne(
      { _id: todoId },
      { $set: { checked: status } },
      { returnNewDocument: true },
    );
  };
  const completeAllTodos = async () => {
    await items.updateMany({ owner_id: userId }, { $set: { checked: true } });
  };
  const toggleTodoStatus = async todoId => { 
    const todo = state.todos.find(t => t._id === todoId);
    const result = await items.findOneAndUpdate(
      { _id: todo._id },
      { $set: { checked: !todo.checked } },
      { returnNewDocument: true },
    );
  };

  React.useEffect(() => {
    loadTodos(); 
  }, []);
  useWatchItems(); 
  return {
    items: state.todos,
    hasHadTodos: state.hasHadTodos,  
    actions: { 
      addTodo,
      removeTodo,
      setTodoCompletionStatus,
      clearCompletedTodos,
      completeAllTodos,
      toggleTodoStatus,
    },
  };
}
