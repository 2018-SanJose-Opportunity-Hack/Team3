import React from 'react';
import ImgContainer from '../../../../general/ImgContainer';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import styles from './Styles';
import {withStyles} from '@material-ui/core/styles';
const photos = (props)=>{
  return (
    <Paper className = {props.classes.container}>
      <Typography variant = 'headline'>
          Photos
      </Typography>
      <Divider/>
      {props.photos.length===0?
          <Typography>
            No Photos Yet
          </Typography>
        :null}
      <GridList cellHeight={180} cols={3}>
        {props.photos.map(photo => (
          <GridListTile cols={1}>
            <ImgContainer imgStyles = {
              {
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
              }
            }
            src = {
              photo
            }
            />
          </GridListTile>
        ))}
        
      </GridList>
    </Paper>
  )
}
export default withStyles(styles)(photos);
