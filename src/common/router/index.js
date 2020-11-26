import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../../screens/login";
import Home from "../../screens/home";
import Header from "../header";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
