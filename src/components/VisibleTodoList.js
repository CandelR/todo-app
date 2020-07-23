import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../actions";
import todos, { getVisibleTodos, getErrorMessage, getIsFetching } from "../reducers";
import TodoList from "./TodoList";
import FetchError from "./FetchError";

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toogleTodo, todos, isFetching, errorMessage } = this.props;
    console.log(toogleTodo);
    console.log('isfetching: ' + isFetching);
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    console.log('error message: ' + errorMessage);

    if (errorMessage && !todos.length) {
      return <FetchError message={errorMessage} onRetry={() => this.fetchData()}></FetchError>;
    }
    return <TodoList todos={todos} onTodoClick={toogleTodo} />;
  }
}

const mapStateToTodoListProps = (state, { match }) => {
  const filter = match.params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    filter,
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToTodoListProps, actions)(VisibleTodoList)
);

export default VisibleTodoList;
