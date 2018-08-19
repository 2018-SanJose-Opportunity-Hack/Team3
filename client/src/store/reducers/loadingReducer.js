import actionTypes from '../actions/types/index';

const initialState = {
  parksLoading: false,
  parkLoading: false,
  dayLoading: false,
  reservationLoading: false,
  subscriptionLoading: false
};

const reducer = (state = initialState, action) =>{
  switch(action.type){
    case actionTypes.loading.PARKS_LOADING:
      return{
        ...state,
        parksLoading: true
      }
    case actionTypes.loading.STOP_PARKS_LOADING:
      return{
        ...state,
        parksLoading: false
      }
    case actionTypes.loading.PARK_LOADING:
      return {
        ...state,
        parkLoading: true
      }
    case actionTypes.loading.STOP_PARK_LOADING:
      return {
        ...state,
        parkLoading: false
      }
    case actionTypes.loading.DAY_LOADING:
      return {
        ...state,
        dayLoading: true
      }
    case actionTypes.loading.STOP_DAY_LOADING:
      return {
        ...state,
        dayLoading: false
      }
    case actionTypes.loading.MAKE_RESERVATION_LOADING:
      return{
        ...state,
        reservationLoading: true
      }
    case actionTypes.loading.STOP_MAKE_RESERVATION_LOADING:
      return{
        ...state,
        reservationLoading: false
      }
    case actionTypes.loading.SUBSCRIPTION_LOADING:
      return{
        ...state,
        subscriptionLoading: true
      }
    case actionTypes.loading.REMOVE_SUBSCRIPTION_LOADING:
      return{
        ...state,
        subscriptionLoading: false
      }
    default:
      return state;
  }
}
export default reducer;