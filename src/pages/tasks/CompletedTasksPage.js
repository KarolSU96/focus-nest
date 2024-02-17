import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Task from "./Task";

function CompletedTasksPage({ message = "" }) {
  const [completedTasks, setCompletedTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/?is_done=True`);
        
        setCompletedTasks(data);
        setHasLoaded(true);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchCompletedTasks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <Row className="justify-content-center">
      <Col className="col-md-8 col-lg-8 mt-3">
        <Form
          className=""
          onSubmit={(event) => event.preventDefault()}
        />
        {hasLoaded ? (
          <>
            {completedTasks.results.length ? (
              completedTasks.results.map((task) => (
                <div key={task.id} className="my-2">
                  <Task  {...task} setCompletedTasks={setCompletedTasks} />
                </div>
              ))
            ) : (
              <Container>{message}</Container>
            )}
          </>
        ) : (
          <Container className="mt-5">
            <LoadingSpinner />
          </Container>
        )}
      </Col>
      <Col className="d-none d-sm-block p-lg-2 col-2">
        <p>Filters here</p>
      </Col>
    </Row>
  );
}

export default CompletedTasksPage;
