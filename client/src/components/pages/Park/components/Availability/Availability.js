import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DatePicker from 'material-ui-pickers/DatePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {fetchDay} from '../../../../../store/actions/dayActions';
import {makeReservation} from '../../../../../store/actions/reservationActions';
import styles from './Styles';
import Slot from './components/Slot/Slot';
import Wrapper from '../../../../hoc/Wrapper';
const moment = require('moment-timezone');

class Availibility extends Component{
  state = {
    selectedDate: null,
    dayIndex: 0,
    minDate: null,
    maxDate: null,
    reservationModalStatus: false,
    selectedTimeBlockId: null,
    arrayCheckboxState: []
  }
   
  dateChangeHandler = (date) => {
    console.log(moment(date).tz('America/Los_Angeles').toDate()); 
    const index = this.props.park.park.days.findIndex((val) => {
      return (moment(date).tz("America/Los_Angeles").format('x') === moment(val.date).tz('America/Los_Angeles').format('x'));
    });
    this.setState({selectedDate: date, dayIndex: index});
  }
  reservationModalHandler = ()=>{
    this.setState({reservationModalStatus: false, selectedTimeBlockId: null});
  }
  openReservationModal = (id)=>{
    this.setState({reservationModalStatus: true, selectedTimeBlockId: id});
  }
  makeReservation = ()=>{
    console.log(this.state.selectedTimeBlockId);
    if(this.state.selectedTimeBlockId!==null){
      this.props.makeReservation(this.props.park.park._id, this.props.park.park.days[this.state.dayIndex]._id, this.state.selectedTimeBlockId, this.reservationModalHandler);
    }
  }

  componentWillMount(){
    console.log(moment.tz("America/Los_Angeles").startOf('day').toDate());
    const dateMin = this.props.park.park.days[0].date;
    const dateMax = this.props.park.park.days[this.props.park.park.days.length-1].date;
    
    this.setState({
      selectedDate: moment(dateMin).tz("America/Los_Angeles").toDate(),
      minDate: moment(dateMin).tz("America/Los_Angeles").toDate(),
      maxDate: moment(dateMax).tz("America/Los_Angeles").toDate()
    });
  }

  render()
  {
    let display = null;
    if(this.props.loading.dayLoading){
      display = (
        <Typography variant='body1'>Loading......</Typography>
      )
    }else if(this.props.errors.day.error){
      display = (
        <Typography variant='body1'>{this.props.errors.day.error}</Typography>
      )
    }else{
      display = (
        <Wrapper>
          <Modal
            open = {this.state.reservationModalStatus}
            onClose = {this.reservationModalHandler}
          >
            <Paper className = {this.props.classes.modalPaper}>
              <Typography variant= 'display1' className = {this.props.classes.message}>
                {this.props.auth.user?'Are you sure you want to reserve this time slot':'Please log in before making any reservation.'}
              </Typography>
              <Button color = 'primary' className = {this.props.classes.button} variant = 'contained' onClick = {this.props.auth.user? this.makeReservation: ()=>{this.props.history.push('/login')}}>
                  {this.props.auth.user ? 'Confirm': 'Login'}
                </Button>
              <Button className = {this.props.classes.button} variant = 'contained' onClick = {this.reservationModalHandler}>Close</Button>
            </Paper>
          </Modal>
          <div style = {{
            textAlign: 'center',
            paddingTop: 10,
            paddingBottom: 20
          }}>
          <div className = {this.props.classes.calenderDiv}>
            <MuiPickersUtilsProvider utils = {MomentUtils}>
              <DatePicker
                className = {this.props.classes.calender}
                label = 'SELECT DATE:'
                minDateMessage = 'reservations must be made 2 days in advance'
                maxDateMessage = 'reservations past 2 weeks cannot be made'
                value = {this.state.selectedDate}
                onChange = {this.dateChangeHandler}
                maxDate = {this.state.maxDate}
                minDate = {this.state.minDate}
                />
            </MuiPickersUtilsProvider>
          </div>
            
          </div>
          {this.props.park.park.days[this.state.dayIndex].timeblocks.map(el=>
          {
              return (
                <Slot 
                  startTime = {moment(el.startTime).tz("America/Los_Angeles").format('hh:mm A')}
                  endTime = {moment(el.endTime).tz("America/Los_Angeles").format('hh:mm A')}
                  isAvailable = {el.isAvailable}
                  click = {()=>this.openReservationModal(el._id)}
                />
              )
          })}
        </Wrapper>
      )
    }

    return(
      <Paper className  = {this.props.classes.container}>
        <Typography variant = 'headline'>
          Availibility
        </Typography>
        <Divider/>
        {display}
      </Paper>
    )
  }
}

const mapStateToProps = (state)=>({
  auth: state.auth,
  park: state.park,
  errors: state.errors,
  day: state.day,
  loading: state.loading
});
const mapDispatchToProps = (dispatch)=>({
  fetchDay: (parkId, dayId) => dispatch(fetchDay(parkId, dayId)),
  makeReservation: (parkId, dayId, timeBlockId, closeModal)=> dispatch(makeReservation(parkId, dayId, timeBlockId, closeModal))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Availibility));