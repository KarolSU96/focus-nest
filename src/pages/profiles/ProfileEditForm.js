import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/TaskCreateForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

const ProfileEditForm = () => {
  const currentUser = useContext(CurrentUserContext);
  const { id } = useParams();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    current_goals: "",
    image: "",
  });

  const { current_goals, image } = profileData;

  

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
        const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
        setCurrentUser((currentUser) => ({
          ...currentUser,
          profile_image: data.image,
        }));
    }catch(err){
        console.log(err)
    }
  };

  const handleCancel = () => {
    navigate("/");
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
              <Form.Label>Change Profile Image</Form.Label>
              <Form.File
                
              />
              <Form.Control type="file" accept="image/*" ref={imageFile} />
            </Form.Group>

            {/* {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Profile Preview"
                className="img-fluid rounded-circle mb-3"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )} */}

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
