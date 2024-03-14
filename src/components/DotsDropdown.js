import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/DotsDropdown.module.css";


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

export const DotsDropdown = ({ handleEdit, handleDelete }) => {
  // Dropdown toggle using the custom DotsToggle component
  return (
    <Dropdown className={`ms-1 ${styles.DropdownMain}`} drop="start">
      <Dropdown.Toggle as={DotsToggle}></Dropdown.Toggle>

      <Dropdown.Menu className={`text-center ${styles.DropdownMenu}`}>
        {/* Dropdown Items for handling edit and delete */}
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          {/* Edit Icon */}
          <i className="fas fa-pencil-alt" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          {/* Delete Icon */}
          <i className="fa-solid fa-circle-xmark" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
