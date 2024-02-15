import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, CardBody, CardTitle } from "react-bootstrap";
import styles from "../../styles/Task.module.css";

const Task = (props) => {
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

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.TaskCard}>
      <CardBody>
        <CardTitle className="d-flex justify-content-between">
          <span>{task_name}</span>
          <div className="d-flex align-items-center">
            <span>
              Priority: {priority === "low" ? "🔵 Low" : ""}
              {priority === "medium" ? "🟡 Medium" : ""}
              {priority === "high" ? "🔴 High" : ""}
            </span>
            {is_owner && taskDetailPage && "..."}
          </div>
        </CardTitle>
        <div className="d-flex justify-content-center text-center">
          <span className={styles.TaskSpan}>Created at: {created_at}</span>
          <span className={styles.TaskSpan}>
            Status: {is_done ? "Done ✔️" : "Pending ⌛"}
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
