import { loadState, saveState } from "./localStorage";
import { createStore } from "redux";
import todoApp from "./reducers";
import { throttle } from "lodash";

const configureStore = () => {
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
  return store;
};

export default configureStore;
