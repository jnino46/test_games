import React, { Component } from "react";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";

export default class HeaderNav extends Component {
    
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <img src={logo} className="App-logo" alt="logo" />
                <a className="navbar-brand" href="#">Pear Bite</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink to="/" className="nav-link" >Video Juegos</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/iteration/read'  className="nav-link">Iteraciones</NavLink>
                    </li>
                    </ul>
                </div>
                </nav>
        );
    }
}