import axios from 'axios';

const { REACT_APP_API_ROOT: API_ROOT } = process.env;

export const saveBorrower = (data) => (
  axios.post(`${API_ROOT}/borrower`, data)
);

export const deleteBorrower = id => {
  return axios.delete(`${API_ROOT}/borrower/${id}`);
} 