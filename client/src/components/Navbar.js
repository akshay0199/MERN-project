import React from 'react';
import {Link,withRouter} from 'react-router-dom'
function Navbar (props){
  return (
     <nav>
        <div className="nav-wrapper" style={{background:"#6200ee"}}>
        <a href="#" className="brand-logo">Product list</a>
        <ul id="nav-mobile" className="right">
            <li><Link to="/">home</Link></li>
        </ul>
        </div>
  </nav>
  )
}

export default withRouter(Navbar);

