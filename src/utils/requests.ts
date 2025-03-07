import axios from "./axios";
import { handleError } from "./errorHandler";
import { storeStringData } from "./storage";

export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await axios.post(`/Users/login`, {
      email,
      password,
    });
    const { data, status } = response;

    if (status !== 200) {
      throw new Error("Invalid status code");
    }

    storeStringData("token", data.accessToken);

    return data;
  } catch (error) {
    throw error;
  }
};

export const signupRequest = async (email: string, password: string) => {
  try {
    const response = await axios.post(`/Users/register`, {
      email,
      password,
    });
    const { data, status } = response;

    if (status !== 200) {
      throw new Error("Invalid status code");
    }

    // storeStringData("token", data.accessToken);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getGoalsRequest = async () => {
  try {
    const response = await axios.get(`/Goals`);
    const { data, status } = response;

    if (status !== 200) {
      throw new Error("Invalid status code");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskRequest = async (id: string, data: any) => {
  try {
    const response = await axios.put(`/TaskItems/${id}`, data);
    const { status, data: dataRes } = response;

    if (status !== 204) {
      throw new Error("Something went wrong!");
    }
    return true;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskRequest = async (id: number) => {
  try {
    const response = await axios.delete(`/TaskItems/${id}`);
    const { status } = response;

    if (status !== 204) {
      handleError(response);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

export const addTaskRequest = async (data: any) => {
  try {
    const response = await axios.post(`/TaskItems`, data);
    const { status } = response;

    if (status !== 200) {
      throw new Error("Something went wrong!");
    }
    return true;
  } catch (error) {
    throw error;
  }
};

export const saveGoalRequest = async (data: any) => {
  try {
    const response = await axios.post(`/Goals`, data);
    const { status } = response;

    if (status !== 200) {
      throw new Error("Something went wrong!");
    }
    return true;
  } catch (error) {
    throw error;
  }
};
