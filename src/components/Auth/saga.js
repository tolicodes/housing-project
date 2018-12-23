import {
  all,
  put,
} from 'redux-saga/effects';

import { setToken, getCurrentUser } from './api';

import { setUser } from './actions';


function* doGetUser() {
  const token = localStorage.getItem('token');
  const photo = localStorage.getItem('photo');

  if (token) {
    setToken(token);

    try {
      const { data: { user } } = yield getCurrentUser();
      yield put(setUser({
        ...user,
        photo,
      }));
    } catch (e) {}
  }
}

export default function* root() {
  yield all([
    doGetUser(),
  ]);
}
