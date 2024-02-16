import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, CardBody, CardTitle } from "react-bootstrap";
import styles from "../../styles/Task.module.css";
import { axiosRes } from "../../api/axiosDefaults";

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
    taskDetailPage,
  } = props;

  // Get current user from context
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // Update task state when props change
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
    }));
  }, [id, owner, created_at, task_name, priority, is_done, due_date, notes]);

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
  });

  // Handle marking task as done
  const handleDone = async () => {
    try {
      console.log(
        "Before PUT Request - task_name:",
        task.task_name,
        "priority:",
        task.priority
      );

      // Make a PUT request to update the task status
      const { data } = await axiosRes.put(`tasks/${id}`, {
        is_done: !task.is_done,
        task_name: task.task_name,
        priority: task.priority,
      });
      // Update the local state with the updated task data
      setTask((prevTask) => ({
        ...prevTask,
        is_done: !prevTask.is_done,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={`${styles.TaskCard}`}>
      <CardBody>
        <CardTitle className="d-flex justify-content-between">
          <span>{task_name}</span>
          <div className="d-flex align-items-center">
            <span>
              Priority:
              {priority === "low" ? "🔵 Low" : ""}
              {priority === "medium" ? "🟡 Medium" : ""}
              {priority === "high" ? "🔴 High" : ""}
            </span>
            {is_owner && taskDetailPage && "..."}
          </div>
        </CardTitle>
        <div className="d-flex justify-content-center text-center">
          <span className={styles.TaskSpan}>Created at: {created_at}</span>
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
          <span className={styles.TaskSpan}>Due Date: {due_date}</span>
        </div>
        <hr></hr>
        <div className="d-flex justify-content-center">
          <h5 className="mb-auto">Notes:</h5>
        </div>
        <div className="d-flex justify-content-center pt-0">{notes}</div>
      </CardBody>
    </Card>
  );
};

export default Task;
