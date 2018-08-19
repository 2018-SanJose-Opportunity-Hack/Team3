import React, {Component} from 'react';
import {connect} from 'react-redux';

import  { logoutUser }  from '../../store/actions/authActions';
import NavBar from './NavBar';
import NavDrawer from './NavDrawer';
import Wrapper from '../hoc/Wrapper';
class NavContainer extends Component{
  state = {
    drawerIsOpened: false
  }
  toggleDrawer = (value)=>{
    this.setState({
      drawerIsOpened: value
    });
  }
  logOutHandle = () => {
    this.props.onLogoutHandler();
    this.props.history.push('/login')
  }
  render(){
    return (
      <Wrapper>
        <NavBar page= {this.props.page} toggle = {this.toggleDrawer}/>
        <NavDrawer 
          signOut = {this.logOutHandle} 
          auth = {this.props.auth} 
          toggle={this.toggleDrawer} 
          open = {this.state.drawerIsOpened}/>
      </Wrapper>
    )
  };
}
const mapStateToProps = (state)=>({
  auth: state.auth,
  errors: state.errors
});
const mapDispatchToProps = (dispatch)=>({
  onLogoutHandler: () => dispatch(logoutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);