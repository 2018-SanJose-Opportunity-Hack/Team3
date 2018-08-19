import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const moment = require('moment');

class InputForm2 extends Component
{
    state = {
        minError: [false,false,false,false,false,false,false],
        maxError: [false,false,false,false,false,false,false],
        compareError: [false,false,false,false,false,false,false],
        minGen: '',
        maxGen: ''
    }

    getState = (id, day) =>
    {
        if(this.props.stateObj.days[day] === null) 
            return '';
        else
            return this.props.stateObj.days[day][id];
    }

    handleChange = this.props.change;
    handleChangeGen = this.props.changeGen;
    resetError = (id, day) =>
    {
        if (id === 'allError')
        {
            const errorArrayMin = JSON.parse(JSON.stringify(this.state.minError));
            const errorArrayMax = JSON.parse(JSON.stringify(this.state.maxError));
            const errorArrayCompare = JSON.parse(JSON.stringify(this.state.compareError));
            errorArrayMin[day] = false;
            errorArrayMax[day] = false;
            errorArrayCompare[day] = false;

            this.setState({minError: errorArrayMin});
            this.setState({maxError: errorArrayMax});
            this.setState({compareError: errorArrayCompare});
        }
        else
        {
            const errorArray = JSON.parse(JSON.stringify(this.state[id]));
            const errorArrayCompare = JSON.parse(JSON.stringify(this.state.compareError));
            if(errorArrayCompare[day] === true)
            {
                errorArrayCompare[day] = false;
                this.setState({compareError: errorArray});
            }
            if(errorArray[day] === true)
            {
                errorArray[day] = false;
                this.setState({[id]: errorArray});
            }
        }
    }

    resetErrorAll = () => 
    {
        const errorArray = Array(7).fill(false);
        this.setState({minError: errorArray});
        this.setState({maxError: errorArray});
        this.setState({compareError: errorArray});
    }

    checkData = () =>
    {
        let validIndex = [];
        for(let j = 0; j < this.props.stateObj.days.length; j ++)
            if(this.props.stateObj.days[j] !== null)
                validIndex.push(j);

        const errorArrayMin = JSON.parse(JSON.stringify(this.state.minError));
        const errorArrayMax = JSON.parse(JSON.stringify(this.state.maxError));

        for(let i = 0; i < validIndex.length; i ++)
        {
            const day = this.props.stateObj.days[validIndex[i]];

            if(day.min === '') {errorArrayMin[validIndex[i]] = true;}
            if(day.max === '') {errorArrayMax[validIndex[i]] = true;}
        }

        if(arrayAllFalse(errorArrayMin) && arrayAllFalse(errorArrayMax))
        {
            const errorArrayCompare = JSON.parse(JSON.stringify(this.state.compareError));

            for(let k = 0; k < validIndex.length; k ++)
            {
                const day = this.props.stateObj.days[validIndex[k]];
                const minTime = convertTo24(day.min);
                const maxTime = convertTo24(day.max);
                if(minTime >= maxTime) errorArrayCompare[validIndex[k]] = true;
            }

            if(arrayAllFalse(errorArrayCompare))
                this.props.clickedNext();
            else
                this.setState({compareError: errorArrayCompare});

        }
        else
        {
            this.setState({minError: errorArrayMin});
            this.setState({maxError: errorArrayMax});
        }
    }

    render()
    {
        const {classes} = this.props;
        const getTimeItems = () =>
        {
            const array = [];
            for(let i = 0; i < 24; i ++) {array.push(moment().startOf('day').add(i, 'h').format('h A'));}
    
            return array.map((e) => {return (<MenuItem key = {e} value = {e} className = {classes.menuItem}> {e} </MenuItem>);});
        }
        
        const getTimes = () =>
        {
            return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => {
                const dayNum = dayToNum(day);
                return (
                    <div key = {day} className = {classes.day}>
                        <h1 className = {classes.DOTW}> {day} </h1>
                        <TextField
                            id = {'min' + dayNum}
                            select
                            disabled = {this.props.stateObj.days[dayNum] === null}
                            error = {this.state.minError[dayNum]}
                            label = 'Opening Time'
                            helperText = {this.state.minError[dayNum] ? 'missing data' : ''}
                            className = {classes.textField}
                            value = {this.getState('min', dayNum)}
                            onChange = {(event) => {this.resetError('minError', dayNum); this.handleChange('min', dayNum, event.target.value);}}
                            SelectProps = {{MenuProps: {className: classes.menu}}}
                        > {getTimeItems()}
                        </TextField>
    
                        <TextField
                            id = {'max' + dayNum}
                            select
                            disabled = {this.props.stateObj.days[dayNum] === null}
                            error = {this.state.maxError[dayNum]}
                            label = 'Closing Time'
                            helperText = {this.state.maxError[dayNum] ? 'missing data' : ''}
                            className = {classes.textField}
                            value = {this.getState('max', dayNum)}
                            onChange = {(event) => {this.resetError('maxError', dayNum); this.handleChange('max', dayNum, event.target.value);}}
                            SelectProps = {{MenuProps: {className: classes.menu}}}
                        > {getTimeItems()}
                        </TextField>

                        {this.state.compareError[dayNum] ? <p className = {classes.error}> start time must be before end time </p> : null}
                        
                        <div className = {classes.divider}/>

                        <FormControlLabel label = 'disable' control = {
                            <Checkbox
                                id = {'checkbox' + dayNum}
                                checked = {this.props.stateObj.days[dayNum] === null}
                                onChange = {(event) => {this.resetError('allError', dayNum); this.handleChange('disable', dayNum, event.target.checked);}}
                            />
                        }/>
                        
                    </div>
                );
            });
        }

