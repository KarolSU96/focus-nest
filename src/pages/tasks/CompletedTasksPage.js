import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Task from "./Task";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function CompletedTasksPage({ message = "" }) {
  const [completedTasks, setCompletedTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

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
  }, [pathname, query]);

  return (
    <Row className="justify-content-center">
      <Col className="col-md-8 col-lg-8 mt-3">
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
            {completedTasks.results.length ? (
              <InfiniteScroll
              children= {
              completedTasks.results.map((task) => (
                <div key={task.id} className="my-2">
                  <Task  {...task} setCompletedTasks={setCompletedTasks} />
                </div>
              ))
            }
            dataLength={completedTasks.results.length}
            loader={<LoadingSpinner/>}
            hasMore={!!completedTasks.next}
            next={()=> fetchMoreData(completedTasks, setCompletedTasks)}
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
      <Col className="d-none d-sm-block p-lg-2 col-2">
        <p>Filters here</p>
      </Col>
    </Row>
  );
}

export default CompletedTasksPage;
