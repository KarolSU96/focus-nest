import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user)
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto mx-auto py-2 p-md-2" md={6}>
        <Container className="text-center">
          <h1 className="text-center">sign in</h1>
          <Form onSubmit={handleSubmit}>
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
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
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
            {errors.password?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Button
              className={btnStyles.ConfirmButton}
              variant="primary"
              type="submit"
            >
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, idx) =>(
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
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
