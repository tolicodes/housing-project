import {
  all,
  takeLatest,
  select,
} from 'redux-saga/effects';

import {
  DO_SAVE_BORROWER,
} from './actions';

import {
  saveBorrower,
} from './api';

function* doSaveBorrower() {
  const {
    name,
    preapprovalAmount,
    city,
    neighborhoods,
  } = yield select(({ app: { borrowers } }) => borrowers[borrowers.length - 1]);

  if (!name) { return alert('Borrower name required'); }
  if (!preapprovalAmount || preapprovalAmount === '$') { return alert('Preapproval Amount required'); }
  if (!city) { return alert('Select a city'); }
  if (!neighborhoods.length) { return alert('You must select at least 1 neighborhood'); }

  yield saveBorrower({
    name,
    preapprovalAmount,
    city,
    neighborhoods,
  });
}

export default function* root() {
  yield all([
    takeLatest(DO_SAVE_BORROWER, doSaveBorrower),
  ]);
}
