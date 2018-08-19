import React, {Component} from 'react';
import {connect} from 'react-redux';
import Image from 'material-ui-image';
import Grid from '@material-ui/core/Grid';
import {getParkById} from '../../../store/actions/parkActions';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Wrapper from '../../hoc/Wrapper';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InfoIcon from '@material-ui/icons/Info';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import TimelineIcon from '@material-ui/icons/Timeline';
import MapIcon from '@material-ui/icons/Map';
import Info from './components/Info/Info';
import Photos from './components/Photos/Photos';
import Availibility from './components/Availability/Availability';
import {withStyles} from '@material-ui/core/styles';
import ImgContainer from '../../general/ImgContainer';
import './Stylesheet.css';
import styles from './Styles';
class Park extends Component{
  state = {
    tabValue: 0,
    hoveredImage: false
  }
  componentWillMount(){
    this.props.getParkById(this.props.match.params.id);
  }
  handleChange = (e, value)=>{
    this.setState({tabValue: value})
  }
  render(){
    let parkInfo = null;
    if(this.props.loading.parkLoading){
      parkInfo = (<CircularProgress className = {this.props.classes.spinner} size={50} thickness={7}/>);
    }else{
      if(this.props.errors.park.error){
        parkInfo = (
          <Typography >404 Not Found</Typography>
        )
      }else if(this.props.park.park){
        parkInfo = (
          
            <Grid container spacing = {24} className = {this.props.classes.mainContainer}>
              <Grid item container spacing = {8} xs={12} md = {8} className = {this.props.classes.contentContainer}>
                <Grid item xs = {12} className = {this.props.classes.imageContainer}>
                  <ImgContainer imgStyles = {{backgroundSize: 'cover', backgroundPosition: 'center', height: 300}}src = {(this.props.park.park.image !== 'none' ? this.props.park.park.image : 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg')}/>
                  <div style = {styles.nameDiv} className = 'nameDiv'>
                    <Typography className = {this.props.classes.title}variant='display1'>{this.props.park.park.name}</Typography>
                  </div>
                </Grid>

                <Grid item xs = {12} className = {this.props.classes.tabContainer}>
                  <Paper>
                    <Tabs
                      value = {this.state.tabValue}
                      onChange = {this.handleChange}
                      fullWidth
                      indicatorColor = "primary"
                      textColor = "primary"
                    >
                      <Tab icon={<InfoIcon/>} label='INFORMATION'/>
                      <Tab icon={<InsertPhotoIcon/>} label='PHOTOS'/>
                      <Tab icon = {<TimelineIcon/>} label = 'AVAILABILITY'/>
                      <Tab icon = {<MapIcon/>} label = 'MAP'/>
                    </Tabs>
                </Paper>
                </Grid>
                <Grid item xs = {12}>
                    {this.state.tabValue===0?
                      <Info 
                        desc = {this.props.park.park.desc}
                        days = {this.props.park.park.timeDays}
                      />
                    :null}
                    {this.state.tabValue===1?
                      <Photos
                        photos = {this.props.park.park.photos}
                      />
                    :null}
                    {this.state.tabValue===2?
                      <Availibility history = {this.props.history}/>
                    :null}
                </Grid>
              </Grid>
              <Grid item container spacing = {8} xs={12} md = {4}>
                
              </Grid>
            </Grid>
         
        )
      }
      
    }
    return(
      <Wrapper>{parkInfo}</Wrapper>
    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  park: state.park,
  loading: state.loading,
  errors: state.errors
});
const mapDispatchToProps = (dispatch)=>({
  getParkById: (id)=> dispatch(getParkById(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Park));

/*
< img
style = {
  { ...styles.img,
    backgroundImage: `url(${(this.props.park.park.image !== 'none' ? this.props.park.park.image : 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg')})`
  }
}
className = 'image' /
  >
*/