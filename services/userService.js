import axios from 'axios';
const baseURL = '/api/users';

const createAccount = async (credentials) => {
  const response = await axios.post(`${baseURL}/signup`, credentials);
  return response.data;
};

const getUserData = async () => {
  const response = await axios.get('/api/users/profile');
  return response.data;
};

const userService = { createAccount, getUserData };

export default userService;
