import { createStore, combineReducers} from 'redux';
import colReducer from "./reducers/colReducer";
import nameReducer from "./reducers/nameReducer";

const rootReducer = combineReducers({
    panCol: colReducer,
    panName: nameReducer, 
  });

export default createStore(
  rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );