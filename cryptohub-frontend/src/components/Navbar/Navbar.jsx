import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../api/internal";
import { resetUser } from "../../store/userSlice";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignout = async () => {
    await signout();
    dispatch(resetUser());
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>⚡ CryptoHub</div>

        {/* Desktop Menu */}
        <div className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeStyle : styles.inActiveStyle
            }
            onClick={() => setMenuOpen(false)}
          >
            News
          </NavLink>
          <NavLink
            to="crypto"
            className={({ isActive }) =>
              isActive ? styles.activeStyle : styles.inActiveStyle
            }
            onClick={() => setMenuOpen(false)}
          >
            Coins
          </NavLink>
          <NavLink
            to="blogs"
            className={({ isActive }) =>
              isActive ? styles.activeStyle : styles.inActiveStyle
            }
            onClick={() => setMenuOpen(false)}
          >
            Blogs
          </NavLink>

          {isAuthenticated ? (
            <button className={styles.signOutButton} onClick={handleSignout}>
              Sign Out
            </button>
          ) : (
            <NavLink to="signup" onClick={() => setMenuOpen(false)}>
              <button className={styles.signUpButton}>Sign Up</button>
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      <div className={styles.separator}></div>
    </>
  );
}

export default Navbar;
