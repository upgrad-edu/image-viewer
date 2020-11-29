import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../../screens/login/login";
import Home from "../../screens/home/home";
import Header from "../header/header";
import Profile from "../../screens/profile/profile";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
