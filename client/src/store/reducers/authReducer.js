import actionTypes from '../actions/types/index';

const initialState ={
  user: null
};
const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.auth.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case actionTypes.auth.REMOVE_USER:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}
export default reducer;