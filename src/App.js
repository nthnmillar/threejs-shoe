import React from 'react';
import store from "./store";
import { Provider } from 'react-redux';
import './App.css';
import CanvasThree from './CanvasThree';
import DetailsPanel from './DetailsPanel';

function App() {
  return (
    <Provider store={store}>
      <DetailsPanel/>
      <CanvasThree/>
    </Provider>
  );
}

export default App;