import axios from "axios";

const BASE_URL = `https://4.react.pages.academy/guess-melody`;
const TIMEOUT = 5000;

const ErrorStatus = {
  UNAUTHORIZED: 401,
};

const createApi = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onError = (err) => {
    const {response} = err;

    if (response.status === ErrorStatus.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);


  return api;
};

export default createApi;
