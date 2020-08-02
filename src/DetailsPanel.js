import React from 'react';
import { connect } from 'react-redux';
import {colAction, nameAction} from './actions/actions';

const mapStatetoProps = (state => {
    return {
      col:state.panCol.col,
      name:state.panName.name,
    };
  });

const mapDispatchToProps = dispatch => ({
    displayCol: () => dispatch(colAction()),
    displayName: () => dispatch(nameAction()),
});

const Name = (props) => {
  return (
    <p id="partName">{props.name}</p>
  )
}

const Panel = (props) =>{
    return (
        <div className="App">
            <div id="colBlock"  style={{ backgroundColor:props.col}} >
                <ConnectedName/>
            </div>      
        </div>
    )
  }

const ConnectedName = connect(mapStatetoProps, mapDispatchToProps)(Name);
const ConnectedPanel = connect(mapStatetoProps, mapDispatchToProps)(Panel);

const DetailsPanel = () =>{
  return (
      <ConnectedPanel/>
    )
}

export default DetailsPanel;
  