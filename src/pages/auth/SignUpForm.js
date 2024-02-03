import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/SignUpForm.module.css";
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={styles.Container}>
          <h1 className="text-center">sign up</h1>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="username" name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password1"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password2"/>
            </Form.Group>
            <Button className={styles.FormButton} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
        <Container>
          <Link to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col className="my-auto" md={6}>
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
