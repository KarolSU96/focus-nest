import React, { useState } from "react";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import styles from "../../styles/SignInForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import axios from "axios";

const ContactForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // Destructure form data properties
  const { name, email, subject, message } = formData;

  // State to manage form submission errors
  const [errors, setErrors] = useState({});

  // Access the navigation function from 'react-router-dom'
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle cancellation by navigating back to the home page
  const handleCancel = () => {
    navigate("/");
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append form data for submission
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    try {
      // Submit form data to the backend
      await axios.post("contact_forms/", formData);
      // Navigate to the home page after successful submission
      navigate("/");
    } catch (err) {
      // Set errors state if there is an issue with form submission
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto mx-auto py-2 p-md-2" md={6}>
        <Container className="text-center">
          <h1 className="text-center">contact form </h1>
          {/* Start of Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* Display name-related errors */}
            {errors?.name?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Subject */}
            <Form.Group className="mb-3" controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject of your inquiry"
                name="subject"
                value={subject}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* Display subject-related errors */}
            {errors?.subject?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Email Input */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* Display email-related errors */}
            {errors?.email?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Message Input */}
            <Form.Group className="mb-3" controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter your message"
                name="message"
                value={message}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* Display message-related errors */}
            {errors?.message?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Cancel Button */}
            <Button
              variant="primary"
              className={`me-2 ${btnStyles.CancelButton}`}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            {/* Submit Button */}
            <Button
              className={btnStyles.ConfirmButton}
              variant="primary"
              type="submit"
            >
              Send
            </Button>
          </Form>
        </Container>
        {/* Sign up link */}
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
