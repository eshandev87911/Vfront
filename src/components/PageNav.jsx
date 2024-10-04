import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth } from "../contexts/AuthContext";
import { Context } from "../contexts/Context";
import { useContext } from "react";

function PageNav() {
  const { token, currUser } = useAuth();
  const {setShow} = useContext(Context);
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          {currUser ? (currUser.isSub? <NavLink to="/fav">Fav ToDo</NavLink> : 
          <NavLink onClick={()=>{
            setShow(true)
          }}>Fav ToDo</NavLink>) :
          <NavLink to="/fav">Fav ToDo</NavLink>}
        </li>
        <li>
          {token ? (
            <NavLink
              to="/logout"
              className={styles.ctaLink}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
