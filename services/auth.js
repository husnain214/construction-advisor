import axios from 'axios';
const baseURL = '/api/users';

const login = async (credentials) => {
  const response = await axios.post(`${baseURL}/login`, credentials);
  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${baseURL}/logout`);
  return response.data;
};

const verifyPassword = async (password) => {
  const response = await axios.post(`${baseURL}/verifyPassword`, password);
  return response.data;
};

const auth = { login, logout, verifyPassword };

export default auth;
