import React from "react";
import AddTodo from "./AddTodo";
import VisibleTodoList from "./TodoList";
import Footer from "./Footer";

const App = ({ match }) => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={ match.params.filter || "all"} />
    <Footer />
  </div>
);

export default App;
