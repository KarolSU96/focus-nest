import React, { useState } from 'react'
import { Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/TaskCreateForm.module.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskCreateForm() {
    const [taskData, setTaskData] = useState({
      taskName: "",
      taskPriority: "",
      taskDueDate: "",
      isDone: false,
      taskNotes: "",
      taskCollections:"",
    });

    const {taskName, taskPriority, taskDueDate, isDone, taskNotes} = taskData;

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();



    const handleChange = (event) => {
      setTaskData({
        ...taskData,
        [event.target.name]: event.target.value,
      });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();

      formData.append("taskName", taskName);
      formData.append("taskPriority", taskPriority);
      formData.append("taskDueDate", taskDueDate);
      formData.append("isDone", isDone);
      formData.append("taskNotes", taskNotes);
      formData.append("taskCollections", taskCollections);

      try {
        const {data} = await axios.post("/tasks/", formData);
        history.pushState(`/tasks/${data.id}`);
      } catch (err){
        console.log(err);
        if (err.response?.status !==401) {
          setErrors(err.response?.data);
        }
      }
    };

  return (
    
      <Form className={`${styles.TaskForm} p-4 mt-5 w-75 mx-auto`}>
        <Container className="text-center" >
          <h2>Add a Task</h2>
          <Row className="justify-content-center">
            <Col >
        <Form.Group className="mb-3" controlId="taskName">
          <Form.Label>Task Name</Form.Label>
          <FormControl className="text-center"
          type="text"
          placeholder="Enter task name"
          name="taskName"
          value={taskName}
          required
          onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3"controlId="taskPriority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
          className="text-center"
          as="select"
          name="taskPriority"
          value={taskPriority}
          required
          onChange={handleChange}
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
          value={taskDueDate}
          onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Collection</Form.Label>
          <Form.Control
          className="text-center"
          type="text"
          placeholder="Enter task collection"
          onChange={handleChange}
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
          value={taskNotes}
          onChange={handleChange}
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