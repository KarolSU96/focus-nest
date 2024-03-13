import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/TaskCreateForm.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function TaskCreateForm() {
  // Accessing current user context
  const currentUser = useContext(CurrentUserContext);
  // Rendering username if available
  const userTest = <>{currentUser?.username}</>;

  // State to hold task data
  const [taskData, setTaskData] = useState({
    task_name: "",
    priority: "low",
    due_date: "",
    notes: "",
    task_collection: "",
  });

  const { task_name, priority, due_date, notes, task_collection } = taskData;

  // State to hold collections data
  const [collections, setCollections] = useState({ results: [] });

  // State to hold form submission errors
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch collections data on component mount
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get("/task_collections/");
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);

  // Function for handling input changes
  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new instance of FormData to store form data
    const formData = new FormData();

    // Append form data to FormData object
    formData.append("task_name", task_name);
    formData.append("priority", priority);
    formData.append("due_date", due_date);
    formData.append("notes", notes);
    formData.append("task_collection", task_collection);

    try {
      // Send a POST request to the API to create a new task with form data
      const { data } = await axios.post("/tasks/", formData);
      // If task creation is successful, navigate to the newly created task's page
      navigate(`/tasks/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className={`${styles.TaskForm} p-4 mt-5 w-75 mx-auto`}
    >
      <Container className="text-center">
        <h2>Add a Task</h2>
        {/* Displaying current user's username */}
        {currentUser ? userTest : ""}
        <Row className="justify-content-center">
          <Col>
            {/* Task Name input */}
            <Form.Group className="mb-3" controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <FormControl
                className="text-center"
                type="text"
                placeholder="Enter task name"
                name="task_name"
                value={task_name}
                required
                onChange={handleChange}
              />
            </Form.Group>
            {/* Displaying task name errors */}
            {errors?.task_name?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Priority selection */}
            <Form.Group className="mb-3" controlId="taskPriority">
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
            {/* Displaying priority errors */}
            {errors?.priority?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Due Date input */}
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
            {/* Displaying due date errors */}
            {errors?.due_date?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Task Collection selection */}
            <Form.Group className="mb-3" controlId="taskCollection">
              <Form.Label>Collection</Form.Label>
              <Form.Control
                className="text-center"
                as="select"
                name="task_collection"
                value={task_collection}
                onChange={handleChange}
              >
                <option value="" disabled>
                  {" "}
                  Select a collection
                </option>
                {/* Displaying available collections */}
                {collections.results.length === 0 && (
                  <option value="" disabled>
                    No collections available
                  </option>
                )}
                {collections.results.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {/* Displaying task collection errors */}
            {errors?.task_collection?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Notes input */}
            <Form.Group className="mb-3" controlId="taskNotes">
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
            {/* Displaying notes errors */}
            {errors?.notes?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Cancel Button */}
            <Button
              variant="primary"
              className={`me-2 ${btnStyles.CancelButton}`}
            >
              Cancel
            </Button>

            {/* Submit Button */}
            <Button
              variant="primary"
              className={`${btnStyles.ConfirmButton}`}
              type="submit"
            >
              Create Task
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default TaskCreateForm;
