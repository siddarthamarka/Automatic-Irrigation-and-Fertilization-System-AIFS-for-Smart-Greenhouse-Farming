import axios from 'axios';

export const sendControlCommand = (command) => {
  return axios.post('/api/control', { command });
};

export const fetchStatus = () => {
  return axios.get('/api/status');
};
