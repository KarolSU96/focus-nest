import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignUpForm.module.css";
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
  // State for handling user registration data and errors
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Function to handle input changes
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Attempt to register the user using the provided credentials
      await axios.post("/dj-rest-auth/registration/", signUpData);
      // Redirect to the sign-in page after successful registration
      navigate("/signin");
    } catch (err) {
      // If there are errors, set the errors state for display in the UI
      setErrors(err.response?.data);
    }
  };

  return (
    // Main container for the sign-up form
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className="text-center">
          <h1 className="text-center">sign up</h1>
          {/* Sign-up form using React Bootstrap components */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* Display username-related errors */}
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Password input field */}
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* Display password-related errors */}
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Confirm password input field */}
            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* Display confirm password-related errors */}
            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Button
              className={styles.FormButton}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Container>
        {/* Container for the link to the sign-in page */}
        <Container className="mt-4 text-center">
          <Link to="/signin">
            Already have an account?{" "}
            <span className={styles.SignInSpan} data-val="Sign in">
              Sign in
            </span>
          </Link>
        </Container>
      </Col>
      <Col className="my-auto d-none d-md-block" md={6}>
        {/* Image for the sign-up form */}
        <Image
          className={styles.Image}
          src={
            "https://images.pexels.com/photos/704767/pexels-photo-704767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="Sign Up Image"
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
