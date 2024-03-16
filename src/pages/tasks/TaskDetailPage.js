import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Task from "./Task";

function TaskDetailPage() {
  // Retrieve the 'id' parameter from the URL using useParams hook
  const { id } = useParams();

  // Define state variable 'task' using useState hook, initialized with an empty object
  const [task, setTask] = useState({ results: [] });

  // Define an effect to run after the component mounts or 'id' parameter changes
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Make a GET request to fetch task using axiosReq
        const [{ data: task }] = await Promise.all([
          axiosReq.get(`/tasks/${id}`),
        ]);
        // Update 'task' state with the fetched task data
        setTask({ results: [task] });
      } catch (err) {}
    };
    // Call the handleMount function
    handleMount();
  }, [id]);

  // Render the TaskDetailPage component
  return (
    <Row className="mt-5 ">
      <Col className="col-8 mx-auto">
        <Task {...task.results[0]} setTask={setTask} showDots />
      </Col>
    </Row>
  );
}

export default TaskDetailPage;
