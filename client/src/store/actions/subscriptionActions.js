import actionTypes from './types/index';
import axios from 'axios';
import {getParkById} from './parkActions';
export const addSubscription = (parkId, dayId, timeblockId)=>dispatch=>{
  dispatch({
    type: actionTypes.loading.SUBSCRIPTION_LOADING
  })
  axios.post(`/api/reservation/subscribe/${parkId}/${dayId}/${timeblockId}`, {})
    .then(response=>{
      axios.get(`/api/park/${parkId}`)
        .then(response=>{
          dispatch({
            type: actionTypes.parks.SET_SINGLE_PARK,
            payload: response.data.park
          })
          dispatch({
            type: actionTypes.loading.REMOVE_SUBSCRIPTION_LOADING
          })
        })
        .catch(err => {
          console.log(err.response);
        })
    })
    .catch(err=>{
      console.log(err.response);
    })
}
export const removeSubscription = (parkId, timeblockId)=> dispatch=>{
  dispatch({
    type: actionTypes.loading.SUBSCRIPTION_LOADING
  })
  axios.delete(`/api/reservation/unsubscribe/${timeblockId}`)
    .then(response=>{
      axios.get(`/api/park/${parkId}`)
        .then(response => {
          dispatch({
            type: actionTypes.parks.SET_SINGLE_PARK,
            payload: response.data.park
          })
          dispatch({
            type: actionTypes.loading.REMOVE_SUBSCRIPTION_LOADING
          })
        })
        .catch(err => {
          console.log(err.response);
        })
    })
    .catch(err=>{
      console.log(err.response);
    })
}