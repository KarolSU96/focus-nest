import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

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
    <Row>
        <Col>
        <p>Task component</p>
        </Col>
    </Row>
  )
}

export default TaskDetailPage