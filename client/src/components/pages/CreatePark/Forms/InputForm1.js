import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class InputForm1 extends Component
{
    state = {parkNameError: false, parkAddressError: false}

    getState = (id) => {return this.props.stateObj[id];}
    handleChange = (id, value) => {this.props.change(id, value);}
    resetError = (id) => {if (this.state[id + 'Error'] === true) {this.setState({[id + 'Error']: false})}}
    checkData = () =>
    {
        if (this.props.stateObj['parkName'].trim().length === 0 || this.props.stateObj['parkAddress'].trim().length === 0)
        {
            if (this.props.stateObj['parkName'].trim().length === 0) this.setState({parkNameError: true});
            if (this.props.stateObj['parkAddress'].trim().length === 0) this.setState({parkAddressError: true});
        }
        else {this.props.clickedNext();}
    }

    render()
    {
        const {classes} = this.props;

        return (
            <div className = {classes.container}>

                <TextField
                    label = 'Park Name'
                    className = {classes.parkName}
                    id = 'parkName'
                    name = 'parkName'
                    value = {this.getState('parkName')}
                    error = {this.state.parkNameError}
                    helperText = {this.state.parkNameError ? 'missing data' : ''}
                    onChange = {(event) => {this.resetError('parkName'); this.handleChange('parkName', event.target.value);}}
                />

                <div className = {classes.divider}/>
    
                <TextField
                    label = 'Park Address'
                    className = {classes.parkAddress}
                    id = 'parkAddress'
                    name = 'parkAddress'
                    value = {this.getState('parkAddress')}
                    error = {this.state.parkAddressError}
                    helperText = {this.state.parkAddressError ? 'missing data' : ''}
                    onChange = {(event) => {this.resetError('parkAddress'); this.handleChange('parkAddress', event.target.value);}}
                />

                <div className = {classes.divider}/>

                <Button variant = 'contained' color = 'primary' onClick = {(e) => {e.preventDefault(); this.checkData();}}
                  className = {classes.button}> Next
                </Button>
    
            </div>
        );
    }
}

const styles = () =>
{
    return (
    {
        container:
        {
            margin: 'auto',
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: 'lightgrey',
            borderRadius: '1.5rem'
        },
        parkName: {width: '30rem'},
        parkAddress: {width: '40rem'},
        divider: {height: '1rem'}
    })
}

export default withStyles(styles)(InputForm1);