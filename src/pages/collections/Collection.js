import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, CardBody, CardTitle } from "react-bootstrap";
import styles from "../../styles/Task.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { DotsDropdown } from "../../components/DotsDropdown";
import { useNavigate } from "react-router-dom";

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

const handleDelete = async () => {
  try {
    await axiosRes.delete(`/task_collections/${id}`);
    if (location.pathname !== '/') {
      // Navigate to the root path
      history.push('/');
    } else {
      // Refresh the window
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

// Update collection state when props change
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
}, [id,
  owner,
  title,
  created_at,
  due_date,
  description,
  tasks,]);

// Initialize collection state with default values
const [collection, setCollection] = useState({
  id,
  owner,
  title,
  created_at,
  due_date,
  description,
  tasks,
});


return (
  <Card className={`${styles.TaskCard}`}>
    <CardBody>
      <CardTitle className="d-flex justify-content-between">
        <span>{title}</span>
        <div className="d-flex align-items-center">
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
        <span className={styles.TaskSpan}>
          Task Count: {tasks.length}
        </span>
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
export default Collection