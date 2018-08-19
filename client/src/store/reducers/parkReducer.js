import actionTypes from '../actions/types/index';

const initialState = {
  park: null
};
const reducer = (state=initialState, action)=>{
  switch(action.type){
    case actionTypes.parks.SET_SINGLE_PARK:{
      return {
        park: action.payload
      }
    }
    case actionTypes.parks.REMOVE_PARK:{
      return {
        park: null
      }
    }
    default:
      return state;
  }
};
export default reducer;