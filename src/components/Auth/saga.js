import {
  all,
  put,
} from 'redux-saga/effects';

import { setToken, getCurrentUser } from './api';

import { setUser } from './actions';


function* doGetUser() {
  const token = localStorage.getItem('token');

  if (token) {
    setToken(token);

    try {
      const { data: { user } } = yield getCurrentUser();
      yield put(setUser(user));
    } catch (e) {}
  }
}

export default function* root() {
  yield all([
    doGetUser(),
  ]);
}
