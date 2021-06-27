import React from 'react'
import { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
//import { Redirect } from 'react-router-dom';

import './Login.css'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        };     
        this.loginClickHandler = this.loginClickHandler.bind(this);
        this.inputUsernameChangeHandler = this.inputUsernameChangeHandler.bind(this);
        this.inputLoginPasswordChangeHandler = this.inputLoginPasswordChangeHandler.bind(this);
    }

    loginClickHandler() {
        let userName = "admin";
        let passWord = "admin";
        //let access = "instagram accesss token";
        if(this.state.username === userName && this.state.loginPassword === passWord) { 
            alert("Success!");
            sessionStorage.setItem("access-token", "InstaAccount");
            window.location.href = "www.google.com";
        }
    }

    inputUsernameChangeHandler = event => {
       this.setState({ username: event.target.value });
    }

    inputLoginPasswordChangeHandler = event => {
        this.setState({ loginPassword: event.target.value });
    }

    render() {
        return (
            <Card>
                <div>LOGIN</div>
                <FormControl required>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                    <FormHelperText className={this.state.usernameRequired}>
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                <FormControl required>  
                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                    <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                    <FormHelperText className={this.state.loginPasswordRequired}>
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                {this.state.loggedIn === true &&
                    <FormControl>
                        <span className="successText">
                            Login Successful!
                        </span>
                    </FormControl>
                }
                <br /><br />
                <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>

            </Card>
        );
    }
}

export default Login;