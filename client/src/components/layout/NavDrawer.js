import React from 'react';
//import {List, Drawer, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {withStyles} from '@material-ui/core/styles';

import {Link, withRouter} from 'react-router-dom';
const styles = {
  root: {
    width: 400
  },
  drawerPaper: {
    backgroundColor: '#0076bc'
  },
  listText:{
    color: 'white'
  }
};
const navDrawer = (props)=>{
  //Add extra properties if user is authenticated
  let authUserOptions = null;
  if(props.auth.user){
    authUserOptions = [
        <ListItem key = 'Username'>
          <ListItemText primary = {props.auth.user.username} classes = {{primary: props.classes.listText}}/>
        </ListItem>
        ,
        <ListItem button component = {Link} to="/account" key='Account'>
          <ListItemText primary = 'Account' classes = {{primary: props.classes.listText}}/>
        </ListItem>
        ,
        <ListItem button onClick = {props.signOut} key = 'Signout' >
          <ListItemText primary = 'Sign Out' classes = {{primary: props.classes.listText}}/>
        </ListItem>
    ]
  }else{
    authUserOptions = [
      <ListItem button component = {Link} to ="/login" key= 'Login'>
        <ListItemText primary = 'Log In' classes = {{primary: props.classes.listText}}/>
      </ListItem>,
      <ListItem button component = {Link} to ="/register" key = 'Register'>
        <ListItemText primary = 'Register' classes = {{primary: props.classes.listText}}/>
      </ListItem>
    ]
  }
  return (
    <Drawer open = {props.open} onClose = {()=>props.toggle(false)} classes = {{paper: props.classes.drawerPaper}}>
      <List className={props.classes.root} onClick = {()=>props.toggle(false)}>
        
        <ListItem button component = {Link} to = "/">
          <ListItemText primary="Home" classes = {{primary: props.classes.listText}}/>
        </ListItem>
        <ListItem button component = {Link}  to ="/parks" >
          <ListItemText primary="Parks" classes = {{primary: props.classes.listText}}/>
        </ListItem>
        {authUserOptions}
        <ListItem button>
          <ListItemText primary="Back" classes = {{primary: props.classes.listText}}/>
        </ListItem>
      </List>
    </Drawer>
  );
}
export default withStyles(styles)(navDrawer);