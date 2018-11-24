import axios from 'axios';
import io from 'socket.io-client';

const { REACT_APP_API_ROOT: API_ROOT } = process.env;

export const getSocket = () => {
  // https://codeburst.io/react-authentication-with-twitter-google-facebook-and-github-862d59583105
};

export const login = async ({ email, password }) => {
  try {
    const { data: { user: { token } } } = await axios.post(`${API_ROOT}/users/login`, {
      email,
      password,
    });

    localStorage.setItem('token', token);
  } catch (e) {
    alert(e.message);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const register = async ({ email, password }) => {
  try {
    const { data: { user: { token } } } = await axios.post(`${API_ROOT}/users`, {
      email,
      password,
    });

    localStorage.setItem('token', token);
  } catch (e) {
    alert(e.message);
  }
};
