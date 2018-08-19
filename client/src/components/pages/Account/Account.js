import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Notifications from '@material-ui/icons/Notifications';
import Typography from '@material-ui/core/Typography';
import styles from './Styles';
import AccountInfo from './components/AccountInfo/AccountInfo';
import {getCurrentUser} from '../../../store/actions/authActions';
import {cancelOwnReservation} from '../../../store/actions/reservationActions';
import ReservationInfo from './components/ReservationInfo/ReservationInfo';
import Wrapper from '../../hoc/Wrapper';
const moment = require('moment-timezone');
class Account extends Component{
  state = {
    loading: true
  }
  componentWillMount(){
    if(!this.props.auth.user){
      this.props.history.push('/login');
    }else{
      this.props.getCurrentUser(this.props.history);
    }
  }
  routeClickHandler = (type)=>{
    this.props.history.push(`${this.props.match.url}${type}`);
  }
  render(){

    let approvalMessage = null;
    //if no user
    if(!this.props.auth.user){
      return <div></div>
    }
    if(!this.props.auth.user.isApproved){
      approvalMessage = (
        <div></div>
      )
    }
    let content = null;
    let upcoming = null;
    let past = null;
    let current = null;
    let cancelled = null;
    console.log(this.props.location.pathname);
    console.log(this.props.location);
    if(this.props.location.pathname === '/account'){
      content = (
        <AccountInfo 
          username = {this.props.auth.user.username}
          email = {this.props.auth.user.email}
        />
      );
    }else if(this.props.location.pathname === '/account/reservations'){
      //set 'content' to the reservations component
      if(this.props.auth.user.reservations){
        upcoming = this.props.auth.user.reservations
                    .filter(reservation => (moment(reservation.startTime).diff(moment()))>0&& reservation.status!=='Cancelled')
                    .map(reservation => (
                      <ReservationInfo status='Upcoming'reservation={reservation} cancelOwnReservation= {this.props.cancelOwnReservation}/>
                    ));
        past = this.props.auth.user.reservations
                    .filter(reservation => (moment(reservation.startTime).diff(moment())) <= -15*60*1000&& reservation.status!=='Cancelled')
                    .map(reservation => (
                      <ReservationInfo status = 'Past' reservation={reservation} cancelOwnReservation= {this.props.cancelOwnReservation}/>
                    ));
        current = this.props.auth.user.reservations
                    .filter(reservation => (moment(reservation.startTime).diff(moment())) > -60 * 60 * 1000 && (moment(reservation.startTime).diff(moment())) <0&&reservation.status!=='Cancelled')
                    .map(reservation => (
                      <ReservationInfo status = 'Current'reservation={reservation} cancelOwnReservation= {this.props.cancelOwnReservation}/>
                    ));
        cancelled = this.props.auth.user.reservations
                    .filter(reservation => reservation.status==='Cancelled')
                    .map(reservation => (
                      <ReservationInfo status = 'Cancelled'reservation={reservation} cancelOwnReservation= {this.props.cancelOwnReservation}/>
                    ));
          content = 
          (<Wrapper>
            <Typography variant='display1' className = {this.props.classes.listText}>Upcoming Reservation</Typography>
            {upcoming}
            <Typography variant='display1' className = {this.props.classes.listText}>Past Reservation</Typography>
            {past}
            <Typography variant='display1' className = {this.props.classes.listText}>Current Reservation</Typography>
            {current}
            <Typography variant='display1' className = {this.props.classes.listText}>Cancelled Reservation</Typography>
            {cancelled}
          </Wrapper>);

      }
    }
    return (

      <Grid container spacing={24} className = {this.props.classes.root}>
        <Grid item xs={3} className = {this.props.classes.gridItem}>
          <Paper className = {this.props.classes.paper} square={true}>
            <List className = {this.props.classes.list}>
              <ListItem button className = {(this.props.location.pathname==='/account')?this.props.classes.listItemActive: ""} onClick={()=>this.routeClickHandler('')}>
                <ListItemIcon >
                  <Person  className = {this.props.classes.listText}/>
                </ListItemIcon>
                <ListItemText primary = 'Account' classes = {{primary: this.props.classes.listText}}/>
              </ListItem>
              <ListItem button className = {(this.props.location.pathname==='/account/reservations')?this.props.classes.listItemActive: ""} onClick={()=>this.routeClickHandler('/reservations')}>
                <ListItemIcon>
                  <LibraryBooks className = {this.props.classes.listText}/>
                </ListItemIcon>
                <ListItemText primary = 'Manage Reservations' classes = {{primary: this.props.classes.listText}}/>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Notifications className = {this.props.classes.listText}/>
                </ListItemIcon>
                <ListItemText primary = 'Notification' classes = {{primary: this.props.classes.listText}}/>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>

          {content}
        </Grid>
      </Grid>
    )
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  page: state.page
});
const mapDispatchToProps= dispatch=>({
  getCurrentUser: (history)=>dispatch(getCurrentUser(history)),
  cancelOwnReservation: (reservationId)=>dispatch(cancelOwnReservation(reservationId))
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));
