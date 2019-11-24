import React from 'react';
import './Header.css';


const Header = function(props){

    return (<div className='header'>
        <span className="header-text">{props.heading}</span>

       <div className={props.searchDisplay}><span className={props.noSearchBox}>{props.searchDisplay}</span></div>
       <div className={props.iconDisplay}>
       <Link to="/profile/">
        <img src={logo}/>{props.logo}
        </Link>
      </div>

      </div>);
}

export default Header;