import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Task from "./Task";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function HomeTasksPage({ message = "" }) {
  // State for storing tasks and loading status
  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  // Get current pathname using useLocation hook
  const { pathname } = useLocation();

  // State for handling search query
  const [query, setQuery] = useState("");

  // useEffect hook to fetch tasks when the component mounts or pathname/query changes
  useEffect(() => {
    // Function to fetch tasks from the server based on the search query
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/?search=${query}`);
        // Filter incomplete tasks from the results
        data.results.filter((task) => !task.is_done);
        setTasks(data);
        setHasLoaded(true);
      } catch (err) {
      }
    };
    // Set loading status to false and use a (1s) timer to delay the fetch
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchTasks();
    }, 1000);

    // Cleanup function to clear the timer
    return () => {
      clearTimeout(timer);
    };
  }, [pathname, query]); // Dependency array with pathname and query as dependencies

  // Get the current user from the context
  const currentUser = useCurrentUser();

  // Content to display when the user is not logged in
  const loggedOutContent = (
    <div className="container">
      <h1>Please log in or register ot use the page</h1>
    </div>
  );

  return (
    <>
      {currentUser ? (
        <Row className="justify-content-center">
          <Col className="col-md-8 col-lg-8 mt-3">
            <Form className="" onSubmit={(event) => event.preventDefault()} />
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder="Search tasks"
            />
            {/* Display tasks or a message if no tasks are found */}
            {hasLoaded ? (
              <>
                {tasks.results.length ? (
                  <InfiniteScroll
                    children={tasks.results
                      .filter((task) => !task.is_done) // Filter tasks where is_done is false
                      .map((task) => (
                        <div key={task.id} className="my-2">
                          <Task {...task} setTasks={setTasks} showDots />
                        </div>
                      ))}
                    dataLength={tasks.results.length}
                    loader={<LoadingSpinner />}
                    hasMore={!!tasks.next}
                    next={() => fetchMoreData(tasks, setTasks)}
                  />
                ) : (
                  <Container className="d-flex justify-content-center">message={message}</Container>
                )}
              </>
            ) : (
              <Container className="mt-5">
                <LoadingSpinner />
              </Container>
            )}
          </Col>
        </Row>
      ) : (
        loggedOutContent
      )}
    </>
  );
}

export default HomeTasksPage;
