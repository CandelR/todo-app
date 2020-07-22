import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import { toogleTodo } from "../actions";

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo) => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "all":
      return todos;

    case "completed":
      return todos.filter((t) => t.completed);

    case "active":
      return todos.filter((t) => !t.completed);

    default:
      return todos;
  }
};

const mapStateToTodoListProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(state.todos, ownProps.filter),
  };
};
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toogleTodo(id));
    },
  };
};
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

VisibleTodoList.contextTypes = {
  store: React.PropTypes,
};

export default VisibleTodoList;
