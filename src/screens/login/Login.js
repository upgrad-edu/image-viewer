import React, {Component} from 'react';
import Header from '../../common/Header';
import './Login.css';
import {
    Card,
    FormControl,
    Input,
    InputLabel,
    Button
} from '@material-ui/core';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isValidated: true,
            isEmptyUsername: false,
            isEmptyPassword: false
        };
    }

    setNewState(variable, username) {
        const updatedState = {};
        updatedState[username] = variable.target.value;
        this.setState(updatedState);
    }

    handleLogin = () => {
        const {username, password} = this.state;
        const pwd = 'password';
        const name = 'username';
        if (username === '' && password === '') {
            this.setState({isEmptyUsername: true, isEmptyPassword: true});
        } else {
            this.setState({isEmptyUsername: false, isEmptyPassword: false, validateCredentials: true});
            if (username === name && password === pwd) {
                this.setState({isValidated: true});
                sessionStorage.setItem('accessToken', '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784');
                window.location = '/home';
                return;
            }
            if (username === '') {
                this.setState({isEmptyUsername: true});
                return;
            }
            if (password === '') {
                this.setState({isEmptyPassword: true});
                return;
            }
            this.setState({isValidated: false});
        }
    };

    render() {
        const {isValidated, isEmptyUsername, isEmptyPassword} = this.state;
        return (
            <div className='login-container'>
                <Header/>
                <Card className='login-card'>
                    <p className='login-text'>LOGIN</p>
                    <FormControl fullWidth='true'>
                        <InputLabel htmlFor='username' required='true'>Username</InputLabel>
                        <Input id='username' onChange={variable => this.setNewState(variable, 'username')}/>
                        {isEmptyUsername ? <span className='violation'>required</span> : null}
                    </FormControl>
                    <FormControl fullWidth='true'>
                        <InputLabel htmlFor='password' required='true'>Password</InputLabel>
                        <Input id='password' onChange={variable => this.setNewState(variable, 'password')}/>
                        {isEmptyPassword ? <span className='violation'>required</span> : null}
                        {isValidated ? null : <span className='violation'>Incorrect username and/or password</span>}
                    </FormControl>
                    <Button className="login-btn m1" color='primary' variant='contained'
                            onClick={this.handleLogin}>LOGIN</Button>
                </Card>
            </div>
        );
    }
}