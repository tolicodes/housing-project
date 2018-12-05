import {
  all,
  takeLatest,
  select,
  put,
} from 'redux-saga/effects';

import {
  DO_SAVE_BORROWER,
  addBorrower,
} from './actions';

import {
  setAuthModalShown,
} from '../Auth/actions';

import {
  saveBorrower,
} from './api';

function* doSaveBorrower() {
  const {
    name,
    preapprovalAmount,
    city,
    neighborhoods,
  } = yield select(({
    app: {
      borrowers,
    },
  }) => borrowers[borrowers.length - 1]);

  const user = yield select(({
    auth,
  }) => auth.user);

  if (!user) return yield put(setAuthModalShown(true));

  if (!name) return alert('Borrower name required');
  if (!preapprovalAmount || preapprovalAmount === '$') return alert('Preapproval Amount required');
  if (!city) return alert('Select a city');
  if (!neighborhoods.length) return alert('You must select at least 1 neighborhood');

  try {
    yield saveBorrower({
      name,
      preapprovalAmount,
      city,
      neighborhoods,
    });

    console.log('y');

    yield put(addBorrower());
  } catch (e) {
    alert(e.message);
  }
}

export default function* root() {
  yield all([
    takeLatest(DO_SAVE_BORROWER, doSaveBorrower),
  ]);
}
