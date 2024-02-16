import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Task from './Task';

function TaskDetailPage() {
    const{id} = useParams();
    const [task, setTask] = useState({results:[]});

    useEffect(() => {
        const handleMount = async() => {
            try {
                const [{data: task}] = await Promise.all([
                    axiosReq.get(`/tasks/${id}`)
                ])
                setTask({results: [task]})
                console.log(task)
            } catch(err) {
                console.log(err)
            }
        }
        handleMount();
    }, [id])


  return (
    <Row className="mt-5 ">
        <Col className="col-8 mx-auto">
        <Task {...task.results[0]} setTask={setTask} taskDetailPage />
        </Col>
    </Row>
  )
}

export default TaskDetailPage