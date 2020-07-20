import { connect } from "react-redux";
import { Component } from 'react';
import React from 'react';

//COMPONENTS FROM REDUX COURSE 
//------------LINK
const Link = ({
    active,
    children,
    onClick
  }) => {
    if (active) {
      return <span>{children}</span>;
    }
    
    return (
      <a href='#'
        onClick={e => {
          e.preventDefault();
          onClick();
        }}
       >
      {children}
      </a>
     );
  };
  
  const mapStateToLinkProps = (
    state,
    ownProps
  ) => {
    return {
      active:
        ownProps.filter ===
        state.visibilityFilter
    };
  };
  const mapDispatchToLinkProps = (
    dispatch,
    ownProps
  ) => {
    return {
      onClick: () => {
        dispatch(
          setVisibilityFilter(ownProps.filter)
        );
      }
    };
  }
  const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
  )(Link);

//------------FOOTER

  const Footer = () => (
    <p>
       Show:
       {' '}
        <FilterLink
           filter='SHOW_ALL'
        >
          ALL
        </FilterLink>
        {' '}
        <FilterLink
            filter='SHOW_ACTIVE'
        >
          ACTIVE
        </FilterLink>
        {' '}
        <FilterLink
           filter='SHOW_COMPLETED'           
          >
          COMPLETED
         </FilterLink>
     </p>
  );
  
//------------TODO 

  const Todo = ({
    onClick,
    completed,
    text
  }) => (
    <li 
      onClick={onClick}
      style={{
        textDecoration: 
        completed ? 'line-through': 'none'
      }}>
      {text}
    </li>
  );

  const TodoList = ({
    todos,
    onTodoClick
  }) => (
    <ul>
    {todos.map(todo =>
       <Todo
          key = {todo.id}
          {...todo}
          onClick= {() => onTodoClick(todo.id)}
        />
     )}
      </ul>
  
  );
  
//------------ADD TODO BUTTON 

  let AddTodo = ({ dispatch }) => {
    let input;
    return ( 
      <div>
        <input ref={node => {
          input = node;
          }} />
        <button onClick={() => {
          dispatch(addTodo(input.value));
            input.value = '';
          }}>
          Add Todo
        </button>
       </div>
     );
  };
  AddTodo = connect()(AddTodo);
  
const getVisibleTodos = (
    todos,
    filter
  ) => {
    switch (filter) {
        
      case 'SHOW_ALL':
        return todos;
        
      case 'SHOW_COMPLETED':
        return todos.filter(
          t => t.completed
        );
        
      case 'SHOW_ACTIVE':
        return todos.filter(
          t => !t.completed
        );
    }
  }
  
  const mapStateToTodoListProps = (state) => {
    return {
      todos:  getVisibleTodos(
              state.todos,
              state.visibilityFilter
            )
    };
  };
  const mapDispatchToTodoListProps = (dispatch) => {
    return {
      onTodoClick: (id) => {
            dispatch(toogleTodo(id));
          }
    };
  };
  const VisibleTodoList = connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
  )(TodoList);
  
  VisibleTodoList.contextTypes = {
    store: React.PropTypes
  };
