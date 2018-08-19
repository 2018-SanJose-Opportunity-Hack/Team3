import actionTypes from '../actions/types/index';

const initialState = {
  parks: null
}
const reducer = (state = initialState, action)=>{
  switch(action.type){
    case actionTypes.parks.SET_PARKS:
      return {
        parks: action.payload
      }
    default: 
      return state;
  }
}
export default reducer;

