import React, { Component } from 'react';
 import Button from '@material-ui/core/Button';
 import Card from '@material-ui/core/Card';
 import CardContent from '@material-ui/core/CardContent';
 import Typography from '@material-ui/core/Typography';
 import FormControl from '@material-ui/core/FormControl';
 import InputLabel from '@material-ui/core/InputLabel';
 import Input from '@material-ui/core/Input';
 import FormHelperText from '@material-ui/core/FormHelperText';

 import Header from '../../common/header/Header';
 import './Login.css'

 const styles = {
     card: {
         padding: '15px',
         top: '90px',
         left: '50%',
         width: '325px',
         position: 'relative',
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
             loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
             username: "",
             usernameRequired: "dispNone",
             password: "",
             passwordRequired: "dispNone",
             incorrectUsernamePassword: "dispNone"
         };
     }

     OnClickEventHandler = () => {
         this.setState({ incorrectUsernamePassword: "dispNone" });
         this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
         this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

         if (this.state.username === "" || this.state.password === "") { return }

         if (this.state.username === "testuser" && this.state.password === "testuser") {
             sessionStorage.setItem('username','testuser');
             sessionStorage.setItem('access-token', 'IGQVJYTXFacm40ZAzYwZAjhiRVBTU05RdUV3NnZAVWmIwZA2xBQng5NGR4LXRpTXlKLU56OVpMTjFqWWtuTlJBcS11RGNmWVJZAcmxTVjJscjdvaG1MM2pUWHNPdFJYbkxkb3FqNVdILV82N3NDcWhocXlsMAZDZD');
             this.setState({ loggedIn: true });

             this.movetoHome();
         } else {
             this.setState({ incorrectUsernamePassword: "dispBlock" });
         }
     }

     movetoHome = () =>{
       this.props.history.push('/home');
     }

     usernameEventHandler = (e) => {
         this.setState({ username: e.target.value })
     }

     passwordEventHandler = (e) => {
         this.setState({ password: e.target.value })
     }

     render() {
         return (
             <div className="main-container">
                 <Header
                   screen={"Login"}/>
                 <Card style={styles.card}>
                     <CardContent>
                         <Typography style={styles.title}> LOGIN </Typography><br />
                         <FormControl required style={{width: '100%'}}>
                             <InputLabel htmlFor="username"> Username </InputLabel>
                             <Input id="username" type="text" username={this.state.username} onChange={this.usernameEventHandler} />
                             <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                         </FormControl><br /><br />
                         <FormControl required style={{width: '100%'}}>
                             <InputLabel htmlFor="password"> Password </InputLabel>
                             <Input id="password" type="password" onChange={this.passwordEventHandler} />
                             <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                         </FormControl><br /><br />
                         <div className={this.state.incorrectUsernamePassword}><span className="red"> Incorrect username and/or password </span></div><br />
                         <Button variant="contained" color="primary" onClick={this.OnClickEventHandler}> LOGIN </Button>
                     </CardContent>
                 </Card>
             </div>
         )
     }
 }

 export default Login;