import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar expand="md" className={styles.NavBar} fixed="top">
      <Container>
        <NavLink to="/">
        <Navbar.Brand ><span className={styles.brand}>FocusNest</span></Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink  exact className={styles.NavLink} activeClassName={styles.Active} to="/">
              <i className="fa-solid fa-house"></i>Home
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
              <i className="fa-solid fa-door-open"></i>Sign In
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
              <i className="fa-solid fa-user-plus"></i>Sign Up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
