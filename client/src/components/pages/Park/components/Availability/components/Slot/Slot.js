import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles} from '@material-ui/core/styles';
import styles from './Styles';
const slot = (props)=>{
  return(
    <Paper className = {props.classes.paper}>
      <Grid container spacing={16}>
        <Grid item xs = {8}>
          <Typography variant='display1'>
            {`${props.startTime} TO ${props.endTime}`}
          </Typography>
        </Grid>
        <Grid item xs = {4}>
          <Button className = {props.classes.button} variant= 'contained'color='primary' disabled = {!props.isAvailable} onClick = {props.click}> 
            {props.isAvailable?'Reserve':'Unavailable'}
          </Button>
        </Grid>
      </Grid>
      {props.isAvailable ? null :
          <Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked = {false}
                  value = 'subscribed'
                  color = 'primary'
                />
              }
              label = 'get notification'
            />
          </Grid>
        }
    </Paper>
  )
}
export default withStyles(styles)(slot);