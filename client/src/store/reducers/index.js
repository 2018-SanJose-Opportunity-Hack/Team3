import {combineReducers} from 'redux';
import auth from './authReducer';
import errors from './errorReducer';
import page from './pageReducer'
import parks from './parksReducer';
import loading from './loadingReducer';
import park from './parkReducer';
import day from './dayReducer';
export default combineReducers({
  auth,
  errors,
  page,
  parks,
  loading,
  park,
  day
});