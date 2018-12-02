import axios from 'axios';

const { REACT_APP_API_ROOT: API_ROOT } = process.env;

export const saveBorrower = (data) => {
  console.log(axios.defaults.headers.common.Authorization);
  axios.post(`${API_ROOT}/borrower`, data);
}
;