import actionTypes from '../actions/types/index';
const initialState = {
  page: null
}
const reducer = (state = initialState, action)=>{
  switch(action.type){
    case actionTypes.page.SET_PAGE:
      return {
        ...state,
        page: action.page
      }
    default:
      return state
  }
}
export default reducer;