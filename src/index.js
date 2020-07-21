import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import AddTodo from "./components/AddTodo";
import VisibleTodoList from "./components/TodoList";
import Footer from "./components/Footer";

import { loadState, saveState } from "./localStorage";
import { createStore } from "redux";
import todoApp from "./reducers";
import { Provider } from "react-redux";
import { throttle } from "lodash";

const persistedState = loadState();
const store = createStore(todoApp, persistedState);

store.subscribe(
  throttle(() => {
    saveState(
      //specify which data (in this case "todos") want to persist,
      // in this case I save only todos for not persist the visibilty state
      {
        todos: store.getState().todos,
      }
    );
  }, 1000)
);

const TodoApp = ({ store }) => (
  <Provider store={store}>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Provider>
);

ReactDOM.render(<TodoApp store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
