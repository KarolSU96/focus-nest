import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, CardBody, CardTitle } from "react-bootstrap";
import styles from "../../styles/Task.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { DotsDropdown } from "../../components/DotsDropdown";
import { useLocation, useNavigate } from "react-router-dom";

const Collection = (props) => {
  // Destructure props
  const {
    id,
    owner,
    title,
    created_at,
    due_date,
    description,
    tasks = [],
    showDots,
  } = props;

  // Get current user from context
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/collections/${id}/edit`);
  };

  //  Function to handle clicking on a collection
   const handleClick = () => {
    navigate(`/collections/${id}`);
  };

  // Get current location
  const location = useLocation();

  const handleDelete = async () => {
    try {
      // Delete the collection using the API
      await axiosRes.delete(`/task_collections/${id}`);

      // Check the current path and navigate accordingly
      if (location.pathname !== "/") {
        // Navigate to the root path
        navigate("/");
      } else {
        // Refresh the window
        window.location.reload();
      }
    } catch (err) {
      console.log(err)
    }
  };
  // Initialize collection state with default values
  // eslint-disable-next-line
  const [_collection, setCollection] = useState({
    id,
    owner,
    title,
    created_at,
    due_date,
    description,
    tasks,
  });

  // Update collection state when component mounts
  useEffect(() => {
    setCollection((prevCollection) => ({
      ...prevCollection,
      id,
      owner,
      title,
      created_at,
      due_date,
      description,
      tasks,
    }));
  // eslint-disable-next-line 
  }, []);

  

  return (
    <Card className={`${styles.TaskCard}`}>
      <CardBody>
        <CardTitle className="d-flex justify-content-between">
          <span onClick={handleClick}>{title}</span>
          <div className="d-flex align-items-center">
            {/* Render DotsDropdown if the user is the owner and showDots is true */}
            {is_owner && showDots && (
              <DotsDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </CardTitle>
        <div className="d-flex justify-content-center text-center">
          <span className={styles.TaskSpan}>Created at: {created_at}</span>
          <span className={styles.TaskSpan}>Task Count: {tasks.length}</span>
          <span className={styles.TaskSpan}>Due Date: {due_date}</span>
        </div>
        <hr></hr>
        <div className="d-flex justify-content-center">
          <h5 className="mb-auto">Description:</h5>
        </div>
        <div
          className={`${styles.NotesContainer}d-flex justify-content-center pt-0`}
        >
          {description}
        </div>
      </CardBody>
    </Card>
  );
};
export default Collection;
