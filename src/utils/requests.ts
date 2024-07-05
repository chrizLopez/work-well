// import axios from "./axios";
import axios from "axios";

const baseURL = "https://workwell-api.azurewebsites.net/api";

export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}/Users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
