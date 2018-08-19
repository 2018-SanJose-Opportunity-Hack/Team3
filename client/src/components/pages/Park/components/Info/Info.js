import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Wrapper from '../../../../hoc/Wrapper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import styles from './Styles';
const moment = require('moment');
const info = (props)=>{
  const days = props.days;
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

        <Grid container spacing={0} className = {props.classes.generalTime}>
          Sunday
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[0].min)).format('hh:mm A')}</Typography>
          </Grid>
          <Grid item xs={12} md = {2}>
            <Typography className = {props.classes.center}variant = 'display1'>TO</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[0].max)).format('hh:mm A')}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0} className = {props.classes.generalTime}>
          Monday
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[1].min)).format('hh:mm A')}</Typography>
          </Grid>
          <Grid item xs={12} md = {2}>
            <Typography className = {props.classes.center}variant = 'display1'>TO</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[1].max)).format('hh:mm A')}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0} className = {props.classes.generalTime}>
          Tuesday
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[2].min)).format('hh:mm A')}</Typography>
          </Grid>
          <Grid item xs={12} md = {2}>
            <Typography className = {props.classes.center}variant = 'display1'>TO</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[2].max)).format('hh:mm A')}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0} className = {props.classes.generalTime}>
          Wednesday
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[3].min)).format('hh:mm A')}</Typography>
          </Grid>
          <Grid item xs={12} md = {2}>
            <Typography className = {props.classes.center}variant = 'display1'>TO</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[3].max)).format('hh:mm A')}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0} className = {props.classes.generalTime}>
          Thursday
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[4].min)).format('hh:mm A')}</Typography>
          </Grid>
          <Grid item xs={12} md = {2}>
            <Typography className = {props.classes.center}variant = 'display1'>TO</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[4].max)).format('hh:mm A')}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0} className = {props.classes.generalTime}>
          Friday
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[5].min)).format('hh:mm A')}</Typography>
          </Grid>
          <Grid item xs={12} md = {2}>
            <Typography className = {props.classes.center}variant = 'display1'>TO</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[5].max)).format('hh:mm A')}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0} className = {props.classes.generalTime}>
          Saturday
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[6].min)).format('hh:mm A')}</Typography>
          </Grid>
          <Grid item xs={12} md = {2}>
            <Typography className = {props.classes.center}variant = 'display1'>TO</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography className = {props.classes.center}variant = 'display1'>{moment().startOf('day').add(parseInt(days[6].max)).format('hh:mm A')}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Wrapper>
  )
}
export default withStyles(styles)(info);