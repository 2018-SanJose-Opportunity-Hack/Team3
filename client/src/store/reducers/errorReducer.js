import actionTypes from '../actions/types/index';
const initialState = {
  form: {},
  login: {},
  register: {},
  park: {},
  day: {}
};
const reducer = (state = initialState, action)=>{
  switch(action.type){
    case actionTypes.errors.FORM_ERROR:
      return {
        ...state,
        login: {...state.login},
        register: {...state.register},
        form: action.payload,
        park: {...state.park},
        day: {...state.day}
      }
    case actionTypes.errors.LOGIN_ERROR:
      return {
        ...state,
        form: {...state.form},
        login: action.payload,
        register: {...state.register},
        park: {...state.park},
        day: {...state.day}
      }
    case actionTypes.errors.REGISTER_ERROR:
      return {
        ...state,
        form: {...state.form},
        login: {...state.login},
        register: action.payload,
        park: {...state.park},
        day: {...state.day}
      }
    case actionTypes.errors.REMOVE_LOGIN_ERROR:
      return {
        ...state,
        form: {...state.form},
        login: {},
        register: {...state.register},
        park: {...state.park},
        day: {...state.day}
      }
    case actionTypes.errors.REMOVE_REGISTER_ERROR:
      return {
        ...state,
        form: {...state.form},
        login: {...state.login},
        register: {},
        park: {...state.park},
        day: {...state.day}
      }
    case actionTypes.errors.PARK_NOT_FOUND:
      return {
        ...state,
        form: {...state.form},
        login: {...state.login},
        register: {...state.register},
        park: action.payload,
        day: {...state.day}
      }
    case actionTypes.errors.REMOVE_PARK_NOT_FOUND:
      return {
        ...state,
        form: {...state.form},
        login: {...state.login},
        register: {...state.register},
        park: {},
        day: {...state.day}
      }
    case actionTypes.errors.DAY_NOT_FOUND:
      return {
        ...state,
        form: {...state.form},
        login: {...state.login},
        register: {...state.register},
        park: {...state.park},
        day: action.payload
      }
    case actionTypes.errors.REMOVE_DAY_NOT_FOUND:
      return {
        ...state,
        form: {...state.form},
        login: {...state.login},
        register: {...state.register},
        park: {...state.park},
        day: {}
      }
    default:
      return state;
  }
}
export default reducer;