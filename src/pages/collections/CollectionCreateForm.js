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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";

function CollectionCreateForm() {
  // Access current user information from context
  const currentUser = useContext(CurrentUserContext);

  // JSX to display current user's username or empty string if not logged in
  const userTest = <>{currentUser?.username}</>;

  // State to manage form data
  const [collectionData, setCollectionData] = useState({
    title: "",
    due_date: "",
    created_at: "",
    description: "",
    tasks: [],
  });

  // Destructure form data properties for ease of use
  const { title, due_date, description, tasks } = collectionData;

  // State collection
  // eslint-disable-next-line
  const [_collections, setCollections] = useState({ results: [] });

  // State to hold fetched tasks
  const [tasksData, setTasksData] = useState({ results: [] });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch collections from the server
    const fetchCollections = async () => {
      try {
        const { data } = await axiosReq.get("/task_collections/");
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    const fetchTasks = async () => {
      // Fetch tasks from the server
      try {
        const { data } = await axiosReq.get("/tasks/");
        setTasksData(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchCollections();
    fetchTasks();
  }, []);

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    // Update collectionData based on form input changes
    setCollectionData((prevData) => ({
      ...prevData,
      [name]:
        type === "select-multiple"
          ? Array.from(event.target.selectedOptions, (option) => option.value)
          : value,
    }));
  };

  const handleCancel = () => {
    // Navigate to the collections page on cancel
    navigate("/collections/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append form data for submission
    formData.append("title", title);
    formData.append("due_date", due_date);
    formData.append("description", description);
    tasks.forEach((taskId) => {
      formData.append("tasks", taskId);
    });

    try {
      // Submit form data to create a new collection
      const { data } = await axiosReq.post("task_collections/", formData);
      navigate(`/task_collections/${data.id}`);
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
        <h2>Add a Collection</h2>
        {/* Display current user's username or empty string if not logged in */}
        {currentUser ? userTest : ""}
        <Row className="justify-content-center">
          <Col>
            {/* Collection Title */}
            <Form.Group className="mb-3" controlId="taskName">
              <Form.Label>Collection Title</Form.Label>
              <FormControl
                className="text-center"
                type="text"
                placeholder="Enter collection title"
                name="title"
                value={title}
                required
                onChange={handleChange}
              />
            </Form.Group>
            {/* Display title-related errors */}
            {errors?.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Due Date */}
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
            {/* Display due date-related errors */}
            {errors?.due_date?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Tasks */}
            <Form.Group className="mb-3" controlId="tasks">
              <Form.Label>Tasks</Form.Label>
              <Form.Control
                className="text-center"
                as="select"
                name="tasks"
                value={tasks}
                onChange={handleChange}
                multiple
              >
                <option value="" disabled>
                  {" "}
                  Select the tasks
                </option>
                {/* Display taskData-related errors */}
                {tasksData.results.map((tasksData) => (
                  <option key={tasksData.id} value={tasksData.id}>
                    {tasksData.task_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {errors?.tasks?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Description */}
            <Form.Group className="mb-3" controlId="taskNotes">
              <Form.Label>Description</Form.Label>
              <Form.Control
                className="text-center"
                as="textarea"
                rows={4}
                placeholder="Enter description"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Display description-related errors, if any */}
            {errors?.description?.map((message, idx) => (
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

            {/* Create Collection Button */}
            <Button
              variant="primary"
              className={`${btnStyles.ConfirmButton}`}
              type="submit"
            >
              Create Collection
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default CollectionCreateForm;
