
const nameReducer = (state = {sum:"Part"}, action) =>{ 
    if (action.type === 'DISPLAY_NAME'){
      return {name: action.payload};
    }
    return state;
  }

  export default nameReducer;
  