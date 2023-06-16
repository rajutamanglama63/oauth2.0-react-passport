import { useContext } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { OathContext } from "../../context/oauthContext";

const Navbar = () => {
  const authUser = useContext(OathContext);
  console.log("auth-user: ", authUser);
  return (
    <div className={styles.nav}>
      <div className={styles.nav_wrapper}>
        <h2 className={styles.logo}>
          <Link className={styles.link} to="/">
            OAuth
          </Link>
        </h2>
        <ul className={styles.nav_list}>
          <li className={styles.nav_list_item}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              alt="displayPic"
              className={styles.avatar}
            />
          </li>
          <li className={styles.nav_list_item}>Raju Lama</li>
          <li className={styles.nav_list_item}>
            <Link className={styles.link} to="/signin">
              Signin
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
