import React, { useContext, useEffect, useState } from 'react'
import { Form, FormControl, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/TaskCreateForm.module.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function TaskCreateForm() {
  const currentUser = useContext(CurrentUserContext)
  const userTest = <>{currentUser?.username}</>


    const [taskData, setTaskData] = useState({
      task_name: "",
      priority: "low",
      due_date: "",
      notes: "",
      task_collection:"",
    });

    const {task_name, priority, due_date, notes, task_collection} = taskData;

    const [collections, setCollections] = useState({results:[]});

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {

      const fetchCollections = async () => {
        try {
          const response = await axios.get('/task_collections/');
          setCollections(response.data);
          console.log('Collections response:', response.data);
        } catch (error) {
          console.error('Error fetching collections:', error);
        }
      }
      fetchCollections();
    },[] )


    const handleChange = (event) => {
      setTaskData({
        ...taskData,
        [event.target.name]: event.target.value,
      });
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("task_name", task_name);
    formData.append("priority", priority);
    formData.append("due_date", due_date);
    formData.append("notes", notes);
    formData.append("task_collection", task_collection);

    try {
      const {data} = await axios.post("/tasks/", formData);
      navigate(`/tasks/${data.id}`);
    } catch (err){
      console.log(err);
      console.log(err.response)
      if (err.response?.status !==401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    
      <Form onSubmit={handleSubmit} className={`${styles.TaskForm} p-4 mt-5 w-75 mx-auto`}>
        <Container className="text-center" >
          <h2>Add a Task</h2>
          {currentUser ? userTest : ""}
          <Row className="justify-content-center">
            <Col >
        <Form.Group className="mb-3" controlId="taskName">
          <Form.Label>Task Name</Form.Label>
          <FormControl className="text-center"
          type="text"
          placeholder="Enter task name"
          name="task_name"
          value={task_name}
          required
          onChange={handleChange}
          />
        </Form.Group>
        {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        <Form.Group className="mb-3"controlId="taskPriority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
          className="text-center"
          as="select"
          name="priority"
          value={priority || "low"}
          required
          onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Form.Control>
        </Form.Group>
        {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        
        <Form.Group className="mb-3" controlId="taskDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
          className="text-center"
          type="date"
          name="due_date"
          value={due_date}
          onChange={handleChange}
          />
        </Form.Group>
        {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

        <Form.Group className="mb-3" controlId="taskCollection">
          <Form.Label>Collection</Form.Label>
          <Form.Control
          className="text-center"
          as="select"
          name="task_collection"
          value={task_collection}
          onChange={handleChange}
          >
            <option value="" disabled> Select a collection</option>
            {collections.results.length === 0 && (<option value ="" disabled>No collections available</option>)}
            {collections.results.map((collection) => (
              <option key = {collection.id} value={collection.id}>
                {collection.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

        <Form.Group className="mb-3"controlId="taskNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
          className="text-center"
          as="textarea"
          rows={4}
          placeholder="Enter additional notes"
          name="notes"
          value={notes}
          onChange={handleChange}
          />
        </Form.Group>
        {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        
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