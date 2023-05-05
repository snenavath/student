import axios from "axios";

const baseUrl = "http://localhost:5001/students";

export const listStudents = async () => {
  return await axios.get(`${baseUrl}/list`);
};

export const updateStudent = async (id,payload) => {
  const headers = { "Content-Type": "application/json" };
  return await axios.post(`${baseUrl}/update/${id}`,payload, headers);
};

export const deleteStudent = async (id) => {
  return await axios.delete(`${baseUrl}/delete/${id}`);
};

export const createStudent = async (payload) => {
  const headers = { "Content-Type": "application/json" };

  return await axios.post(`${baseUrl}/create`, payload, headers);
};
