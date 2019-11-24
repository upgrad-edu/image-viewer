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

class Login extends Component {
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
        			<Input id="username" type="text"/>
        		</FormControl>
        		<br /><br />

        		<FormControl required>
                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                    <Input id="loginPassword" type="password"/>
        		</FormControl>
        		<br /><br />

        		<Button variant="contained" color="primary">LOGIN</Button>
        	</CardContent>
        </Card>
      </div>
	</div>
 )}
}
export default Login;