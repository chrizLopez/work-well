import axios from "axios";

export default axios.create({
  baseURL: "https://workwell-api.azurewebsites.net/api",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});
