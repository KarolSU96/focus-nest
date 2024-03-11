import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Collection from './Collection';
import { fetchMoreData } from '../../utils/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import Task from '../tasks/Task';
import LoadingSpinner from '../../components/LoadingSpinner';


function CollectionDetailPage({ message = "" }) {

    // Extract collection ID from the route parameters
    const{id} = useParams();

    // State to manage the collection details
    const [collection, setCollection] = useState({results:[]});

     // State to manage tasks related to the collection
    const [tasks, setTasks] = useState({results:[]});

    // State to track if the data has been loaded
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {

        // Function to handle component mount
        const handleMount = async() => {
            try {
                // Fetch collection details based on the ID
                const [{data: collection}] = await Promise.all([
                    axiosReq.get(`/task_collections/${id}`)
                ])

                // Set the fetched collection data
                setCollection({results: [collection]})
                console.log(collection)
            } catch(err) {
                console.log(err)
            }
        }
        
        // Function to fetch tasks related to the collection
        const fetchTasks = async() => {
            try {
                // Fetch tasks from the server based on the collection ID
                const {data} = await axiosReq.get(`/tasks/?task_collection/${id}`);

                // Set the fetched tasks data
                setTasks(data);
                setHasLoaded(true);
            } catch(err) {
                console.log(err)
            }
        }

        // Execute both functions on component mount
        fetchTasks();
        handleMount();
    }, [id])


  return (
    <Row className="mt-5 ">
        <Col className="col-12 col-md-8 mx-auto">
        {/* Display the collection details using the Collection component */}
        <Collection {...collection.results[0]} setCollection={setCollection} showDots />
        <hr></hr>
        <div className="px-4">
        {/* Display tasks in an Infinite Scroll */}
        {hasLoaded ? (
              <>
                {tasks.results.length ? (
                  <InfiniteScroll
                  children={tasks.results
                    .map((task) => (
                      <div key={task.id} className="my-2">
                        {/* Display each task using the Task component */}
                        <Task  {...task} setTasks={setTasks} showDots />
                      </div>
                    ))}
                    
                  dataLength={tasks.results.length}
                  loader={<LoadingSpinner />}
                  hasMore={!!tasks.next}
                  next={() => fetchMoreData(tasks, setTasks)}
                />

                ) : (
                  <Container>message={message}</Container>
                )}
              </>
            ) : (
              <Container className="mt-5">
                {/* Display loading spinner while data is being loaded */}
                <LoadingSpinner  />
              </Container>
            )}
            </div>
        </Col>
    </Row>
  )
}

export default CollectionDetailPage