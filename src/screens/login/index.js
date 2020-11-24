import React, { useState } from "react";
import Header from "../../common/header";
import {
  Card,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  Button
} from "@material-ui/core";
import "./index.css";

const USER_DETAILS = {
  userName: "user",
  password: "user"
};
const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    login: false,
    userName: false,
    password: false
  });

  const login = () => {
    if (!username || !password) {
      setError({
        ...error,
        userName: !username,
        password:!password
      });
    } else if (
      username === USER_DETAILS.userName &&
      password === USER_DETAILS.password
    ) {
      setError({
        ...error,
        login: false
      });
    } else {
      setError({
        ...error,
        login: true
      });
    }
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-form-conatiner">
        <Card>
          <CardContent>
            <div className="login-form">
              <label>LOGIN</label>
              <FormControl>
                <InputLabel htmlFor="my-input">Username *</InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  value={username}
                  onChange={event => {
                    setError({
                        ...error,
                        login: false,
                        userName:false
                      });
                    setUserName(event.target.value);
                  }}
                />
                {error.userName && (
                  <span className="error-message">
                   required
                  </span>
                )}
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="my-input">Password *</InputLabel>
                <Input
                  type="password"
                  id="my-input"
                  value={password}
                  aria-describedby="my-helper-text"
                  onChange={event => {
                    setError({
                        ...error,
                        login: false,
                        password:false
                      });
                    setPassword(event.target.value);
                  }}
                />
                {error.password && (
                  <span className="error-message">
                    required
                  </span>
                )}
              </FormControl>
              {error.login && (
                <span className="error-message">
                  Incorrect username and/or password
                </span>
              )}
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={false}
                  onClick={login}
                >
                  LOGIN
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
