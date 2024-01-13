import axios from 'axios';
const baseUrl = '/api/estimation';

const getFormValues = async () => {
  const response = await axios.get(`${baseUrl}/formValues`);
  return response.data;
};

const getEstimation = async (data) => {
  const response = await axios.post(`${baseUrl}/calculate`, {
    ...data,
  });

  return response.data;
};

const calculatorService = {
  getFormValues,
  getEstimation,
};

export default calculatorService;
