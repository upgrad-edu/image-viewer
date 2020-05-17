import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div>
                <header id='header'>
                    <span className='header-text'>Image Viewer</span>
                </header>
            </div>
        )
    }
}

export default Header;