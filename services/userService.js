import axios from 'axios';
const baseURL = '/api/users';

const createAccount = async (credentials) => {
  const response = await axios.post(`${baseURL}/signup`, credentials);
  return response.data;
};

const getUserData = async () => {
  const response = await axios.get(`${baseURL}/profile`);
  return response.data;
};

const updateUser = async (credentials) => {
  const response = await axios.put(`${baseURL}/updatePassword`, credentials);
  return response.data;
};

const deleteUser = async () => {
  const response = await axios.delete(`${baseURL}/deleteAccount`);
  return response.data;
};

const createContact = async (contact) => {
  const response = await axios.put(`${baseURL}/addContact`, contact);
  return response.data;
};

const userService = {
  createAccount,
  getUserData,
  updateUser,
  deleteUser,
  createContact,
};

export default userService;
