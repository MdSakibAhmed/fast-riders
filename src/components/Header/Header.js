import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import "./Header.css"

const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    return (
        <div className="d-flex container justify-content-between pt-5">
        <div className="logo text-left">
        <h2>urban riders</h2>


        </div>
        <nav style={{marginRight:"30px"}}>
            <Link style={{textDecoration:"none"}} className="mr-3 navLink" to="/">Home</Link>
            <Link className="mr-3 navLink" to="/location">Destination</Link>
            <Link className="mr-3 navLink" to="/">Blog</Link>
            <Link className="mr-3 navLink" to="/">Contact</Link>
            <Link  className="mr-3 navLink" to="/login">{loggedInUser.email ? loggedInUser.name:"Login"}</Link>
        </nav>
            
        </div>
    );
};

export default Header;