import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Task from "./Task";
import { getSuggestedQuery } from "@testing-library/react";

function HomeTasksPage({ message = "" }) {
  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/?search=${query}`);
        setTasks(data);
        setHasLoaded(true);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchTasks();
  }, [pathname, query]);

  const currentUser = useCurrentUser();

  const loggedOutContent = (
    <div className="container">
      <h1>Please log in or register ot use the page</h1>
    </div>
  );

  return (
    <>
      {currentUser ? (
        <Row>
          <Col className="col-md-8 col-lg-8 mt-5">
            <p>Search Tasks:</p>
            <i className={`fas fa-search`} />
            <Form
              className=""
              onSubmit={(event) => event.preventDefault()}
            />
            <Form.Control 
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder="Search tasks" />
            {hasLoaded ? (
              <>
                {tasks.results.length ? (
                  tasks.results.map((task) => (
                    <div className="my-2">
                      <Task key={task.id} {...task} setTasks={setTasks} />
                    </div>
                  ))
                ) : (
                  <Container>message={message}</Container>
                )}
              </>
            ) : (
              <Container>
                <LoadingSpinner />
              </Container>
            )}
          </Col>
          <Col className="d-none d-sm-block p-lg-2">
            <p>Filters here</p>
          </Col>
        </Row>
      ) : (
        loggedOutContent
      )}
    </>
  );
}

export default HomeTasksPage;
