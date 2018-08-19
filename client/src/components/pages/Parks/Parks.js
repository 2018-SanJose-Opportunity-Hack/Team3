import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getParkList} from '../../../store/actions/parkActions';
import Park from '../Parks/components/ParkItem/ParkItem';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';
import styles from './Styles';

class Parks extends Component{
  componentWillMount(){
    this.props.getParks();
  }
  cardItemClicked = (id)=>{
    this.props.history.push(`/park/${id}`);
    
  }
  render(){
    let mapped = null
    if(this.props.parks.parks){
      mapped = this.props.parks.parks.map(element=>(
              <Grid item md ={6} xs={12} key = {element.name}>
                <Park desc=''name={element.name} id = {element._id} image={element.image}click = {()=>this.cardItemClicked(element._id)}/>
              </Grid>
            ))
    }
    return(
      <div>
        {this.props.loading.parksLoading ? 
          <CircularProgress className = {this.props.classes.spinner} size={50} thickness={7}/> :
          <Grid container spacing={24} className = {this.props.classes.container}>
            {mapped}
          </Grid> 
        }
      </div>
      
    
    );
  } 
  
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  parks: state.parks,
  loading: state.loading
});
const mapDispatchToProps = (dispatch) => ({
  getParks: ()=> dispatch(getParkList())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Parks));