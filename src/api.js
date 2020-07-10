import axios from "axios";

const BASE_URL = `https://4.react.pages.academy/guess-melody`;
const TIMEOUT = 5000;

const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });


  return api;
};

export default createApi;
