import axios from 'axios';
const baseURL = '/api/bids';

const create = async (bidDetails) => {
  const response = await axios.post(baseURL, bidDetails);
  return response.data;
};

const getJobBids = async (jobId) => {
  const response = await axios.get(`${baseURL}/JobBids?JobPostId=${jobId}`);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const acceptBid = async (id) => {
  const response = await axios.post(`${baseURL}/AcceptBid?BidId=${id}`);
  return response.data;
};

const deleteBid = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

const bidService = { create, getJobBids, getAll, acceptBid, deleteBid };

export default bidService;
