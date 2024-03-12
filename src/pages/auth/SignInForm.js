import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {
  // State for handling user authentication and error messages
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Attempt to sign in the user using the provided credentials
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      // If successful, set the current user and navigate to the home page
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      navigate("/");
    } catch (err) {
      // If there are errors, set the errors state for display in the UI
      setErrors(err.response?.data);
    }
  };

  // Function to handle input changes
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    // Main container for the sign-in form
    <Row className={styles.Row}>
      <Col className="my-auto mx-auto py-2 p-md-2" md={6}>
        <Container className="text-center">
          <h1 className="text-center">sign in</h1>
          {/* Sign-in form using React Bootstrap components */}
          <Form onSubmit={handleSubmit}>
            {/* Username input field */}
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Display username-related errors */}
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Password input field */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Display password-related errors */}
            {errors.password?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Sign-in button */}
            <Button
              className={btnStyles.ConfirmButton}
              variant="primary"
              type="submit"
            >
              Sign in
            </Button>
            {/* Display non-field errors (e.g., authentication failure) */}
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        {/* Container for the link to the sign-up page */}
        <Container className="mt-4 text-center">
          <Link to="/signin">
            Don't have an account?{" "}
            <span className={styles.SignUpSpan} data-val="Sign up">
              Sign up
            </span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
}

export default SignInForm;
