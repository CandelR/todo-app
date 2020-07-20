

let nextTodoId = 0;
const addTodo = (text) => {
    return {
              type: 'ADD_TODO',
              id: nextTodoId++,
              text: text
            };
  };
  
  const toogleTodo = (id) => {
    return {
              type: 'TOGGLE_TODO',
              id
    };
  };
  
  const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
       };
  };

  export default addTodo;
  export default toogleTodo;
  export default setVisibilityFilter; 