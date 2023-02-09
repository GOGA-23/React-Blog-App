import axios from "axios";

// Creating a base URL using axios
export default axios.create({
  // baseURL: "http://localhost:3500",
  baseURL: "https://blog-test-api.onrender.com",
});
