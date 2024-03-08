import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/TaskCreateForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";

const ProfileEditForm = () => {
  // const currentUser = useContext(CurrentUserContext);
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const imageFile = useRef();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    current_goals: "",
    image: "",
  });

  const { current_goals, image } = profileData;

  // const [errors, setErrors] = useState({});


  useEffect(() => {
    const handleMount = async () => {
      console.log(currentUser?.profile_id?.toString())
      if (currentUser?.profile_id?.toString() === id) {
        console.log(id)
        try {
          const { data } = await axiosReq.get(`/profiles/${id}`);
          const { current_goals, image } = data;
          setProfileData({ current_goals, image });
          console.log(data)
        } catch (err) {
          console.log(err);
          navigate("/");
          console.log("AAAAAAAAAAA ERROR EROOR")
        }
      } else {
        console.log("BOOOOO IF STATEMENT IS NOT WORKING!!!!AAAAAA");
      }
    };

    handleMount();
  }, [currentUser, navigate, id]);


  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("current_goals", current_goals);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className={`${styles.TaskForm} p-4 mt-5 w-75 mx-auto`}
    >
      <Container className="text-center">
        <h2>Edit Profile</h2>
        <Row className="justify-content-center">
          <Col>
            <Form.Group className="mb-3" controlId="currentGoals">
              <Form.Label>Current Goals</Form.Label>
              <FormControl
                as="textarea"
                placeholder="Enter your current goals"
                name="current_goals"
                value={current_goals}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profileImage">
            {image && (
                <figure>
                  <Image src={image} fluid />
                </figure>
              )}
              <Form.Label
              htmlFor="image-upload"
              >
                Change Profile Image</Form.Label>
              {/* <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              /> */}
              <Form.Control
              id="image-upload"
              type="file"
              accept="image/*"
              ref={imageFile}
              onChange={handleFileChange}
              />
            </Form.Group>

            

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
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default ProfileEditForm;
