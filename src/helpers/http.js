import { getHeader } from "./Auth";
import Axios from "axios";

const headers = getHeader();
const opt = { headers };

const http = {
  get: (url, options = opt) => {
    return Axios.get(url, options);
  },
  put: (url, data, options = opt) => {
    return Axios.put(url, data, options);
  },
  post: (url, data, options = opt) => {
    return Axios.post(url, data, options);
  },
  delete: (url, data, options = opt) => {
    return Axios.delete(url, options);
  }
};

export default http;
