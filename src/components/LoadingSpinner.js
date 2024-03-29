import React from 'react'
import Spinner from "react-bootstrap/Spinner"
import styles from "../styles/Spinner.module.css";

function LoadingSpinner() {
  // Container div for the loading spinner with custom styles
  return (
    <div className={`${styles.CustomSpinnerColor} d-flex justify-content-center`}><Spinner animation="border"></Spinner></div>
  )
}

export default LoadingSpinner