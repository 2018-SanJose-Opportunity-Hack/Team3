import actionTypes from './types/index';
import axios from 'axios';
export const fetchDay = (parkId, dayId, setState)=>dispatch=>{
  dispatch({
    type: actionTypes.loading.DAY_LOADING
  });
  dispatch({
    type: actionTypes.errors.REMOVE_DAY_NOT_FOUND
  });
  axios.get(`/api/park/${parkId}/day/${dayId}`)
    .then(response=>{
      dispatch({
        type: actionTypes.day.SET_DAY,
        payload: response.data.day
      });
      dispatch({
        type: actionTypes.loading.STOP_DAY_LOADING
      });
    })
    .catch(err=>{
      dispatch({
        type: actionTypes.errors.DAY_NOT_FOUND,
        payload: err.response.data
      });
      dispatch({
        type: actionTypes.loading.STOP_DAY_LOADING
      });
    })
}