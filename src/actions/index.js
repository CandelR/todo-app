import { v4 } from "node-uuid";
import * as api from "../api";

const receiveTodos = (filter, response) => ({
  type: "RECEIVE_TODOS",
  filter,
  response,
});

export const fetchTodos = (filter) =>
  api.fetchTodos(filter).then((response) => receiveTodos(filter, response));

export const addTodo = (text) => {
  return {
    type: "ADD_TODO",
    id: v4(),
    text: text,
  };
};

export const toogleTodo = (id) => {
  return {
    type: "TOGGLE_TODO",
    id,
  };
};
