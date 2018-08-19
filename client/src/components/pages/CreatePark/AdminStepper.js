import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import InputForm1 from './Forms/InputForm1'
import InputForm2 from './Forms/InputForm2'
import InputForm3 from './Forms/InputForm3'
import {connect} from 'react-redux';
import {createPark} from '../../../store/actions/parkActions';
const moment = require('moment');

const STEP_TITLES = ['General Information', 'Park Schedule', 'Picture Upload'];

class AdminStepper extends Component
{
  state =
  {
    activeStep: 0,
    parkName: '',
    parkAddress: '',
    minGen: '',
    maxGen: '',
    days: [{min: '', max: ''},{min: '', max: ''},{min: '', max: ''},{min: '', max: ''},{min: '', max: ''},{min: '', max: ''},{min: '', max: ''}],
    imgFile: null
  }
  componentWillMount(){
    if(!this.props.auth.user){
      this.props.history.push('/login');
    }else if(!this.props.auth.user.isAdmin){
      console.log(this.props.auth.user);
      this.props.history.push('/account');
    }
  }
  handleNext = () => {this.setState({activeStep: this.state.activeStep + 1});}
  handleBack = () => {this.setState({activeStep: this.state.activeStep - 1});}
  handleChangeForm1 = (id, value) => {this.setState({[id]: value});}
  handleChangeForm2 = (id, day, value) =>
  {
    let daysArray = JSON.parse(JSON.stringify(this.state.days));

    if(id === 'disable')
    {
      if (value)
        daysArray[day] = null;
      else
        daysArray[day] = {min: '', max: ''};
      this.setState({days: daysArray});
    }
    else
    {
      daysArray[day][id] = value;
      this.setState({days: daysArray});
    }
  }
  handleChangeFormGen = (id, value) => {this.setState({[id]: value})}
  handleApplyAll = () => {const daysArray = Array(7).fill({min: this.state.minGen, max: this.state.maxGen}); this.setState({days: daysArray});};
  handleSubmit = () => {
    let days = JSON.parse(JSON.stringify(this.state.days));
    const convertDateToHours = (time)=>{
      const num = parseInt(time.split(' ')[0]);
      const am = time.split(' ')[1]==='AM';
      if(!am){
        
        if(num===12){
          return 12;
        }else{
          return num+12;
        }
      }else{
        if(num===12){
          return 0;
        }else{
          return num;
        }
      }
    }
    days = days.map(el=>({
      min: convertDateToHours(el.min)*3600000,
      max: convertDateToHours(el.max)*3600000
    }));
    console.log(this.state.imgFile);
    console.log(this.state.days);
    console.log(this.state.name, this.state.address, days, this.state.imgFile);
    this.props.createPark(this.state.parkName, this.state.parkAddress, days, this.state.imgFile, this.props.history);
  }

  render()
  {
    const {classes} = this.props;

    const form = (activeStep) =>
    {
      switch (activeStep)
      {
            case 0:
              return <InputForm1 clickedNext = {this.handleNext} stateObj = {this.state} change = {this.handleChangeForm1}/>;
            case 1:
              return <InputForm2 clickedNext = {this.handleNext} clickedBack = {this.handleBack} stateObj = {this.state}
                change = {this.handleChangeForm2} changeGen = {this.handleChangeFormGen} applyAll = {this.handleApplyAll}/>;
            case 2:
              return <InputForm3 clickedNext = {this.handleNext} clickedBack = {this.handleBack} stateObj = {this.state}
                fileUpload = {(file) => this.setState({imgFile: file})}/>;
            default:
              return (
                <div>
                    <Typography className = {classes.confirmation}>
                        All steps are completed. Do you wish to submit data or go back?
                    </Typography>
                    <div>
                        <Button onClick = {this.handleBack} className = {classes.button}>
                            Back
                        </Button>
                        <Button variant = 'contained' onClick = {this.handleSubmit} color = 'primary' className = {classes.button}>
                            Submit
                        </Button>
                    </div>
                </div>
              );
        }
    }

    return (
      <div className = {classes.root}>

        <Stepper activeStep = {this.state.activeStep} className = {classes.stepper}>
          {STEP_TITLES.map((label) =>
          {
            const props = {};
            const labelProps = {};

            return (
              <Step key = {label} {...props}>
                <StepLabel {...labelProps}> {label} </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div className = {classes.divider}/>
        
        {form(this.state.activeStep)}

      </div>
    );
  }
}

const styles = (theme) => 
{
  return (
    {
      form: {margin: 'auto', width: '90%'},
      root: {margin: 'auto'},
      stepper: {backgroundColor: 'lightblue', width: '90%', margin: 'auto', borderRadius: '1.2rem'},
      button: {marginRight: theme.spacing.unit},
      confirmation: {marginTop: theme.spacing.unit, marginBottom: theme.spacing.unit},
      instructions: {margin: '1.2rem', fontSize: '1.5rem'},
      divider : {height: '1.5rem'}
    }
  );
}
const mapStateToProps = (state)=>({
  auth: state.auth 
});
const mapDispatchToProps = (dispatch)=>({
  createPark: (name, address, days, file, history )=>dispatch(createPark(name, address, days, file, history))
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminStepper));