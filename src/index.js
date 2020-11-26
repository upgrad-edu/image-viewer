import React, { useState } from "react";
import ReactDOM from "react-dom";
import AppRouter from "./common/router";
import "./index.css";
import { AppProvider } from "./common/app-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  return (
    <AppProvider
      value={{
        searchKey,
        setSearchKey,
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      <AppRouter />
    </AppProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
