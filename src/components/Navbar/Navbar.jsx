import React, { useEffect, useState } from "react";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest";
const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setopen] = useState(false);
  let navigate= useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const { pathname } = useLocation();
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.addEventListener("scroll", isActive);
    };
  }, []);
  const currentuser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
          </Link>
          {/* this link doesn't work because we have to wrap our app in react router dom */}

          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          <Link to='/login' className="link">Sign in</Link>
          {!currentuser?.isSeller && <span>Become a seller</span>}
          <Link to='/register'>{!currentuser && <button>Join</button>}</Link>
          
          {currentuser && (
            <div className="user" onClick={() => setopen(!open)}>
              <img
                src={
                  currentuser.img ||
                  "https://www.vippng.com/png/detail/355-3554387_create-digital-profile-icon-blue-profile-icon-png.png"
                }
                alt=""
              />
              <span>{currentuser.username}</span>
              {open && (
                <div className="options">
                  {currentuser?.isSeller && (
                    <>
                      <Link to="/gigs" className="link">
                        Gigs
                      </Link>
                      <Link to="/add" className="link">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link to="/orders" className="link">
                    Orders
                  </Link>
                  <Link to="/messages" className="link">
                    Messages
                  </Link>
                  <Link to="" onClick={handleLogout} className="link">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              
              Graphics and Design
            </Link>
            <Link className="link " to="/">
              {" "}
              Video & Animation
            </Link>{" "}
            <Link className="link " to="/">
              {" "}
              Writing & Translation
            </Link>
            <Link className="link " to="/">
              {" "}
              AI Services
            </Link>
            <Link className="link " to="/">
              {" "}
              Digital Marketing
            </Link>
            <Link className="link " to="/">
              {" "}
              Music & Audio
            </Link>
            <Link className="link " to="/">
              {" "}
              Programing & Tech
            </Link>
            <Link className="link " to="/">
              {" "}
              Business
            </Link>
            <Link className="link " to="/">
              {" "}
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
