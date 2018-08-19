import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import styles from './Styles';
const accountInfo = (props)=>{
  return (
    <Paper square = {true} className= {props.classes.paper}>
      <Grid container spacing = {8}>
        <Grid item xs={12}>
          <Typography 
            gutterBottom={true} 
            variant = 'title'
            className = {props.classes.title}>
            Account Summary
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={4}>
            <Typography >
              Username
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >
              {props.username}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography >
              <a>Edit</a>
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={4}>
            <Typography >
              Email
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >
              {props.email}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography >
              <a>Edit</a>
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs = {12}>
          <Grid item xs = {6}>
            <Button>
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default withStyles(styles)(accountInfo);