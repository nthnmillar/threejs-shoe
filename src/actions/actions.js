export function colAction(col){
  return {
    type: 'DISPLAY_COL',
    payload: col,
  };
}

export function nameAction(name){
  return {
    type: 'DISPLAY_NAME',
    payload: name,
  };
}
