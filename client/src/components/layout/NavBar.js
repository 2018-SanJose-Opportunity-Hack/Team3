//import {AppBar, Typography, Toolbar, IconButton} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
//import {Menu as MenuIcon} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import React from 'react';
const styles = {
  menuButton: {
    margin: '0 20'
  },
  appBarColor: {
    backgroundColor: '#00283f',
    color: 'white'
  }
};

const navBar = (props)=>{
  console.log(props.page);
  const pages = {
    "/": "Home",
    "/login": "Login",
    "/register": "Register",
    "/account": "Account",
    "/parks": 'Parks',
    "/park": "Park"
  };
  return (
    <AppBar position = 'static' color='default' classes = {{colorDefault: props.classes.appBarColor}}>
      <Toolbar>
        <IconButton color = 'inherit' className = {props.classes.menuButton} onClick = {()=>props.toggle(true)}>
          <MenuIcon/>
        </IconButton>
        <Typography variant = 'title' color = 'inherit'>
          {pages[`/${props.page.split('/')[1]}`] ? pages[`/${props.page.split('/')[1]}`]: "Unknown"}
        </Typography>
      </Toolbar>
    </AppBar>
  )
};
export default withRouter(withStyles(styles)(navBar));