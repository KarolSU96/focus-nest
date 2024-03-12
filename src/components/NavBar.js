import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink} from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import React from "react";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

// function applies active class name while the the navlink is active
const classNameFuncLink = ({ isActive }) =>
  `${styles.NavLinksNotAvatar} ${isActive ? styles.Active : ""}`;

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  // NavLink for adding a new task
  const addTaskIcon = (
    <NavLink className={classNameFuncLink} to="/tasks/create">
      <i className="fa-solid fa-plus"></i>Add Task
    </NavLink>
  );

  // Icons for logged-in users
  const loggedInIcons = (
    <>
      <NavLink className={classNameFuncLink} to="/completed">
        <i className="fas fa-check-circle"></i>Completed
      </NavLink>
      <NavLink className={classNameFuncLink} to="/collections">
        <i className="fa-solid fa-box"></i>Collections
      </NavLink>
      <NavLink className={classNameFuncLink} to="/contact">
        <i className="fa-solid fa-envelope"></i>Contact Us
      </NavLink>
      <NavLink
        className={classNameFuncLink}
        to="/signout"
        onClick={handleSignOut}
      >
        <i className="fa-solid fa-door-open"></i>Sign Out
      </NavLink>
      <NavLink
        className={styles.NavLinkWithAvatar}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={30} />
      </NavLink>
    </>
  );

  // Icons for logged-out users
  const loggedOutIcons = (
    <>
      <NavLink className={classNameFuncLink} to="/contact">
        <i className="fa-solid fa-envelope"></i>Contact Us
      </NavLink>
      <NavLink className={classNameFuncLink} to="/signin">
        <i className="fa-solid fa-door-open"></i>Sign In
      </NavLink>
      <NavLink className={classNameFuncLink} to="/signup">
        <i className="fa-solid fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      className={styles.NavBar}
      fixed="top"
    >
      <Container className="">
        <NavLink to="/">
          <Navbar.Brand>
            <span className={styles.brand}>FocusNest</span>
          </Navbar.Brand>
        </NavLink>
        {currentUser && addTaskIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className={classNameFuncLink} to="/">
              <i className="fa-solid fa-house"></i>Home
            </NavLink>

            {/* Render icons based on user authentication status */}
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
