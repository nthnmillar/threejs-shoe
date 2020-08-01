import React from 'react';

const Panel = (props) =>{
    return (
      <div className="App">
        <div id="colBlock" style={{ backgroundColor:props.panelCol}} >
         <p id="partName">{props.panelName}</p>
      </div>      
    </div>
    )
  }

  export default Panel;
  