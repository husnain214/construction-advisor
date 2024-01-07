import axios from 'axios';
const baseURL = '/api/users';

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createAccount = async (credentials) => {
  const response = await axios.post(`${baseURL}/signup`, credentials);
  return response.data;
};

const getUserData = async () => {
  const response = await axios.get(`${baseURL}/profile`);
  return response.data;
};

const changePassword = async (credentials) => {
  const response = await axios.put(`${baseURL}/updatePassword`, credentials);
  return response.data;
};

const deleteUser = async () => {
  const response = await axios.delete(`${baseURL}/deleteAccount`);
  return response.data;
};

const updateUser = async (credentials) => {
  const response = await axios.put(baseURL, credentials);
  return response.data;
};

const createContact = async (contact) => {
  const response = await axios.put(`${baseURL}/addContact`, contact);
  return response.data;
};

const userService = {
  getAll,
  createAccount,
  getUserData,
  updateUser,
  changePassword,
  deleteUser,
  createContact,
};

export default userService;
