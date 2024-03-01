import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Collection from "./Collection";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function CollecitonsPage({ message = "" }) {
  const [collections, setCollections] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await axiosReq.get(`/task_collections/?search=${query}`);
        setCollections(data);
        setHasLoaded(true);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(()=> {
      fetchCollections();
    }, 1000)
    return () => {
      clearTimeout(timer);
    }
  }, [pathname, query]);

  const currentUser = useCurrentUser();

  const loggedOutContent = (
    <div className="container">
      <h1>Please log in or register ot use the page</h1>
    </div>
  );

  const handleClickCollection = (collectionId) => {
    console.log('handleClickCollection invoked')
    navigate(`/collections/${collectionId}`);
  }

  return (
    <>
      {currentUser ? (
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
                {collections.results.length ? (
                  <InfiniteScroll
                  children={collections.results
                    .map((collection) => (
                      <div key={collection.id} className="my-2">
                        <Collection handleClick={() => handleClickCollection(collection.id)} {...collection} setCollections={setCollections} showDots />
                      </div>
                    ))}
                  dataLength={collections.results.length}
                  loader={<LoadingSpinner />}
                  hasMore={!!collections.next}
                  next={() => fetchMoreData(collections, setCollections)}
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
          </Col>
          <Col className="d-none d-sm-block p-lg-2 col-2">
            <p>Filters here</p>
          </Col>
        </Row>
      ) : (
        loggedOutContent
      )}
    </>
  );
}

export default CollecitonsPage;
