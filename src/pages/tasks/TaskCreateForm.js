import React, { useContext, useEffect, useState } from 'react'
import { Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/TaskCreateForm.module.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function TaskCreateForm() {
  const currentUser = useContext(CurrentUserContext)
  const userTest = <>{currentUser?.username}</>


    const [taskData, setTaskData] = useState({
      taskName: "",
      taskPriority: "",
      taskDueDate: "",
      isDone: false,
      taskNotes: "",
      taskCollection:"",
    });

    const {taskName, taskPriority, taskDueDate, isDone, taskNotes, taskCollection} = taskData;
    const [collections, setCollections] = useState({results:[]});
    const [selectedCollection, setSelectedCollection] = useState('');

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

    formData.append("taskName", taskName);
    formData.append("taskPriority", taskPriority);
    formData.append("taskDueDate", taskDueDate);
    formData.append("isDone", isDone);
    formData.append("taskNotes", taskNotes);
    formData.append("taskCollection", taskCollection);

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
        <Form.Group className="mb-3" controlId="taskDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
          className="text-center"
          type="date"
          name="taskDueDate"
          value={taskDueDate}
          onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="taskCollection">
          <Form.Label>Collection</Form.Label>
          <Form.Control
          className="text-center"
          as="select"
          name="taskCollection"
          value={taskCollection}
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