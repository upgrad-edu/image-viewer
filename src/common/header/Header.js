import React, { Component } from 'react';
import './Header.css';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import profilePic from '../../assets/profilePic.jpg';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const MenuStyle = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        backgroundColor: '#DFDFDF',
        padding: "6px 15px",
        boxShadow: 'none',
        marginTop: 2
    }
})(Menu);

const MenuItemStyle= withStyles(theme => ({
    root: {
        padding: 4,
        minHeight: 'auto',
        '&:focus': {
            backgroundColor: theme.palette.grey,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            }
        }
    }
}))(MenuItem);

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            anchorEl: null
        }
    }

    /* Profile Icon*/
    onProfileIcon = (event) => {
        this.setState({ openMenu: !this.state.openMenu, anchorEl: event.currentTarget })
    }

    
    closeMenu = () => {
        this.setState({ openMenu: !this.state.openMenu, anchorEl: null })
    }

    /* Logout Button */
    onLogout = () => {
        sessionStorage.removeItem('access-token');
        this.props.history.push('/');
    }

   
    onLogon = () => {
        this.props.history.push('/home');
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    {this.props.loggedIn && this.props.history.location.pathname === '/profile' ?
                        <div onClick={this.onLogon} className="app-logo-clickable">
                            <span className="app-logo">Image Viewer</span>
                        </div>
                        :
                        <div>
                            <span className="app-logo">Image Viewer</span>
                        </div>}
                    
                    {this.props.loggedIn ?
                        <div className="app-header-right">
                            {this.props.homePage ?
                                <Input type="search" placeholder="Search…" disableUnderline className="search-box"
                                    startAdornment={
                                        <InputAdornment position="start" className="search-icon">
                                            <SearchIcon />
                                        </InputAdornment>
                                    } onChange={this.props.searchHandler} /> : ''}
                            <IconButton aria-controls="simple-menu" aria-haspopup="true"
                                onClick={this.onProfileIcon} style={{ padding: "5px 10px" }}>
                                <Avatar variant="circular" alt={profilePic} src={profilePic} style={{border: '1px solid white'}} ></Avatar>
                            </IconButton>
                            <MenuStyle id="simple-menu" open={this.state.openMenu} onClose={this.closeMenu}
                                anchorEl={this.state.anchorEl} getContentAnchorEl={null}
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }} keepMounted>
                                {this.props.homePage ?
                                    <MenuItemStyle onClick={this.props.myAccountHandler}>
                                        <Typography>My Account</Typography>
                                    </MenuItemStyle>
                                    : ''}
                                {this.props.homePage ?
                                    <Divider variant="middle" />
                                    : ''}
                                <MenuItemStyle onClick={this.onLogout}>
                                    <Typography>Logout</Typography>
                                </MenuItemStyle>
                            </MenuStyle>
                        </div>
                        : ''}
                </header>
            </div >
        )
    }
}

export default Header;
