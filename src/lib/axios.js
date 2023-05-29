import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.BASE_URL, // replace with your API URL
  timeout: 10000, // set the maximum timeout for requests
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosClient;
