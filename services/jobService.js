import axios from 'axios';
const baseURL = '/api/jobs';

const create = async (jobDetails) => {
  const response = await axios.post(baseURL, jobDetails);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const get = async () => {
  const response = await axios.get(`${baseURL}/customer`);
  return response.data;
};

const update = async (id, job) => {
  const response = await axios.put(`${baseURL}/${id}`, job);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

const jobService = { create, get, update, getAll, remove };

export default jobService;
