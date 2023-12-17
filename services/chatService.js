import axios from 'axios';
const baseURL = '/api/chats';

const getChats = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const getContacts = async () => {
  const response = await axios.get(`${baseURL}/contacts`);
  return response.data;
};

const createMessage = async (message) => {
  const response = await axios.post(`${baseURL}/messages`, message);
  return response.data;
};

const chatService = { getChats, getContacts, createMessage };

export default chatService;
