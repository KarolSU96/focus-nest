import { jwtDecode } from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      // look at the results form API
      results: data.results.reduce((acc, cur) => {
        // look through the array of tasks in accumulator. Compare accumulator item id to current item id from fetched array
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];

        //append the new results to exsiting
      }, prevResource.results),
    }));
  } catch(err) {
  }
};

// function stores logged in users resfresh token timestamp in localstorage
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// function makes attempts to refresh the eaccess token only if the timestamp extists
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

// functionremoves the timestam then the token expires or user doesn't exist
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};