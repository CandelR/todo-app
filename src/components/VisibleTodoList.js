import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../actions";
import todos, { getVisibleTodos, getIsFetching } from "../reducers";
import TodoList from "./TodoList";

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
    fetchTodos(filter).then(() => console.log('done!'));
  }

  render() {
    const { toogleTodo, todos, isFetching } = this.props;

    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    return <TodoList todos={todos} onTodoClick={toogleTodo} />;
  }
}

const mapStateToTodoListProps = (state, { match }) => {
  const filter = match.params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToTodoListProps, actions)(VisibleTodoList)
);

export default VisibleTodoList;
