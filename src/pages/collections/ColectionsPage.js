import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Collection from "./Collection";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import btnStyles from "../../styles/Button.module.css";

function CollecitonsPage({ message = "" }) {
  // State for storing collections data
  const [collections, setCollections] = useState({ results: [] });
  // State to track whether the data has been loaded
  const [hasLoaded, setHasLoaded] = useState(false);
  // Location hook for accessing the current pathname
  const { pathname } = useLocation();
  // State for the search query
  const [query, setQuery] = useState("");
  // Navigate hook for programmatic navigation
  const navigate = useNavigate();

  // Effect to fetch collections data based on the pathname and search quer
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // Fetch collections data from the API
        const { data } = await axiosReq.get(
          `/task_collections/?search=${query}`
        );
        // Update the collections state and set hasLoaded to true
        setCollections(data);
        setHasLoaded(true);
      } catch (err) {}
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchCollections();
    }, 1000);

    // Cleanup function to clear the timeout when the component unmounts or when the dependencies change
    return () => {
      clearTimeout(timer);
    };
  }, [pathname, query]);

  // Current user from the context
  const currentUser = useCurrentUser();

  // Content to display when the user is not logged in
  const loggedOutContent = (
    <div className="container">
      <h1>Please log in or register ot use the page</h1>
    </div>
  );

  // Function to handle clicking on the "Add Collection" button
  const handleClickAddCollection = () => {
    navigate("/collections/create");
  };

  return (
    <>
      {currentUser ? (
        <Row className="justify-content-center">
          <Col className="col-md-8 col-lg-8 mt-3">
            {/* Search form */}
            <Form className="" onSubmit={(event) => event.preventDefault()} />
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder="Search collections"
            />
            <div
              className="d-flex justify-content-center mt-2
              "
            >
              {/* Button to add a new collection */}
              <Button
                onClick={handleClickAddCollection}
                className={`${btnStyles.ConfirmButton}`}
              >
                Add Collection
              </Button>
            </div>
            {hasLoaded ? (
              <>
                {/* Display collections using InfiniteScroll */}
                {collections.results.length ? (
                  <InfiniteScroll
                    children={collections.results.map((collection) => (
                      <div key={collection.id} className="my-2">
                        <Collection
                          {...collection}
                          setCollections={setCollections}
                          showDots
                        />
                      </div>
                    ))}
                    dataLength={collections.results.length}
                    loader={<LoadingSpinner />}
                    hasMore={!!collections.next}
                    next={() => fetchMoreData(collections, setCollections)}
                  />
                ) : (
                  <Container>{message}</Container>
                )}
              </>
            ) : (
              <Container className="mt-5">
                {/* Display loading spinner while data is being fetched */}
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

export default CollecitonsPage;
