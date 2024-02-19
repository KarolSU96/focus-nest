import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevRecourse) => ({
      ...prevRecourse,
      next: data.next,
      // look at the results form API
      results: data.results.reduce((acc, cur) => {
                // look through the array of posts in accumulator. Compare accumulator item id to current item id from fetched array
        return acc.some((accResults) => accResults.id === cur.id)
          ? acc
          : [...acc, cur];
          
          //append the new results to exsiting 
      }, prevRecourse.results),
    }));
  } catch {}
};
