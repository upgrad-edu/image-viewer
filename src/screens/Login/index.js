import React, { Component } from 'react';
import { Card, CardContent, Button, withStyles, Input, InputLabel, FormControl, FormHelperText } from '@material-ui/core';
import { Header } from './../../components';
import styles from './styles.module.css';

const materialStyles = theme => ({
	card: {
		display: 'flex'
	},
	card__content: {
		padding: '2.5rem',
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column'
	},
	login__btn: {
		display: 'flex',
		alignSelf: 'flex-start'
	}
});

class Login extends Component {

	constructor() {
		super();
		this.state = {
			username: "",
			usernameRequired: "dispNone",
			password: "",
			passwordRequired: "dispNone",
			loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
			// this is the username and password to allow the user to login to the application
			matchCredentials: {
				username: 'upgrad123',
				password: 'upgrad123'
			},
			accessToken: '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784',
			credentialsMismatchError: "dispNone"
		};
	}

	loginClickHandler = (e) => {

		let { username, password, matchCredentials, accessToken } = this.state;
		username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
		password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

		if (username === "" || password === "") { return }
		// check both username & password of the declared credentials of the constructor matches 

		if (username === matchCredentials.username && password === matchCredentials.password) {
			sessionStorage.setItem('access-token', accessToken)
			this.setState({ loggedIn: true, credentialsMismatchError: "dispNone" });
		}
		else {
			this.setState({ credentialsMismatchError: "dispBlock" })
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
		const { username, passwordRequired, usernameRequired, credentialsMismatchError } = this.state;
		return (
			<>
				<Header />
				<div className={styles.login}>
					<Card className={classes.card}>
						<CardContent className={classes.card__content}>
							<FormControl required>
								<InputLabel htmlFor="username"> Username </InputLabel>
								<Input id="username" type="text" username={username} onChange={this.inputUsernameChangeHandler} />
								<FormHelperText className={styles[usernameRequired]}><span className={styles.red}>required</span></FormHelperText>
							</FormControl><br /><br />
							<FormControl required>
								<InputLabel htmlFor="password"> Password </InputLabel>
								<Input id="password" type="password" onChange={this.inputPasswordChangeHandler} />
								<FormHelperText className={styles[passwordRequired]}><span className={styles.red}>required</span></FormHelperText>
							</FormControl><br />
							<FormHelperText className={styles[credentialsMismatchError]}><span className={styles.red}>Incorrect username and/or password</span></FormHelperText>
							<br />
							<Button variant="contained" color="primary" onClick={this.loginClickHandler} className={classes.login__btn}>LOGIN</Button>
						</CardContent>
					</Card>
				</div>
			</>
		);
	}
}

export default withStyles(materialStyles)(Login);
