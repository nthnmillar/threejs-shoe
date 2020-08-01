
const colReducer = (state = {entry:"grey"}, action) =>{ 
    if (action.type === 'DISPLAY_COL'){
      return {col: action.payload};
    }
    return state;
  }
  
  export default colReducer;