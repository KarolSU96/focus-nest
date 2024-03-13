import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "../../styles/Task.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Profile = () => {
  // State to track whether the data has been loaded
  const [hasLoaded, setHasLoaded] = useState(false);
  // Get the current user from the context
  const currentUser = useCurrentUser();

  // State to store user collections and tasks
  const [collections, setCollections] = useState({ results: [] });
  const [tasks, setTasks] = useState({ results: [] });

  // JSX element for displaying the user's profile name
  const userProfileName = <>{currentUser?.username}</>;

  useEffect(() => {
    // Function to fetch user collections from the API
    const fetchCollections = async () => {
      try {
        const { data } = await axiosReq.get("/task_collections/");
        setCollections(data);
      } catch (error) {
      }
    };
    // Function to fetch user tasks from the API
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/`);
        setTasks(data);
      } catch (err) {
      }
    };
    // Call the fetchTasks and fetchCollections functions
    fetchTasks();
    fetchCollections();
    // Set hasLoaded to true once the data has been loaded
    setHasLoaded(true);
  }, []);
  // Count the number of completed tasks
  const completedTasksCount = Array.isArray(tasks.results)
    ? tasks.results.filter((task) => task.is_done).length
    : 0;

  return (
    <>
      {/* Display user profile information */}
      <Row className="text-center">
        <Col>
          {" "}
          <p>Image</p>
        </Col>
        <h4>{userProfileName}'s Profile</h4>
        <p>Total numer tasks: {tasks.results.length}</p>
        <p>Total number of collections: {collections.results.length}</p>
        <p>Finished tasks: {completedTasksCount}</p>
        <p>Current goals:</p>
      </Row>
    </>
  );
};

export default Profile;
