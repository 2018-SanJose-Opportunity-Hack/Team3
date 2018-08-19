import actionTypes from './types/index';
import axios from 'axios';
export const uploadProfile = (parkId, file)=>dispatch=>{
  const formData = new FormData;
  formData.append('avatar', file);
  dispatch({
    type: actionTypes.errors.REMOVE_PROFILE_UPLOAD
  });
  axios.post(`/api/park/${parkId}/profile`, formData)
    .then(response=>{
      dispatch({
        type: actionTypes.parks.SET_SINGLE_PARK,
        park: response.data.park
      });
    })
    .catch(err=>{
      dispatch({
        type: actionTypes.errors.PROFILE_UPLOAD
      })
    });
}
export const uploadPhoto = (parkId, file) => dispatch => {
  const formData = new FormData;
  formData.append('avatar', file);
  dispatch({
    type: actionTypes.errors.REMOVE_PHOTO_UPLOAD
  });
  axios.post(`/api/park/${parkId}/photo`, formData)
    .then(response => {
      dispatch({
        type: actionTypes.parks.SET_SINGLE_PARK,
        park: response.data.park
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.errors.PHOTO_UPLOAD
      })
    });
}