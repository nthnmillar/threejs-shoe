import React, { useState, useEffect } from 'react';
import './App.css';
import CanvasThree from './CanvasThree';
import Panel from './Panel';

function App() {
  return (
    <>
    <Panel /* panelCol={colour} panelName={partName} *//>
    <CanvasThree/>
    </>
  );
}

export default App;