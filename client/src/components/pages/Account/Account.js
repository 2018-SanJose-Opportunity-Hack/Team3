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
import CardContent from '@material-ui/core/CardContent';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Notifications from '@material-ui/icons/Notifications';
import Typography from '@material-ui/core/Typography';
import styles from './Styles';
import AccountInfo from './components/AccountInfo/AccountInfo';
import {getCurrentUser} from '../../../store/actions/authActions';
class Account extends Component{
  state = {
    loading: true
  }
  componentWillMount(){
    if(!this.props.auth.user){
      console.log('no user');
      this.props.history.push('/login');
    }else{
      console.log('run current');
      console.log(localStorage);
      this.props.getCurrentUser(this.props.history);
    }
  }
  routeClickHandler = (type)=>{
    this.props.history.push(`${this.props.location.pathname}/${type}`);
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

        content = this.props.auth.user.reservations.map((reservation) => {
          let time = reservation.duration / 3600000;

          return(
            <Card key = {reservation._id} >
              <Typography >{reservation.status + ' reservation'} </Typography>
              <Typography >{'start time: ' + reservation.startTime} </Typography>
              <Typography >{'end time: ' + reservation.endTime} </Typography>
              <Typography >{'duration: ' + time + (time === 1 ? ' hour' : ' hours')} </Typography>
            </Card>
          );
        });

      }
    }
    return (

      <Grid container spacing={24} className = {this.props.classes.root}>
        <Grid item xs={3} className = {this.props.classes.gridItem}>
          <Paper className = {this.props.classes.paper} square={true}>
            <List className = {this.props.classes.list}>
              <ListItem button className = {(this.props.location.pathname==='/account')?this.props.classes.listItemActive: ""}>
                <ListItemIcon >
                  <Person  className = {this.props.classes.listText}/>
                </ListItemIcon>
                <ListItemText primary = 'Account' classes = {{primary: this.props.classes.listText}}/>
              </ListItem>
              <ListItem button className = {(this.props.location.pathname==='/account/reservations')?this.props.classes.listItemActive: ""}>
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
  getCurrentUser: (history)=>dispatch(getCurrentUser(history))
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));
