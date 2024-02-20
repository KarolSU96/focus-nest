import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/DotsDropdown.module.css";
import { DropdownMenu } from "react-bootstrap";
import btnStyles from "../styles/Button.module.css";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const DotsToggle = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-ellipsis"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  ></i>
));

export const DotsDropdown = () => {
  return (
    <Dropdown className={`ml-auto`} drop="start">
      <Dropdown.Toggle as={DotsToggle}></Dropdown.Toggle>

      <Dropdown.Menu className={`text-center ${styles.DropdownMenu}`}>
        <Dropdown.Item
          className={styles.DropdownItem}
          onclick={() => {}}
          aria-label="edit"
        >
            <i class="fas fa-pencil-alt"/>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onclick={() => {}}
          aria-label="delete"
        >
          <i className="fa-solid fa-circle-xmark"/>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
