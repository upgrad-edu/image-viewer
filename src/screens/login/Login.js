import React, {Component} from 'react';
import './Login.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

class Login extends Component {

   constructor() {
          super();
          this.state = {
              anchorEl: null,
              usernamePasswordIncorrect: "dispNone",
              usernameRequired: "dispNone",
              passwordRequired: "dispNone",
              username: "",
              password: "",
              loggedIn: sessionStorage.getItem("access-token") == null ? false : true
          }
      }

   inputUsernameChangeHandler = (e) => {
   	this.setState({ username: e.target.value });
   }

   inputLoginPasswordChangeHandler = (e) => {
   	this.setState({ loginPassword: e.target.value });
   }

    redirectToHome = () => {
           this.props.history.push("/home");
   }

   loginClickHandler = () => {

       let dummyUser = "dummy";
       let dummyPassword = "dummy@2019";
       let accessToken = "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784";

       if (this.state.username === dummyUser && this.state.password === dummyPassword) {
           window.sessionStorage.setItem("access-token", accessToken);
           this.props.history.push('/home/');
       }

       this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
       this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

       (this.state.username !== "") & (this.state.password !== "") & (this.state.username !== dummyUser || this.state.password !== dummyPassword) ? this.setState({ usernamePasswordIncorrect: "dispBlock" }) : this.setState({ usernamePasswordIncorrect: "dispNone" });


   }

	render(){
	  return(

		<div>
		<div className="app-header">
		<Header heading="Image Viewer"/><br />
		</div>

		<div className="card-container">
        <Card className="cardStyle">
        	<CardContent>
                <Typography variant="h5" component="h5">
        		LOGIN
        		</Typography>

        		<FormControl required>
        			<InputLabel htmlFor="username">Username</InputLabel>
        			<Input id="username" type="text" username={this.state.username} onChange={this.inputUserNameChangeHandler} />
        			<FormHelperText className={this.state.usernameRequired}>
                        <span className="red">Required</span>
                    </FormHelperText>
        		</FormControl>
        		<br /><br />

        		<FormControl required>
                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                    <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputPasswordChangeHandler} />
                    <FormHelperText className={this.state.passwordRequired}>
                        <span className="red">Required</span>
                    </FormHelperText>
        		</FormControl>
        		<br /><br />

                {this.state.loggedIn === false &&
                    <FormControl>
                        <span className={this.state.successful}>
                            Login Successful!
                        </span>
                    </FormControl>
                }

                {this.state.loggedIn === true &&
                    <FormControl>
                        <span className={this.state.failure}>
                            <span className="red">Incorrect username and/or password</span>
                        </span>
                    </FormControl>
                }

                <br /><br />
        		<Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
        	</CardContent>
        </Card>
      </div>
	</div>
 )}
}
export default Login;