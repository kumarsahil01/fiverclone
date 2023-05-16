import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.scss";
const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setopen] = useState(false);

 const {pathname} =useLocation()
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.addEventListener("scroll", isActive);
    };
  }, []);
  const currentuser={
   id:1,
   username:"Sahil Kumar",
   isSeller:true
  }

  return (
    <div className={active||pathname!=='/' ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to='/' className="link">
          <span className="text">fiverr</span>
          </Link>  
          {/* this link doesn't work because we have to wrap our app in react router dom */}

          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>Sign in</span>
          {!currentuser?.isSeller && <span>Become a seller</span>}
          {!currentuser &&         <button>Join</button>}
          {currentuser && (
            <div className="user" onClick={()=>setopen(!open)}>
                <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                <span>{currentuser.username}</span>
               { open && <div className="options">
                  {
                    currentuser?.isSeller && (
                      <>
                      <Link to='/gigs' className="link">Gigs</Link>
                      <Link to='/add'className="link">Add New Gig</Link>
                      </>
                    )
                  }
                  <Link to='/orders' className="link">Orders</Link>
                  <Link to ='/messages' className="link">Messages</Link>
                  <Link to ='Logout' className="link">Logout</Link>
                  
                </div>}
            </div>
          )}
        </div>
      </div>
      {(active ||pathname!=='/') && (
        <>
          <hr />
          <div className="menu">
           <Link className="link menuLink" to='/'>  Graphics and Design</Link>
           <Link className="link " to='/'>  Video & Animation</Link>  <Link className="link " to='/'>  Writing & Translation</Link>
           <Link className="link " to='/'>  AI Services</Link>
           <Link className="link " to='/'>  Digital Marketing</Link>
           <Link className="link " to='/'>  Music & Audio</Link>
           <Link className="link " to='/'>  Programing & Tech</Link>
           <Link className="link " to='/'>  Business</Link>
           <Link className="link " to='/'>  Lifestyle</Link>

          </div>
          <hr />
          
        </>
      )}
    </div>
  );
};

export default Navbar;
