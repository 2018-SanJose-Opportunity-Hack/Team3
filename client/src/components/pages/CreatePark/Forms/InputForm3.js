import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const InputForm3 = (props) =>
{
    const {classes} = props;

    return (
            <form className = {classes.container} noValidate = {true} autoComplete = 'off'>
                <p className = {classes.msg}> Accepts .PNG, .JPG, and .JPEG images. </p>
                <input type = 'file' accept = '.png, .jpg, .jpeg'
                    onChange = {(event) => props.fileUpload(event.target.files[0])}/>

                <div className = {classes.divider}/>

                <Button variant = 'contained' color = 'primary' onClick = {props.clickedBack} className = {classes.button}> Back </Button>
                <Button variant = 'contained' color = 'primary' onClick = {props.clickedNext} className = {classes.button}> Next </Button>
            </form>
    );
}

const styles = () =>
{
    return (
    {
        container:
        {
            width: '95%',
            margin: 'auto',
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: 'lightgrey',
            borderRadius: '1.5rem'
        },
        msg: {textAlign: 'center'},
        divider: {height: '1rem'},
        button: {marginRight: '1rem'}
    })
}

export default withStyles(styles)(InputForm3);