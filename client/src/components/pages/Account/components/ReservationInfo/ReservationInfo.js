import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
const moment = require('moment-timezone');
const reservationInfo = (props)=>{
  let time = props.reservation.duration / 3600000;
  let cancelButtonText = null;
  if(props.reservation.status==='Cancelled'){
    cancelButtonText = 'Cancelled';
  } else if ((moment().diff(moment(props.reservation.startTime)) <= 15 * 60 * 1000)){
    cancelButtonText = 'Cancel Reservation';
  }else{
    cancelButtonText = 'Unable to Cancel';
  }
  return (
    <Card key = {props.reservation._id} >
      <Typography >{props.status + ' reservation'} </Typography>
      <Typography >{'start time: ' + moment(props.reservation.startTime).tz('America/Los_Angeles').format('MM/DD/YYYY hh:mm A')} </Typography>
      <Typography >{'end time: ' + moment(props.reservation.endTime).tz('America/Los_Angeles').format('MM/DD/YYYY hh:mm A')} </Typography>
      <Typography >{'duration: ' + time + (time === 1 ? ' hour' : ' hours')} </Typography>
      {Math.abs(moment(props.reservation.startTime).diff(moment()))<=15*60*1000?<Button>Check In</Button>:null}
      <Button onClick={props.reservation.status!=='Cancelled'? ()=>props.cancelOwnReservation(props.reservation._id):null} disabled = {cancelButtonText==='Cancelled'||cancelButtonText==='Unable to Cancel'}>{cancelButtonText}</Button>
    </Card>
  )
}
export default reservationInfo;