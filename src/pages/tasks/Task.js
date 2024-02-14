import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, CardBody, CardTitle } from "react-bootstrap";

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
    taskDetailPage
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner


  return (
    <Card>
        <CardBody>
            <CardTitle className="d-flex justify-content-between">
            <span>{task_name}</span>
            <div className="d-flex align-items-center">
                <span>Priority: {priority}</span>
                {is_owner && taskDetailPage && "..."}    
            </div>
            </CardTitle>
            <div className="d-flex justify-content-center">
          <div>
            <span>Created at: {created_at}</span>
            <span>Is Done: {is_done}</span>
            <span>Due Date: {due_date}</span>
          </div>
          <div>
            <span>Notes: {notes}</span>
            {/* Add other elements if needed */}
          </div>
        </div>
        </CardBody>
    </Card>
  )
}

export default Task;
