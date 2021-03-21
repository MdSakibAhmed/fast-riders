import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    // <div className="d-flex container justify-content-between pt-5">
    // <div className="logo text-left">
    // <h2>urban riders</h2>

    // </div>
    // <nav style={{marginRight:"30px"}}>
    //     <Link style={{textDecoration:"none"}} className="mr-3 navLink" to="/">Home</Link>
    //     <Link className="mr-3 navLink" to="/location">Destination</Link>
    //     <Link className="mr-3 navLink" to="/">Blog</Link>
    //     <Link className="mr-3 navLink" to="/">Contact</Link>
    //     <Link  className="mr-3 navLink" to="/login">{loggedInUser.email ? loggedInUser.name:"Login"}</Link>
    // </nav>

    // </div>

    <nav className="navbar navbar-expand-lg navbar-light pt-4">
      <div className="container ">
        
          <div className="">
            <Link className="navbar-brand" to="/">
              <h2>Fast Riders</h2> 
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse navigation-var " id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/location">
                  Destination
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Contact
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  {loggedInUser.email ? loggedInUser.name : "Login"}
                </Link>
              </li>
            </ul>
        
        </div>
      </div>
    </nav>
  );
};

export default Header;
