import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Wrapper from '../../../../hoc/Wrapper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import styles from './Styles';
const moment = require('moment');
const info = (props) =>
{
  const days = props.days;
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const daySchedule = () =>
  {
    return [0,1,2,3,4,5,6].map((e) =>
    {
      return(
        <div className = {props.classes.generalTime}>
          <Typography className = {props.classes.day}> {dayNames[e]} </Typography>
          <Grid container spacing={0}>
            <Grid item xs={12} md={5}>
              <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[e].min)).format('hh:mm A')}</Typography>
            </Grid>
            <Grid item xs={12} md = {2}>
              <Typography className = {props.classes.center}variant = 'display1'>TO</Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[e].max)).format('hh:mm A')}</Typography>
            </Grid>
          </Grid>
        </div>
      );
    });
  }

  return (
    <Wrapper>
      <Paper className = {props.classes.container}>
        <Typography variant='headline'>About</Typography>
        <Divider/>
        <Typography variant = 'body1'>
          {(typeof props.desc==='string')?
            (props.desc.length!==0)?
              props.desc
            :'No Description for this Park'
          :null}
        </Typography>
      </Paper>
      <Paper className = {props.classes.container}>
        <Typography variant = 'headline'>General Hours</Typography>
        <Divider/>
        {daySchedule()}
      </Paper>
    </Wrapper>
  )
}
export default withStyles(styles)(info);