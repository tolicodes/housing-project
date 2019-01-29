import {
  all,
  put,
  select
} from 'redux-saga/effects';

import { setToken, getCurrentUser, getBorrowers, deleteUser } from './api';

import { setUser } from './actions';

import { setBorrowers, DO_DELETE_BORROWER } from '../App/actions';

function* doGetBorrowers() {
  const { id } = yield select(({ auth: { user} }) => user);

  try {
    let { data: borrowers } = yield getBorrowers(id);

    borrowers = borrowers.map(borrower => {
      borrower.city = borrower.borrower_neighborhoods[0].city;
      borrower.neighborhoods = borrower.borrower_neighborhoods.map(({ name }) => name);
      return borrower;
    });

    yield put(setBorrowers(borrowers));
  } catch (e) {}
}

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

      yield doGetBorrowers();
    } catch (e) {}
  }
}

export default function* root() {
  yield all([
    doGetUser(),
  ]);
}
