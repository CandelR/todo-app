import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import "./index.css";
import Clock  from './components/Clock'
import LoginControl from './components/LoginControl';

//------------TODO APP
// const TodoApp = () => (
//   <div>
//     <AddTodo />
//     <VisibleTodoList />
//     <Footer />
//   </div>
// );

// function Clock(props) {
//   return (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {props.date.toLocaleTimeString()}.</h2>
//     </div>
//   );
// }
function App() {
  return (
    <div>
      <Clock />
      <LoginControl />
    </div>
  );
}
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
