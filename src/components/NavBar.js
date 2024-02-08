import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";

const NavBar = () => {
  const currentUser = useCurrentUser();
  console.log("currentUser:", currentUser);

  const addTaskIcon = (
    <NavLink className={styles.NavLinksNotAvatar} to="/tasks/create">
      <i className="fa-solid fa-plus"></i>Add Task
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLinksNotAvatar}
        activeClassName={styles.Active}
        to="/collections"
      >
        <i className="fa-solid fa-box"></i>Collections
      </NavLink>
      <NavLink
          className={styles.NavLinksNotAvatar}
          activeClassName={styles.Active}
          to="/contact"
        >
          <i className="fa-solid fa-envelope"></i>Contact Us
        </NavLink>
      <NavLink
        className={styles.NavLinksNotAvatar}
        activeClassName={styles.Active}
        to="/signout"
      >
        <i className="fa-solid fa-door-open" to="/"onClick={()=>{}}></i>Sign Out
      </NavLink>
      <NavLink
        className={styles.NavLinkWithAvatar}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={30}/>
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLinksNotAvatar}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fa-solid fa-door-open"></i>Sign In
      </NavLink>
      <NavLink
        className={styles.NavLinksNotAvatar}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fa-solid fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar expand="md" className={styles.NavBar} fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <span className={styles.brand}>FocusNest</span>
          </Navbar.Brand>
        </NavLink>
        {currentUser && addTaskIcon}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              className={styles.NavLinksNotAvatar}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fa-solid fa-house"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
