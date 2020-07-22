import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toogleTodo } from "../actions";
import { getVisibleTodos } from "../reducers";
import TodoList from "./TodoList";
import { fetchTodos } from "../api";

class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then((todos) =>
      console.log(this.props.filter, todos)
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter){
      fetchTodos(this.props.filter).then(todos => 
          console.log(this.props.filter, todos)
        );
    }
  }

  render() {
    return <TodoList {...this.props} />;
  }
}

const mapStateToTodoListProps = (state, { match }) => {
  const filter = match.params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToTodoListProps, { onTodoClick: toogleTodo })(VisibleTodoList)
);

export default VisibleTodoList;