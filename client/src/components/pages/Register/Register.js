import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';
import { connect } from 'react-redux';
import {registerUser} from '../../../store/actions/authActions';
import {withRouter} from 'react-router-dom';
import  Typography  from '../../../../node_modules/@material-ui/core/Typography';
import styles from './Styles';
class Register extends Component{
  state={
    username: "",
    email: "",
    password: "",
    password2: ""
  };
  onChangeFieldHandler = (name, event)=>{
    this.setState({
      [name]: event.target.value
    });
  }
  onRegisterClickHandler = () =>{
    this.props.registerUser({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }, this.props.history);
  }
  componentWillMount(){
    if(this.props.auth.user){
      this.props.history.push('/account');
    }
  }
  render() {
    return(
      <Grid container spacing={16} className = {this.props.classes.root}>
        <Paper elevation={2} className = {this.props.classes.paper}>
          <Grid item xs={12}>
            <Typography variant='title' className={this.props.classes.title}>Register</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel htmlFor='username' classes={
                {
                  root: this.props.classes.formLabel,
                }}>Username</InputLabel>
              <Input
                id = 'username'
                type = 'text'
                onChange = {(e)=>this.onChangeFieldHandler('username', e)}
                value = {this.state.username}
                error = {this.props.errors.login.username?true: false}
                autoComplete = "off" 
                className = {this.props.classes.formInput}>
              </Input>
              {this.props.errors.login.username? 
                <FormHelperText className = {this.props.classes.formHelper}>{this.props.errors.login.username}</FormHelperText>: null
              }
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel htmlFor='email' classes={
                {
                  root: this.props.classes.formLabel,
                }}>Email</InputLabel>
              <Input
                id = 'email'
                type = 'email'
                onChange = {(e)=>this.onChangeFieldHandler('email', e)}
                value = {this.state.email}
                error = {this.props.errors.register.email?true: false}
                autoComplete="off"
                className = {this.props.classes.formInput}>
              </Input>
              {this.props.errors.register.email? 
                <FormHelperText className = {this.props.classes.formHelper}>{this.props.errors.register.email}</FormHelperText>: null
              }
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel htmlFor='password' classes={
                {
                  root: this.props.classes.formLabel,
                }}>Password</InputLabel>
              <Input
                id = 'password'
                type = 'password'
                onChange = {(e)=>this.onChangeFieldHandler('password', e)}
                value = {this.state.password}
                error = {this.props.errors.register.password?true: false}
                autoComplete="off"
                className = {this.props.classes.formInput}>
              </Input>
              {this.props.errors.register.password? 
                <FormHelperText className = {this.props.classes.formHelper}>{this.props.errors.register.password}</FormHelperText>: null
              }
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel htmlFor='password2' classes={
                {
                  root: this.props.classes.formLabel,
                }}>Re-enter Password</InputLabel>
              <Input
                id = 'password2'
                type = 'password'
                onChange = {(e)=>this.onChangeFieldHandler('password2', e)}
                value = {this.state.password2}
                error = {this.props.errors.register.password2?true: false}
                autoComplete="off"
                className = {this.props.classes.formInput}>
              </Input>
              {this.props.errors.register.password2? 
                <FormHelperText className = {this.props.classes.formHelper}>{this.props.errors.register.password2}</FormHelperText>: null
              }
            </FormControl>
          </Grid>
          <Grid item xs= {12}>
            <Button 
              variant = 'contained' 
              color='primary' 
              onClick = {this.onRegisterClickHandler} 
              className = {this.props.classes.button}>
              Register
            </Button>
          </Grid>
        </Paper>
      </Grid>
    )

  }
};
const mapStateToProps = state =>({
  errors: state.errors,
  auth: state.auth,
  page: state.page
});
const mapDispatchToProps = dispatch => ({
  registerUser: (data, history) => dispatch(registerUser(data, history))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));