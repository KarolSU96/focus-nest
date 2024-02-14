import React from 'react'
import Spinner from "react-bootstrap/Spinner"
import styles from "../styles/Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.CustomSpinnerColor}><Spinner animation="border"></Spinner></div>
  )
}

export default Spinner