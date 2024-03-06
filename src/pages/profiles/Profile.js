import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "../../styles/Task.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Profile = () => {

  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  const [collections, setCollections] = useState({results:[]});
  const [tasks, setTasks] = useState({results:[]});
  
  const userProfileName = <>{currentUser?.username}</>

  

  useEffect(() => {

    const fetchCollections = async () => {
      try {
        const { data } = await axiosReq.get('/task_collections/');
        setCollections(data);
        console.log('Collections response:', data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    }

    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/`);
        setTasks(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
    fetchCollections();
    setHasLoaded(true);
  }, []);

  const completedTasksCount = Array.isArray(tasks.results)
  ? tasks.results.filter((task) => task.is_done).length
  : 0;

  return (
    <>
    <Row className="text-center">
        <Col> <p>Image</p></Col>
        <h4>{userProfileName}'s Profile</h4>
        <p>Total numer tasks: {tasks.results.length}</p>
        <p>Total number of collections: {collections.results.length}</p>
        <p>Finished tasks: {completedTasksCount}</p>
        <p>Current goals:</p>

      </Row>
      
      <div><p>Test profile</p></div>
    </>
  )
}

export default Profile