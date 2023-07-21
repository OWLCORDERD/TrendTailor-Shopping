import React from "react";
import "styles/navbar.scss";

const Navbar = () => {
  return (
    <nav className='Navbar-container'>
      <div className='logo'>
        <h1>wish</h1>
      </div>

      <ul className='Navbar-menu'>
        <li>
          <a href='#'>about</a>
        </li>
        <li>
          <a href='#'>work</a>
        </li>
        <li>
          <a href='#'>shop</a>
        </li>
        <li>
          <a href='#'>peed</a>
        </li>
      </ul>

      <div className='login-menu'>
        <button type='button' className='login-button'>
          login
        </button>

        <button type='button' className='signUp-button'>
          sing Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
