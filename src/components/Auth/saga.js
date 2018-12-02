import axios from 'axios';
import {
  all,
} from 'redux-saga/effects';

import { setToken } from './api';


function doGetUser() {
  const token = localStorage.getItem('token');

  if (token) {
    setToken(token);
  }
}

export default function* root() {
  yield all([
    doGetUser(),
  ]);
}
