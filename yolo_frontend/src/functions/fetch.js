import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:9100/api/v1/';

const fetch = async (url, options = {}) => {
  const response = await axios(url, options);
  return response.data;
};

export default fetch;
