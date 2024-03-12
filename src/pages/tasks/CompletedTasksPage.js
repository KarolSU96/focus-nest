import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Task from "./Task";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function CompletedTasksPage({ message = "" }) {
  // State for storing completed tasks and loading status
  const [completedTasks, setCompletedTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  // Get current pathname using useLocation hook
  const { pathname } = useLocation();

  // State for handling search query
  const [query, setQuery] = useState("");

  // useEffect hook to fetch completed tasks when the component mounts or query changes
  useEffect(() => {
    // Function to fetch completed tasks from the server
    const fetchCompletedTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/?is_done=True`);

        // Set completed tasks and update loading status
        setCompletedTasks(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    // Set loading status to false and use a timer (1s) delay the fetch
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchCompletedTasks();
    }, 1000);

    // Cleanup function to clear the timer
    return () => {
      clearTimeout(timer);
    };
  }, [pathname, query]); // Dependency array with pathname and query as dependencies

  return (
    <Row className="justify-content-center">
      <Col className="col-md-8 col-lg-8 mt-3">
        <Form className="" onSubmit={(event) => event.preventDefault()} />
        <Form.Control
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
          placeholder="Search tasks"
        />
        {/* Display completed tasks or a message if no tasks are found */}
        {hasLoaded ? (
          <>
            {completedTasks.results.length ? (
              <InfiniteScroll
                children={completedTasks.results.map((task) => (
                  <div key={task.id} className="my-2">
                    <Task {...task} setCompletedTasks={setCompletedTasks} />
                  </div>
                ))}
                dataLength={completedTasks.results.length}
                loader={<LoadingSpinner />}
                hasMore={!!completedTasks.next}
                next={() => fetchMoreData(completedTasks, setCompletedTasks)}
              />
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
    </Row>
  );
}

export default CompletedTasksPage;
