import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { createLogger } from "redux-logger";
import todoApp from "./reducers";

//-----MIDDLEWARE MANUALLY IMPLEMENTED------------
// const logger = (store) => {
//   return (next) => {
//     if (!console.group) {
//       return next;
//     }
//     return (action) => {
//       console.group(action.type);
//       console.log("%c prev state", "color: gray", store.getState());
//       console.log("%c action", "color: blue", action);
//       const returnValue = next(action);
//       console.log("%c next state", "color: green", store.getState());
//       console.groupEnd(action.type);
//       return returnValue;
//     };
//   };
// };

// const promise = (store) => {
//   return (next) => {
//     return (action) => {
//       if (typeof action.then === "function") {
//         return action.then(next);
//       }
//       return next(action);
//     };
//   };
// };
// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares.slice().reverse().forEach((middlewares) => {
//     store.dispatch = middlewares(store)(store.dispatch);
//   });
// };
// -------------------------------------------

// const thunk = (store) => (next) => (action) =>
//   typeof action === "function" ? action(store.dispatch, store.getState) : next(action);

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger());
  }

  return createStore(todoApp, applyMiddleware(...middlewares));
};

export default configureStore;
