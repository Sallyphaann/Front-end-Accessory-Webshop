import styles from '../css/Navbar.module.css';
import { Link, useNavigate, NavLink } from "react-router-dom";
import TokenManager from "../apis/TokenManager";
import React, { useEffect, useState } from 'react';

import logo from '../image/logo.png'

function Navibar({testClaims,userInfo}) {
   const auth = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
   const [claims, setClaims] = useState(TokenManager.getClaims()); 
  const user = TokenManager.getUser();
  const handleLogout = () => {
    TokenManager.clear();
    navigate('/Login');
    sessionStorage.removeItem("user");
  };

  const links = [
    {
      id: 1,
      path: "/",
      text: "Home"
    },
    {
      id: 2,
      path: "/products",
      text: "Product"
    },
    {
      id: 3,
      path: "/chat",
      text: "Chat"
    },
    {
      id: 4,
      path: "/Cart",
      text: "Cart"
    },
    
  ];
   useEffect(() => {
    if (auth) {
      const claims = TokenManager.getClaims();
      setClaims(claims);
    }
  }, [auth]); 
 
  return (
  <div className={styles.header}>
  <div className={styles.logo}>
    <img src={logo} alt="Logo" />
  </div>
  {links.map(link => (
    <div className={styles.Container} key={link.id}>
      <NavLink to={link.path} className={styles.link}>{link.text}</NavLink>
    </div>
  ))}
  <div>
    {auth ? (
      <div>
        {claims?.roles?.includes('ADMIN') ? (
          <>
          <div className={styles.Container}>
              <NavLink className={styles.link} to="/Static">
               Static
              </NavLink>
            </div>
          
            <div className={styles.Container}>
              <NavLink className={styles.link} to="/ProductManagement">
                Product Management
              </NavLink>
            </div>
            <div className={styles.headerright}>
              <NavLink className={styles.link} onClick={handleLogout} to="/">
                Logout
              </NavLink>
            </div>
            <div className={styles.headerright}>
                    <NavLink className={styles.linkright}>Welcome {claims?.sub}</NavLink>
            </div>
          </>
        ) : (
          <><><><div className={styles.headerright}>
                  <NavLink className={styles.link} onClick={handleLogout} to="/">
                    Logout
                  </NavLink>
                </div>

                  <div className={styles.headerright}>
                    <NavLink className={styles.link} to="/Profile">
                      Profile
                    </NavLink>
                  </div></><div className={styles.headerright}>
                    <NavLink className={styles.linkright}>Welcome {claims?.sub}</NavLink>
                  </div></><div className={styles.headerright}>
                    <NavLink className={styles.link} to="/History">
                      Order
                    </NavLink>
                  </div></>
        )}
      </div>
    ) : (
      <><div className={styles.headerright}>
              <Link className={styles.link} to="/Login">Login</Link>
            </div>
            <div className={styles.headerright}>
                <Link className={styles.link} to="/Register">Register</Link>
              </div></>
    )}
  </div>
</div>
    
  )
}

export default Navibar;
