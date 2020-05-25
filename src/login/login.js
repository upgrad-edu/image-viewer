import React, { Component } from 'react';
import Card from '@material-ui/core';
import CardContent from '@material-ui/core';
import Button from '@material-ui/core';
import withStyles from '@material-ui/core';
import Input from '@material-ui/core';
import InputLabel from '@material-ui/core';
import FormControl from '@material-ui/core';
import FormHelperText  from '@material-ui/core';
import { Header } from './../../components';
import styles from './Login.css';

const materialStyles = theme => ({
	card: {
		display: 'flex'
	},
	login: {
		display: 'flex',
		alignSelf: 'flex-start'
	},
	data: {
		padding: '2.5rem',
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column'
	},
	
});

class Login extends Component {

	constructor() {
		super();
		this.state = {
			username: "",
			usernameRequired: "dispNone",
			password: "",
			passwordRequired: "dispNone",
            //Putting session token in session storage
			loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
			// Enter your username and password here, we can read it from properties file also in case we do not want to commit sensitive data to github
			logindetails: {
				username: '',
				password: ''
			},
			accessToken: '',
			invalid: "dispNone"
		};
	}

	loginClickHandler = (e) => {

		let { username, password, logindetails, accessToken } = this.state;
		username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
		password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
		
		//Empty username and password
		if (username === "" || password === "") { return }
		
		//If credentials match , navigate to home page.
		if (username === logindetails.username && password === logindetails.password) {
			sessionStorage.setItem('access-token', accessToken)
			this.setState({ loggedIn: true, invalid: "dispNone" });
			
			this.props.history.push("/home");
		}
		else {
			this.setState({ invalid: "dispBlock" })
		}
	}
	inputUsernameChangeHandler = (e) => {
		this.setState({ username: e.target.value, usernameRequired: "dispNone" })
	}

	inputPasswordChangeHandler = (e) => {
		this.setState({ password: e.target.value, passwordRequired: "dispNone" })
	}

	render() {
		const { classes } = this.props;
		const { username, passwordRequired, usernameRequired, logindetails } = this.state;
		return (
			<>
				<Header />
				<div className={styles.login}>
					<Card className={classes.card}>
						<CardContent className={classes.Data}>
							<FormControl required>
								<InputLabel htmlFor="username"> Username </InputLabel>
								<Input id="username" type="text" username={username} onChange={this.inputUsernameChangeHandler} />
								<FormHelperText className={usernameRequired}><span className="red">required</span></FormHelperText>
							</FormControl><br /><br />
							<FormControl required>
								<InputLabel htmlFor="password"> Password </InputLabel>
								<Input id="password" type="password" onChange={this.inputPasswordChangeHandler} />
								<FormHelperText className={passwordRequired}><span className="red">required</span></FormHelperText>
							</FormControl><br />
							<FormHelperText className={logindetails}><span className="red">Incorrect username and/or password</span></FormHelperText>
							<br />
							<Button variant="contained" color="primary" onClick={this.loginClickHandler} className={classes.Login}>LOGIN</Button>
						</CardContent>
					</Card>
				</div>
			</>
		);
	}
}

export default withStyles(materialStyles)(Login);
