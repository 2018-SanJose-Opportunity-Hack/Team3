import actionTypes from './types/index';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from '../../util/setAuthToken';
export const loginUser = (data, history) => dispatch =>{
  axios.post('/api/users/login', data)
    .then(response=>{
      localStorage.setItem('parkUserCurrent', response.data.token);
      const decoded = jwt_decode(response.data.token);
      setAuthToken(response.data.token);
      dispatch({
        type: actionTypes.auth.SET_USER,
        payload: decoded
      });
      dispatch({
        type: actionTypes.errors.REMOVE_LOGIN_ERROR
      });
      history.push('/account');
    })
    .catch(error=>{
      console.log(error.response.data);
      dispatch({
        type: actionTypes.errors.LOGIN_ERROR,
        payload: error.response.data
      })
    })
}
export const registerUser = (data,history)=>dispatch =>{
  axios.post('/api/users/register', data)
    .then(response =>{
      localStorage.setItem('parkUserCurrent', response.data.token);
      const decoded = jwt_decode(response.data.token);
      setAuthToken(response.data.token);
      dispatch({
        type: actionTypes.auth.SET_USER,
        payload: decoded
      });
      dispatch({
        type: actionTypes.errors.REMOVE_REGISTER_ERROR
      });
      history.push('/account');
    })
    .catch(error => {
      dispatch({
        type: actionTypes.errors.REGISTER_ERROR,
        payload: error.response.data
      })
    })
}
export const getCurrentUser = (history)=>dispatch=>{
  console.log(axios.defaults.headers.common['Authorization']);
  axios.get('/api/users/current')
    .then(response=>{
      dispatch({
        type: actionTypes.auth.SET_USER,
        payload: response.data.user
      })
    })
    .catch(err=>{
      console.log(err.response);
      dispatch(logoutUser());
      history.push('/login');
    })
}
export const logoutUser = () => {
  localStorage.removeItem('parkUserCurrent');
  setAuthToken(null);
  return {
    type: actionTypes.auth.REMOVE_USER,
  }
}

