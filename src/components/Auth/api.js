import axios from 'axios';
import io from 'socket.io-client';

const {
  REACT_APP_API_ROOT: API_ROOT,
} = process.env;

export const setToken = (token) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const getSocket = () => io(API_ROOT);

export const login = async ({
  email,
  password,
}) => {
  try {
    const {
      data: {
        user: {
          token,
          name,
        },
      },
    } = await axios.post(`${API_ROOT}/users/login`, {
      email,
      password,
    });

    setToken(token);

    return {
      name,
    };
  } catch (e) {
    alert(e.message);
  }
};

export const getCurrentUser = () => axios.get(`${API_ROOT}/users/current`);

export const getBorrowers = (id) => axios.get(`${API_ROOT}/borrower/current?userId=${id}`);

export const logout = () => {
  axios.defaults.headers.common.Authorization = '';
  localStorage.removeItem('token');
};

export const register = async ({
  email,
  password,
  name,
  phone,
  company,
  nmls_number,
  li_id,
  fb_id,
  google_id,
}) => {
  try {
    const {
      data: {
        user: {
          token,
        },
      },
    } = await axios.post(`${API_ROOT}/users`, {
      email,
      password,
      name,
      phone,
      company,
      nmls_number,
      li_id,
      fb_id,
      google_id,
    });

    setToken(token);
  } catch (e) {
    alert(e.message);
  }
};