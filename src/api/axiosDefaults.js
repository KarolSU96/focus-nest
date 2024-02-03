import axios from "axios";

axios.defaults.baseURL = "https://focus-nest-api-a8aee1208ee3.herokuapp.com/";
axios.defaults.headers.post["Conent-Type"] = "multipart/from-data";
axios.defaults.withCredentials = true;

