import React, { useState, useEffect } from 'react';
import store from "./store";
import { Provider, connect } from 'react-redux';
import './App.css';
import CanvasThree from './CanvasThree';
import Panel from './DetailsPanel';
import {colAction, namemAction} from './actions/actions';
import DetailsPanel from './DetailsPanel';

function App() {
  return (
    <Provider store={store}>
     {/* <Panel  panelCol={colour} panelName={partName} /> */}
      <DetailsPanel/>
      <CanvasThree/>
    </Provider>
  );
}

export default App;