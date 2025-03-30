import React from 'react'
import { NavLink } from 'react-router-dom'
import '../components_css/navbar.css'
import { IoMdHome } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";

const navbar = () => {
  return (
    <div>
      <nav>
        <h1>N Mart</h1>
        <div className="links">
            <NavLink className="linktext" to="/">
            <IoMdHome className="icon" />Home
            </NavLink>
            <NavLink to="/Login" className="linktext">
              Login
            </NavLink>
            <NavLink className="linktext" to="/Cart">
              <IoCartSharp />Cart
            </NavLink>
         
        </div>
      </nav>
    </div>
  )
}

export default navbar
