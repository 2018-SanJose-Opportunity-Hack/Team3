import axios from 'axios';
import actionTypes from './types/index';

export const getParkList = ()=> dispatch=>{
  console.log('running');
  dispatch({
    type: actionTypes.loading.PARKS_LOADING
  });
  axios.get('/api/park/all')
    .then(response=>{
      const parks = response.data.parks;
      console.log(response.data);
      dispatch({
        type: actionTypes.parks.SET_PARKS,
        payload: parks
      });
      dispatch({
        type: actionTypes.loading.STOP_PARKS_LOADING
      })
    })
}
export const getParkById = (id)=> dispatch=>{
  dispatch({
    type: actionTypes.parks.REMOVE_PARK
  });
  dispatch({
    type: actionTypes.loading.PARK_LOADING
  });
  dispatch({
    type: actionTypes.errors.REMOVE_PARK_NOT_FOUND
  });
  axios.get(`/api/park/${id}`)
    .then(response=>{
      const park = response.data.park;
      console.log(park);
      dispatch({
        type: actionTypes.parks.SET_SINGLE_PARK,
        payload: park
      });
      dispatch({
        type: actionTypes.loading.STOP_PARK_LOADING
      })
    })
    .catch(err=>{
      dispatch({
        type: actionTypes.errors.PARK_NOT_FOUND,
        payload: err.response.data
      });
      dispatch({
        type: actionTypes.loading.STOP_PARK_LOADING
      });
    })
}
export const createPark = (name, address, days, file, history)=> dispatch=>{
  axios.post('/api/park/create', {name, address, days})
    .then(response=>{
      if(response.data.park&&file!==null){
        let formData  = new FormData();
        const park = response.data.park;
        formData.append('avatar', file);
        axios.post(`/api/park/${response.data.park._id}/profile`, formData)
          .then(response=>{
            history.push(`/park/${park._id}`);
          })
          .catch(err=>{
            history.push(`/park/${park._id}`);
          });
      }
    })
    .catch(errors=>{
      console.log(errors.response);
      history.push(`/account`);
    });
}