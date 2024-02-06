import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInForm.module.css";
import btnStyles from "../../styles/Button.module.css";
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

function SignInForm() {
  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className="text-center">
          <h1 className="text-center">sign in</h1>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button className={btnStyles.ConfirmButton}variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
        <Container className="mt-4 text-center">
          <Link to="/signin">
            Don't have an account? {" "}
            <span className={styles.SignInSpan} data-val="Sign up">
              Sign up now!
            </span>
          </Link>
        </Container>
      </Col>
      <Col className="my-auto d-none d-md-block" md={6}>
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
}

export default SignInForm;