        const getGeneralTime = () =>
        {
            return (
                <div key = {'General'} className = {classes.dayGen}>
                    <h1 className = {classes.DOTW}> General Time </h1>
                    <TextField
                        id = {'minGen'}
                        select
                        label = 'Opening Time'
                        className = {classes.textField}
                        value = {this.props.stateObj.minGen}
                        onChange = {(event) => this.handleChangeGen('minGen', event.target.value)}
                        SelectProps = {{MenuProps: {className: classes.menu}}}
                    >
                        {getTimeItems()}
                    </TextField>

                    <TextField
                        id = {'maxGen'}
                        select
                        label = 'Closing Time'
                        className = {classes.textField}
                        value = {this.props.stateObj.maxGen}
                        onChange = {(event) => this.handleChangeGen('maxGen', event.target.value)}
                        SelectProps = {{MenuProps: {className: classes.menu}}}
                    >
                        {getTimeItems()}
                    </TextField>
                    
                    <div className = {classes.divider}/>

                    <Button variant = 'contained' color = 'primary' onClick = {() => {this.resetErrorAll(); this.props.applyAll();}} className = {classes.button}>
                        Apply To All
                    </Button>    
                </div>
            );
        }

        return (
            <div className = {classes.container}>
                <form noValidate autoComplete = 'off'>
                    {getGeneralTime()}
                    {getTimes()}

                    <Button variant = 'contained' color = 'primary' onClick = {this.props.clickedBack} className = {classes.button}>
                        Back
                    </Button>
                    
                    <Button variant = 'contained' color = 'primary' onClick = {(e) => {e.preventDefault(); this.checkData();}}>
                        Next
                    </Button>
                </form>
            </div>
        );
    }
}

const styles = (theme) =>
{
    return (
        {
            container:
            {
                width: '95%',
                margin: 'auto',
                marginBottom: '2rem',
                padding: '1.5rem',
                backgroundColor: 'darkgrey',
                borderRadius: '1.5rem',
            },
            textField:
            {
                marginLeft: theme.spacing.unit,
                marginRight: theme.spacing.unit,
                width: '8rem'
            },
            menuItem: {height: '0.5rem'},
            button: {marginRight: '1rem'},
            day: {margin: '1rem', padding: '1rem', backgroundColor: 'lightgrey', borderRadius: '1rem'},
            divider: {height: '1rem'},
            DOTW: {margin: '0', padding: '0.5rem'},
            dayGen: {margin: '1rem', padding: '1rem', backgroundColor: 'lightgreen', borderRadius: '1rem'},
            error: {color: 'red', fontSize: '0.8rem', padding: 0, margin: 0, marginTop: '0.4rem'}
        }
    );
}

const arrayAllFalse = (array) =>
{
    for (let i = 0; i < array.length; i ++) {if (array[i] === true) {return false;} }
    return true;
}

const convertTo24 = (str) =>
{
    const num = parseInt(str.substring(0, str.length - 3), 10);
    const suffix = str.substring(str.length - 2, str.length);

    if(suffix === 'AM')
    {
        if(num === 12)
            return 0;
        else
            return num;
    }
    else
    {
        if(num === 12)
            return 12
        else
            return num + 12;
    }
}

const dayToNum = (day) =>
{
    switch(day)
    {
        case 'Sunday':
            return 0;
        case 'Monday':
            return 1;
        case 'Tuesday':
            return 2;      
        case 'Wednesday':
            return 3;
        case 'Thursday':
            return 4;
        case 'Friday':
            return 5;   
        case 'Saturday':
            return 6;
        default:
            return null;                     
    }
}

export default withStyles(styles)(InputForm2);