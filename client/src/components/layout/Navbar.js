import React from 'react'  //racf from es6 snippet
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
    <h1>
      <Link to="/dashboard"> <i className="fas fa-share-alt"></i> Connector </Link>
    </h1>
    <ul>
      <li><Link to='/profile' >Developers</Link></li>
      <li><Link to='/register' >Register</Link></li>
      <li><Link to='/login' >Login</Link></li>
    </ul>
  </nav>
  )
};

export default Navbar;