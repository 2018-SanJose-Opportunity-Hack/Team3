import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import {BrowserRouter, withRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {setPage} from './store/actions/pageActions';

import NavContainer from './components/layout/NavContainer';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Account from './components/pages/Account/Account';
import Parks from './components/pages/Parks/Parks';
import Park from './components/pages/Park/Park';
import AdminStepper from './components/pages/CreatePark/AdminStepper';
import './App.css';
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#0d47a1'
    }
  }
});
class App extends Component {
  state ={
    initializePage: false,
    routeChanged: false
  };
 
  render() {
   
  const temp = () => (<div></div>);
    
    return (
 
        <MuiThemeProvider theme = {theme}>
          <NavContainer page = {this.props.location.pathname} history = {this.props.history}/>
          <Switch>
            <Route exact path = '/' component = {temp}/>
            <Route exact path = "/login" component = {Login}/>
            <Route exact path = '/register' component = {Register}/>
            <Route path = '/account' component = {Account}/>
            <Route path = '/park/:id' component = {Park}/>
            <Route exact path = '/parks' component= {Parks}/>
            <Route exact path = '/createPark' component= {AdminStepper}/>
          </Switch>
        </MuiThemeProvider>
    
    );
  }
}

export default withRouter(App);
