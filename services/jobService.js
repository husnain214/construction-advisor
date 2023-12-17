import axios from 'axios';
const baseURL = '/api/jobs';

const create = async (jobDetails) => {
  const response = await axios.post(baseURL, jobDetails);
  return response.data;
};

const get = async (isCustomer = false) => {
  const target = isCustomer ? `${baseURL}/customer` : baseURL;
  const response = await axios.get(target);
  return response.data;
};

const update = async (id, job) => {
  const response = await axios.put(`${baseURL}/${id}`, job);
  return response.data;
};

const jobService = { create, get, update };

export default jobService;
