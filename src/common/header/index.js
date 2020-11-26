import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";
import { TextField, Menu, MenuItem, Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AppContext from "../app-context";
import PROFILE_ICON from "../../assets/profile_icon.png";


const Header = () => {
  const { isLoggedIn, setIsLoggedIn, searchKey, setSearchKey } = useContext(
    AppContext
  );
  const history = useHistory();

  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("access_token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      history.push("/");
    }
  }, []);

  const logoutHandler = () => {
    setMenuOpened(false);
    sessionStorage.removeItem("access_token");
    setIsLoggedIn(false);
    history.push("/");
  };

  return (
    <div className="header-container">
      <span className="app-logo">Image Viewer</span>
      {isLoggedIn && (
        <div className="right-container">
          <TextField
            id="outlined-basic"
            className="search-damage-id"
            placeholder="Search"
            variant="outlined"
            value={searchKey}
            onChange={event => setSearchKey(event.target.value)}
            InputProps={{
              startAdornment: <SearchIcon />
            }}
          />
          <div>
            <Avatar src={PROFILE_ICON} onClick={() => setMenuOpened(true)} />
            <div>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={menuOpened}
                onClose={() => setMenuOpened(false)}
              >
                <MenuItem>My Account</MenuItem>
                <hr />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
