import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import styles from "../../styles/Task.module.css";
import customStyles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePage = () => {

  // State variables
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [collections, setCollections] = useState({ results: [] });
  const [tasks, setTasks] = useState({ results: [] });

  // JSX element for displaying user's profile name
  const userProfileName = <>{currentUser?.username}</>;

  // Function to handle navigation to profile editing page
  const handleEdit = () => {
    navigate(`/profiles/${id}/edit`);
  };

   // useEffect for fetching profile data, tasks, and collections on component mount
  useEffect(() => {
    // Function to fetch user profile data
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        setProfile(data);
        console.log("Profile data:", data);
      } catch (err) {
        console.log(err);
      }
    };

    // Function to fetch user's task collections
    const fetchCollections = async () => {
      try {
        const { data } = await axiosReq.get("/task_collections/");
        setCollections(data);
        console.log("Collections response:", data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    // Function to fetch user's tasks
    const fetchTasks = async () => {
      try {
        let allTasks = [];
        let nextPage = "/tasks/";
        while (nextPage) {
          const { data } = await axiosReq.get(nextPage);
          allTasks = allTasks.concat(data.results);
          nextPage = data.next;
        }
        setTasks({ results: allTasks, count: allTasks.length });
      } catch (err) {
        console.log(err);
      }
    };

    // Execute all the fetch functions
    fetchProfile();
    fetchTasks();
    fetchCollections();
    setHasLoaded(true);
  }, [id]);


  // Calculate the number of completed tasks
  const completedTasksCount = Array.isArray(tasks.results) ? tasks.results.filter((task) => task.is_done).length : 0;

    // JSX element for displaying user's profile
    const userProfile = (
      <Col>
        {/* Display user's profile image */}
        <Row className="text-center">
          <Col>
            <Image
              className={customStyles.ProfileImage}
              roundedCircle
              src={profile.image}
            ></Image>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            {/* Display user's name and profile summary */}
            <h4>{userProfileName}'s Profile</h4>
            <p>
              <span className="mx-1">Total tasks: {tasks.count}</span>
              <span className="mx-1">
                Total collections: {collections.count}
              </span>
              <span className="mx-1">Finished tasks: {completedTasksCount} </span>
            </p>
          </Col>
        </Row>
        <Row className="text-center" >
          <Col>
          <h5>
            Current goals:
          </h5>
          {/* Display user's current goals or a message if not available */}
          <div>{profile.current_goals ? profile.current_goals : "Please add your goals"}</div>
          </Col>
        </Row>
        <Row className="text-center mb-2">
          <Col>
            {/* Button to navigate to the profile editing page */}
            <Button
              variant="primary"
              className={`ms-1 mt-2 ${btnStyles.ConfirmButton}`}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          </Col>
        </Row>
      </Col>
    );
  return (
    <Row className="justify-content-center">
      <Col className="col-md-8 col-lg-8 mt-3">
        <Container className={styles.TaskCard}>
          {/* Display the user's profile or a spinner while loading */}
          {hasLoaded ? userProfile : <Spinner />}
        </Container>
      </Col>
    </Row>
  );
};

export default ProfilePage;
