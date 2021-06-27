import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './screens/login/Login';
import Home from './screens/home/Home';


const App = () => (
  <Switch>
    <Route exact path='/' render={({history}, props) => <Login {...props} history={history}/>} />
    <Route exact path='/home' render={({history}, props) => <Home {...props} history={history}/>} />   
  </Switch>
)

export default App;
