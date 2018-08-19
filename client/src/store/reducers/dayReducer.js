import actionTypes from '../actions/types/index';
const initialState = {
  day: null
}
const reducer = (state = initialState, action)=>{
  switch(action.type){
    case actionTypes.day.SET_DAY:
      return {
        day: action.payload
      }
    default:
      return state;
  }
}
export default reducer;