import React, { useState } from 'react'
import { Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/TaskCreateForm.module.css";

function TaskCreateForm() {
    const [taskData, setTaskData] = useState({
      taskName: "",
      taskPriority: "",
      taskDueData: "",
      idDone: false,
      notes: "",
      taskCollections:"",
    })
  return (
    
      <Form className="p-4 rounded mt-5 w-75 mx-auto">
        <Container className="text-center" >
          <h2>Add a Task</h2>
          <Row className="justify-content-center">
            <Col md={7}>
        <Form.Group className="mb-3" controlId="taskName">
          <Form.Label>Task Name</Form.Label>
          <FormControl className="text-center"
          type="text"
          placeholder="Enter task name"
          name="taskName"
          required
          />
        </Form.Group>
        <Form.Group className="mb-3"controlId="taskPriority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
          className="text-center"
          as="select"
          name="taskPriority"
          required
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3"controlId="taskDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
          className="text-center"
          type="date"
          name="taskDueDate"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Collection</Form.Label>
          <Form.Control
          className="text-center"
          type="text"
          placeholder="Enter task collection"
          />
        </Form.Group>

        <Form.Group className="mb-3"controlId="taskNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
          className="text-center"
          as="textarea"
          rows={4}
          placeholder="Enter additional notes"
          name="taskNotes"
          />
        </Form.Group>
        
        <Button variant="primary" className={`me-2 ${btnStyles.CancelButton}`}>
          Cancel
        </Button>

        <Button variant="primary" className={`${btnStyles.ConfirmButton}`} type="submit">
          Create Task
        </Button>
        </Col>
        </Row>
        </Container>
      </Form>

  );
}

export default TaskCreateForm