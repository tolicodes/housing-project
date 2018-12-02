import axios from 'axios';

import {
  all,
} from 'redux-saga/effects';

function doGetUser() {
  const token = localStorage.getItem('token');

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export default function* root() {
  yield all([
    doGetUser(),
  ]);
}
