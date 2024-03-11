import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Image,
  Alert,
} from "react-bootstrap";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
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

  // State to store profile data
  const { current_goals, image } = profileData;

  // State to manage form submission errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch user's profile data when the component mounts
    const handleMount = async () => {
      // Check if the user is authorized to edit the profile
      if (currentUser?.profile_id?.toString() === id) {
        console.log(id);
        try {
          const { data } = await axiosReq.get(`/profiles/${id}`);
          const { current_goals, image } = data;
          setProfileData({ current_goals, image });
          console.log(data);
        } catch (err) {
          console.log(err);
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    handleMount();
  }, [currentUser, navigate, id]);

  // Handle changes in the input fields
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("current_goals", current_goals);
    // Append the new image if provided
    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      // Send a PUT request to update the user's profile
      const { data } = await axiosReq.put(`/profiles/${id}`, formData);
      // Update the current user context with the new profile image
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));

      // Redirect to the user's profile page
      navigate(`/profiles/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate(`/profiles/${id}`);
  };

  // Handle changes in the selected file for the profile image
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
            {/* Form Group for Current Goals */}
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
            {errors?.current_goals?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Form Group for Profile Image */}
            <Form.Group className="mb-3" controlId="profileImage">
              {image && (
                <figure>
                  <Image src={image} fluid />
                </figure>
              )}
              <Form.Label htmlFor="image-upload">
                Change Profile Image
              </Form.Label>
              {/* Input for selecting a new image */}
              <Form.Control
                id="image-upload"
                type="file"
                accept="image/*"
                ref={imageFile}
                onChange={handleFileChange}
              />
            </Form.Group>
            {/* Display title-related errors */}
            {errors?.image?.map((message, idx) => (
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

            {/* Save Button */}
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
