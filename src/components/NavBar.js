import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import avatarStyles from "../styles/Avatar.module.css";

// function applies active class name while the the navlink is active
const classNameFuncLink = ({ isActive }) => `${styles.NavLinksNotAvatar} ${isActive ? styles.Active : ''}`;


const NavBar = () => {
  const currentUser = useCurrentUser();
  console.log("currentUser:", currentUser);

  const addTaskIcon = (
    <NavLink className={classNameFuncLink} to="/tasks/create">
      <i className="fa-solid fa-plus"></i>Add Task
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        className={classNameFuncLink}
        to="/collections"
      >
        <i className="fa-solid fa-box"></i>Collections
      </NavLink>
      <NavLink
          className={classNameFuncLink}
          to="/contact"
        >
          <i className="fa-solid fa-envelope"></i>Contact Us
        </NavLink>
      <NavLink
        className={classNameFuncLink}
        to="/signout"
      >
        <i className="fa-solid fa-door-open" to="/"onClick={()=>{}}></i>Sign Out
      </NavLink>
      <NavLink
        className={classNameFuncAvatar}

        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar className={avatarStyles.AvatarActive} src={currentUser?.profile_image} text="Profile" height={30}/>
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={classNameFuncLink}
        to="/signin"
      >
        <i className="fa-solid fa-door-open"></i>Sign In
      </NavLink>
      <NavLink
        className={classNameFuncLink}
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
              className={styles.NavLinkWithAvatar}
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
