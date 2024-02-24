import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';


function CollectionPage() {
    const{id} = useParams();
    const [collection, setCollection] = useState({results:[]});

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
        handleMount();
    }, [id])


  return (
    <Row className="mt-5 ">
        <Col className="col-8 mx-auto">
        {/* <Task {...collection.results[0]} setCollection={setCollection} showDots /> */}
        Stuff here 
        </Col>
    </Row>
  )
}

export default CollectionPage