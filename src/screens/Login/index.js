import React, { Component } from 'react';
import Card from '@material-ui/core';
import CardContent from '@material-ui/core';
import Button from '@material-ui/core';
import withStyles from '@material-ui/core';
import Input from '@material-ui/core';
import InputLabel from '@material-ui/core';
import FormControl from '@material-ui/core';
import FormHelperText from '@material-ui/core';
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
			//To run the project locally enter your login credentials below
			creds: {
				username: '',
				password: ''
			},
			accessToken: '',
			//Add you access token here as it is sensitive
			error: "dispNone"
		};
	}

	loginClickHandler = (e) => {

		let { username, password, creds, accessToken } = this.state;
		username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
		password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

		//Username or Password shall not be empty
		if (username === "" || password === "") { return }
	

		if (username === creds.username && password === creds.password) {
			localStorage.setItem('access-token', accessToken)
			this.setState({ loggedIn: true, error: "dispNone" });
			this.props.history.push("/home");
		}
		else {
			this.setState({ error: "dispBlock" })
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
								<FormHelperText className={usernameRequired}><span className="red">required</span></FormHelperText>
							</FormControl><br /><br />
							<FormControl required>
								<InputLabel htmlFor="password"> Password </InputLabel>
								<Input id="password" type="password" onChange={this.inputPasswordChangeHandler} />
								<FormHelperText className={passwordRequired}><span className="red">required</span></FormHelperText>
							</FormControl><br />
							<FormHelperText className={credentialsMismatchError}><span className="red">Incorrect username and/or password</span></FormHelperText>
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
