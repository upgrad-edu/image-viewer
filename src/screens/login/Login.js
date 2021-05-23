import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import Header from '../../common/Header';
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
            username: "",
            usernameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            incorrectUsernamePassword: "dispNone",
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true
        };
    }

    loginClickHandler = () => {
        this.setState({ incorrectUsernamePassword: "dispNone" });
        if(this.state.username === "") {
            this.setState({ usernameRequired: "dispBlock" })
        } else {
            this.setState({ usernameRequired: "dispNone" });
        }
        if(this.state.password === "") {
            this.setState({ passwordRequired: "dispBlock" })
        } else {
            this.setState({ passwordRequired: "dispNone" });
        }

        if (this.state.username === "" || this.state.password === "") {
            return;
        }

        /*Username and Password have been hardcoded.
        username and access token values have been supplied. These will be uitlized to access user info
        and images present on my mock instagram account
         */

        if (this.state.username === "siddharth" && this.state.password === "siddharth") {
            sessionStorage.setItem('username','siddhartth13');
            sessionStorage.setItem('access-token', 'IGQVJVclVGaE9oYnhxNnRNaFFJUE1jMVVYTzk4bk1TWUdUeDhfVVJVNDlITmZA4aUxzWUFhV0FuWTBlbVY2cUsxSGF2N3FWZAkh2SFZAwczd6eU0zOTNVMTJheHhNWmt1T2QzRWd5ZADFXOF9Jc09XMXJvMgZDZD');
            this.setState({ loggedIn: true });
            this.props.history.push('/home');
        } else {
            this.setState({ incorrectUsernamePassword: "dispBlock" });
        }
    }
    PasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }
    UsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    render() {
        return (
            <div className="main-container">
                <Header screen={"Login"}/>
                <Card style={styles.card}>
                    <CardContent>
                        <Typography style={styles.title}> LOGIN </Typography><br />
                        <FormControl required style={{width: '100%'}}>
                            <InputLabel htmlFor="username"> Username </InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.UsernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required style={{width: '100%'}}>
                            <InputLabel htmlFor="password"> Password </InputLabel>
                            <Input id="password" type="password" onChange={this.PasswordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <div className={this.state.incorrectUsernamePassword}><span className="red"> Incorrect username and/or password </span></div><br />
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}> LOGIN </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Login;