import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import styles from "../../styles/Task.module.css";
import customStyles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePage = () => {


  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [collections, setCollections] = useState({ results: [] });
  const [tasks, setTasks] = useState({ results: [] });

  const userProfileName = <>{currentUser?.username}</>;

  const handleEdit = () => {
    navigate(`/profile/${id}/edit`);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        setProfile(data);
        console.log("Profile data:", data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCollections = async () => {
      try {
        const { data } = await axiosReq.get("/task_collections/");
        setCollections(data);
        console.log("Collections response:", data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/`);
        setTasks(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
    fetchTasks();
    fetchCollections();
    setHasLoaded(true);
  }, []);



  const completedTasksCount = Array.isArray(tasks.results)
    ? tasks.results.filter((task) => task.is_done).length
    : 0;

    const userProfile = (
      <Col>
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
            <h4>{userProfileName}'s Profile</h4>
  
            <p>
              <span className="mx-1">Total tasks: {tasks.results.length}</span>
              <span className="mx-1">
                Total collections: {collections.results.length}
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
          <div>{profile.current_goals ? profile.current_goals : "Please add your goals"}</div>
          </Col>
        </Row>
        <Row className="text-center mb-2">
          <Col>
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
          {hasLoaded ? userProfile : <Spinner />}
        </Container>
      </Col>
    </Row>
  );
};

export default ProfilePage;
