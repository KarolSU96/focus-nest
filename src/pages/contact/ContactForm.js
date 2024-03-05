import React, { useState } from "react";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import styles from "../../styles/SignInForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import axios from "axios";


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { name, email, subject, message } = formData;

  const [errors, setErrors] = useState();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel= () => {
    navigate("/")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    try {
      const { data } = await axios.post("contact_forms/", formData);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto mx-auto py-2 p-md-2" md={6}>
        <Container className="text-center">
          <h1 className="text-center">contact form </h1>
          <Form onSubmit={() => {}}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.name?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject of your inquiry"
                name="subject"
                value={subject}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.subject?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.email?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter your message"
                name="message"
                value={message}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.message?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              variant="primary"
              className={`me-2 ${btnStyles.CancelButton}`}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              className={btnStyles.ConfirmButton}
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Send
            </Button>
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
};

export default ContactForm;
