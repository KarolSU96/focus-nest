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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { parse, format } from "date-fns";

function TaskCreateForm() {
  // Retrieve current user data from CurrentUserContext
  const currentUser = useContext(CurrentUserContext);
  // Define JSX element to display current username
  const userTest = <>{currentUser?.username}</>;

  // Define state variable 'taskData' using useState hook, initialized with empty task data
  const [taskData, setTaskData] = useState({
    task_name: "",
    priority: "low",
    due_date: "",
    notes: "",
    task_collection: "",
  });

  // Destructure properties from 'taskData' state
  const { task_name, priority, due_date, notes, task_collection } = taskData;

   // Define state variable 'collections' to store task collections, initialized with empty array
  const [collections, setCollections] = useState({ results: [] });

   // Define state variable 'errors' to handle form validation errors
  const [errors, setErrors] = useState({});
  // Hook to navigate between routes
  const navigate = useNavigate();
  // Retrieve 'id' parameter from URL
  const { id } = useParams();

  useEffect(() => {
    // Function to fetch task collections from API
    const fetchCollections = async () => {
      try {
        const response = await axios.get("/task_collections/");
        setCollections(response.data);
      } catch (error) {}
    };

    const handleMount = async () => {
      try {
        // Fetch task data from API
        const { data } = await axiosReq.get(`/tasks/${id}`);
        const {
          task_name,
          priority,
          due_date,
          is_done,
          notes,
          task_collection,
        } = data;

        // Parse the original date string and format it to "yyyy-MM-dd"
        const parsedDate = parse(due_date, "dd MMM yyyy", new Date());
        const formattedDueDate = format(parsedDate, "yyyy-MM-dd");
        setTaskData({
          task_name,
          priority,
          due_date: formattedDueDate,
          is_done,
          notes,
          task_collection,
        });
      } catch (error) {
      }
    };

    fetchCollections();
    handleMount();
  }, [id]);

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to navigate back to task list page 
  const handleCancel = () => {
    navigate("/");
  };
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append form data to FormData object
    formData.append("task_name", task_name);
    formData.append("priority", priority);
    formData.append("due_date", due_date);
    formData.append("notes", notes);
    formData.append("task_collection", task_collection);

    try {
      // Make PUT request to update task data
      await axiosReq.put(`/tasks/${id}`, formData);
      navigate(`/tasks/${id}`);
    } catch (err) {
      // Handle errors if request fails
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
        <h2>Edit Task</h2>
        {/* Display current username if available */}
        {currentUser ? userTest : ""}
        <Row className="justify-content-center">
          <Col>
             {/* Form input fields */}
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
            {/* Display validation errors for task name */}
            {errors?.task_name?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Priority dropdown */}
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
            {/* Display validation errors for priority */}
            {errors?.priority?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Due date input field */}
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
            {/* Display validation errors for due date */}
            {errors?.due_date?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Task collection dropdown */}
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
            {/* Display validation errors for task collection */}
            {errors?.task_collection?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Notes input field */}
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
            {/* Display validation errors for notes */}
            {errors?.notes?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Cancel button */}
            <Button
              variant="primary"
              className={`me-2 ${btnStyles.CancelButton}`}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            {/* Save button */}
            <Button
              variant="primary"
              className={`${btnStyles.ConfirmButton}`}
              type="submit"
            >
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default TaskCreateForm;
