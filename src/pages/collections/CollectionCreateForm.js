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
import { axiosReq , axiosRes} from "../../api/axiosDefaults";
import axios from "axios";

function CollectionCreateForm() {
  const currentUser = useContext(CurrentUserContext);
  const userTest = <>{currentUser?.username}</>;

  const [collectionData, setCollectionData] = useState({
    title: "",
    due_date: "",
    created_at: "",
    description: "",
    tasks: [],
  });

  const { title, due_date, description, tasks } =
    collectionData;

  const [collections, setCollections] = useState({ results: [] });
  const [tasksData, setTasksData] = useState({ results: [] });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data }  = await axiosReq.get("/task_collections/");
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    const fetchTasks = async () => {
        try {
          const { data }  = await axiosReq.get('/tasks/');
          setTasksData(data);
          console.log('Tasks response:', data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
      
    fetchCollections();
    fetchTasks();
  }, []);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
  
    setCollectionData((prevData) => ({
      ...prevData,
      [name]: type === "select-multiple" ? Array.from(event.target.selectedOptions, (option) => option.value) : value,
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("due_date", due_date);
    formData.append("description", description);
      tasks.forEach((taskId) => {
        formData.append("tasks", taskId);
      });

    try {
      const { data } = await axiosReq.post("task_collections/", formData);
      navigate(`/task_collections/${data.id}`);
    } catch (err) {
      console.log(err);
      console.log(err.response);
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
        {currentUser ? userTest : ""}
        <Row className="justify-content-center">
          <Col>
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
            {errors?.due_date?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

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
            {errors?.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              variant="primary"
              className={`me-2 ${btnStyles.CancelButton}`}
            >
              Cancel
            </Button>

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
