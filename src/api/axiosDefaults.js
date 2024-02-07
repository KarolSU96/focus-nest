import axios from "axios";

axios.defaults.baseURL = "https://focus-nest-api-a8aee1208ee3.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// axios interceptors
export const axiosReq = axios.create();
export const axiosRes = axios.create();