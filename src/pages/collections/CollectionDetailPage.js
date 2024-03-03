import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Collection from './Collection';
import { fetchMoreData } from '../../utils/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import Task from '../tasks/Task';
import LoadingSpinner from '../../components/LoadingSpinner';


function CollectionDetailPage() {
    const{id} = useParams();
    const [collection, setCollection] = useState({results:[]});
    const [tasks, setTasks] = useState({results:[]});
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const handleMount = async() => {
            try {
                const [{data: collection}] = await Promise.all([
                    axiosReq.get(`/task_collections/${id}`)
                ])
                setCollection({results: [collection]})
                console.log(collection)
            } catch(err) {
                console.log(err)
            }
        }

        const fetchTasks = async() => {
            try {
                const {data} = await axiosReq.get(`/tasks/?task_collection/${id}`);
                setTasks(data);
                setHasLoaded(true);
            } catch(err) {
                console.log(err)
            }
        }
        fetchTasks();
        handleMount();
    }, [id])


  return (
    <Row className="mt-5 ">
        <Col className="col-12 col-md-8 mx-auto">
        <Collection {...collection.results[0]} setCollection={setCollection} showDots />
        <hr></hr>
        <div className="px-4">
        {hasLoaded ? (
              <>
                {tasks.results.length ? (
                  <InfiniteScroll
                  children={tasks.results
                    .map((task) => (
                      <div key={task.id} className="my-2">
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
                <LoadingSpinner  />
              </Container>
            )}
            </div>
        </Col>
    </Row>
  )
}

export default CollectionDetailPage