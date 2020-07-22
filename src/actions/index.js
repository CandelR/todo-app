import {v4} from 'node-uuid';

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