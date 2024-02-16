import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Task from './Task';

function HomeTasksPage({message = ""}) {
  const [tasks, setTasks] = useState({results: []});
  const [hasLoaded, setHasLoaded] = useState(false);
  const {pathname} = useLocation();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const {data} = await axiosReq.get('/tasks/')
        setTasks(data)
        setHasLoaded(true)
        console.log(data)
      } catch(err) {
        console.log(err)
      }
    }
    setHasLoaded(false);
    fetchTasks();
  }, [pathname])

  const currentUser = useCurrentUser();
  
  const loggedOutContent = (
    <div className="container">
    <h1>Please log in or register ot use the page</h1>
    </div>
  );

  
  return (
    <>
      { currentUser ? (
      <Row >
          <Col className="col-lg-8 mt-5">
          {hasLoaded ? (
          < >
          {tasks.results.length ? 
            tasks.results.map(task => (

              <Task key={task.id}{...task} setTasks={setTasks}/>

              ))
           : (<Container>
            message={message}
           </Container>)}
          </>
          ) : (
            <Container><LoadingSpinner/></Container>
          )}
          </Col>
          <Col className="d-none d-lg-block p-lg-2">
          <p>Filters here</p>
          </Col>
      </Row>
      ): loggedOutContent}

    </>
  )
}

export default HomeTasksPage