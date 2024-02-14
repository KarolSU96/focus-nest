import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import LoadingSpinner from '../../components/LoadingSpinner';

function HomeTasksPage() {
  const currentUser = useCurrentUser();
  
  const loggedOutContent = (
    <div className="container">
    <h1>Please log in or register ot use the page</h1>
    </div>
  );

  
  return (
    <>
      { currentUser ? (
      <Row>
          <Col>
          <p>Test mobile</p>
          <p>Test tasks</p>
          <Container><LoadingSpinner/></Container>
          </Col>
      </Row>
      ): loggedOutContent}
    </>
  )
}

export default HomeTasksPage