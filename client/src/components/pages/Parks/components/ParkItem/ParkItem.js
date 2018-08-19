import React from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import {withStyles} from '@material-ui/core/styles';
import styles from './Styles';
import './ParkItem.css';
const parkItem = (props)=>{
  return (
    <Card className = {props.classes.card} onClick= {props.click}>
      <CardMedia
        image = {props.image!=='none'?props.image:'https://material-ui.com/static/images/cards/contemplative-reptile.jpg'}
        className = 'media'
      >
        <div className = {props.classes.content}>
          <CardContent>
            <Typography gutterBottom variant="display1" component="h2" className = {props.classes.typography}>
              {props.name}
            </Typography>
            <Typography component="p" variant = 'subheading'className = {props.classes.typography}>
              {props.desc.length > 10?props.desc.substring(0,11): props.desc}
            </Typography>
          </CardContent>
        </div>
      </CardMedia>
    </Card>
  )
}
export default withStyles(styles)(parkItem);