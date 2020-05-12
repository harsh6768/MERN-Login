
import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
export default class Navbar extends Component {
  render() {
    return (
      <div >
        {/* nav will hide default bullets from navbar */}
        {/* navbar will manage the size of the navbar */}
        <nav className="nav navbar navbar-collapse bg-dark justify-content-center">
          <Link className="nav-link" to="/">
            <li className="nav-item text-white">Home</li>
          </Link>
          <Link className="nav-link" to="/about">
            <li className="nav-item text-white">About Me</li>
          </Link>
          <Link className="nav-link" to="/login">
            <li className="nav-item text-white btn">Login</li>
          </Link>
          
        </nav>
      </div>
    );
  }
}
