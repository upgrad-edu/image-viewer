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
import Header from './../../common/header/Header';

import './Login.css'

const styles = {
    card: {
        padding: '15px',
        position: 'relative',
        top: '90px',
        left: '50%',
        width: '325px',
        transform: 'translateX(-50%)',
    },
    title: {
        fontSize: 20
    }
};

class Login extends Component {
    constructor() {
        super();
        this.state = {
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            incorrectUsernamePassword: "dispNone",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        };
        this.loginClickHandler = this.loginClickHandler.bind(this);
        this.inputUsernameChangeHandler = this.inputUsernameChangeHandler.bind(this);
        this.inputLoginPasswordChangeHandler = this.inputLoginPasswordChangeHandler.bind(this);
    }

    loginClickHandler() {
        this.setState({ incorrectUsernamePassword: "dispNone" });
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });

        if (this.state.username === "" || this.state.loginPassword === "") { return }

        // Setting the default username and Instagram access-token
        if (this.state.username === "admin" && this.state.loginPassword === "admin") {
            sessionStorage.setItem('username', 'admin');
            sessionStorage.setItem('access-token', 'IGQVJVcFI5Yk5ZAUFBVd3NUc0dER0lJZAXJfczB6UFFGV3pJRW13RV9GbEVoUk92QlNWZAlV1NlZAUOGRseGlENFVsMHBncWlQaG9hUS1iUE5JbGsxcWM2cU1tcXVjRlk4Y0todkJwNzJsYzQwWHZAYRFdsSgZDZD');
            this.setState({ loggedIn: true });

            // Redirect to Home
            this.navigateToHome();
        } else {
            this.setState({ incorrectUsernamePassword: "dispBlock" });
        }
    }

    navigateToHome = () => {
        this.props.history.push('/home');
    }

    inputUsernameChangeHandler = event => {
        this.setState({ username: event.target.value });
    }

    inputLoginPasswordChangeHandler = event => {
        this.setState({ loginPassword: event.target.value });
    }

    render() {
        return (
            <div className="main-container">
                <Header
                    screen={"Login"} />
                <Card style={styles.card}>
                    <CardContent>
                        <Typography style={styles.title}> LOGIN </Typography><br />
                        <FormControl required style={{ width: '100%' }}>
                            <InputLabel htmlFor="username"> Username </InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required style={{ width: '100%' }}>
                            <InputLabel htmlFor="password"> Password </InputLabel>
                            <Input id="password" type="password" onChange={this.inputLoginPasswordChangeHandler} />
                            <FormHelperText className={this.state.loginPasswordRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <div className={this.state.incorrectUsernamePassword}><span className="red"> Incorrect username and/or password </span></div><br />
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}> LOGIN </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Login;