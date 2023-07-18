import './style.css';
import React from "react";
import logo from '../../assets/images/logo.png'
import hamburgerMenu from '../../assets/icons/material-symbols_menu-rounded.svg'

const Navbar: React.FC = () =>{
    return(
        <div className="navbar">
            <div className="navbar_items">
                <img src={logo} className="logo"/>
                <img className="hamburgerIcon" src={hamburgerMenu}/>
            </div>
        </div>
    )
}
export default Navbar;