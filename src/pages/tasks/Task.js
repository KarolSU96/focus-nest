import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, CardBody, CardTitle } from "react-bootstrap";
import styles from "../../styles/Task.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { DotsDropdown } from "../../components/DotsDropdown";
import { useLocation, useNavigate } from "react-router-dom";

const Task = (props) => {
  // Destructure props
  const {
    id,
    owner,
    created_at,
    task_name,
    priority,
    is_done,
    due_date,
    notes,
    showDots,
    task_collection,
  } = props;

  // Use useLocation hook to get the current location
  const location = useLocation();
  // Get current user from context
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/tasks/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}`);
      if (location.pathname !== "/") {
        // Navigate to the root path
        navigate("/");
      } else {
        // Refresh the window
        window.location.reload();
      }
    } catch (err) {}
  };

  // Update task state when component mounts
  useEffect(() => {
    setTask((prevTask) => ({
      ...prevTask,
      id,
      owner,
      created_at,
      task_name,
      priority,
      is_done,
      due_date,
      notes,
      task_collection,
    }));

    // eslint-disable-next-line
  }, []);

  // Initialize task state with default values
  const [task, setTask] = useState({
    id,
    owner,
    created_at,
    task_name,
    priority,
    is_done,
    due_date,
    notes,
    task_collection,
  });

  // Handle marking task as done
  const handleDone = async () => {
    try {
      // Make a PUT request to update the task status
      await axiosRes.put(`tasks/${id}`, {
        is_done: !task.is_done,
        task_name: task.task_name,
        priority: task.priority,
      });
      // Update the local state with the updated task data
      setTask((prevTask) => ({
        ...prevTask,
        is_done: !prevTask.is_done,
      }));
    } catch (err) {}
  };

  return (
    // Task card
    <Card className={`${styles.TaskCard}`}>
      <CardBody>
        {/* Task title and priority */}
        <CardTitle className="d-flex justify-content-between">
          <span>{task_name}</span>
          <div className="d-flex align-items-center">
            <span>
              Priority:
              {priority === "low" ? "🔵Low" : ""}
              {priority === "medium" ? "🟡Medium" : ""}
              {priority === "high" ? "🔴High" : ""}
            </span>
            {/* Display dots dropdown menu for authorized user */}
            {is_owner && showDots && (
              <DotsDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </CardTitle>
        {/* Task details */}
        <div className="d-flex justify-content-center text-center">
          {/* Task creation date */}
          <span className={styles.TaskSpan}>Created at: {created_at}</span>
          {/* Checkbox to mark task as done */}
          <span className={styles.TaskSpan}>
            Mark as Done:{" "}
            {is_owner && (
              <label className={styles.TaskCheckboxLabel}>
                <input
                  type="checkbox"
                  checked={task.is_done}
                  onChange={handleDone}
                />
              </label>
            )}
          </span>
          {/* Task due date */}
          <span className={styles.TaskSpan}>Due Date: {due_date}</span>
        </div>
        <hr></hr>
        {/* Task notes */}
        <div className="d-flex justify-content-center">
          <h5 className="mb-auto">Notes:</h5>
        </div>
        <div
          className={`${styles.NotesContainer}d-flex justify-content-center pt-0`}
        >
          {notes}
        </div>
      </CardBody>
    </Card>
  );
};

export default Task;
