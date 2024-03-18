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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { parse, format } from "date-fns";

function CollectionEditForm() {
  // Access the current user from the context
  const currentUser = useContext(CurrentUserContext);
  // JSX to display the current user's username
  const userTest = <>{currentUser?.username}</>;

  // State to manage the form data for collection
  const [collectionData, setCollectionData] = useState({
    title: "",
    due_date: "",
    created_at: "",
    description: "",
    tasks: [],
  });

  const { title, due_date, description, tasks } = collectionData;

  // State to store tasks data
  const [tasksData, setTasksData] = useState({ results: [] });

  // Extracting 'id' from route parameters
  const { id } = useParams();

  // State to manage form submission errors
  const [errors, setErrors] = useState({});

  // Access the navigation function from 'react-router-dom'
  const navigate = useNavigate();

  // Fetch collection details and associated tasks on component mount
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Fetch collection details
        const { data } = await axiosReq.get(`/task_collections/${id}`);
        const { title, due_date, created_at, description, tasks } = data;

        // Parse and format the due date for proper display in the form
        const parsedDate = parse(due_date, "dd MMM yyyy", new Date());
        const formattedDueDate = format(parsedDate, "yyyy-MM-dd");

        // Update the form data state with fetched details
        setCollectionData({
          title,
          due_date: formattedDueDate,
          created_at,
          description,
          tasks,
        });
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    // Fetch all tasks for populating the tasks dropdown
    const fetchTasks = async () => {
      try {
        let allTasks = [];
        let nextPage =
          "https://focus-nest-api-a8aee1208ee3.herokuapp.com/tasks/";

        while (nextPage) {
          const { data } = await axiosReq.get(nextPage);
          const { results, next } = data;

          allTasks = allTasks.concat(results);
          nextPage = next;
        }
        setTasksData({ results: allTasks });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    // Execute both functions on component mount
    handleMount();
    fetchTasks();
  }, [id]);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value, type } = event.target;

    setCollectionData((prevData) => ({
      ...prevData,
      [name]:
        type === "select-multiple"
          ? Array.from(event.target.selectedOptions, (option) => option.value)
          : value,
    }));
  };

  // Handle cancellation by navigating back to the collections page
  const handleCancel = () => {
    navigate("/collections");
  };

  // Handle form submission
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
      // Submit form data to update the existing collection
      const { data } = await axiosReq.put(`task_collections/${id}`, formData);
      navigate(`/collections/${data.id}`);
    } catch (err) {
      // Check for non-401 errors and set errors state accordingly
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
        {/* Display the current user's username */}
        {currentUser ? userTest : ""}
        <Row className="justify-content-center">
          <Col>
            {/* Title */}
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
                {/* Map tasks data to options in the select dropdown */}
                {tasksData.results.map((tasksData) => (
                  <option key={tasksData.id} value={tasksData.id}>
                    {tasksData.task_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {/* Display tasks-related errors */}
            {errors?.tasks?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

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
            {/* Display description-related errors */}
            {errors?.description?.map((message, idx) => (
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
              variant="primary"
              className={`${btnStyles.ConfirmButton}`}
              type="submit"
            >
              Save Collection
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default CollectionEditForm;
