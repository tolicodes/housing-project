import {
  all,
  takeLatest,
  select,
  put,
} from 'redux-saga/effects';

import {
  DO_SAVE_BORROWER,
  DO_DELETE_BORROWER,
  addBorrower,
  removeBorrower,
  updateBorrower,
  editBorrower,
} from './actions';

import {
  setAuthModalShown,
} from '../Auth/actions';

import {
  saveBorrower,
  deleteBorrower,
} from './api';

function* doSaveBorrower() {
  const {
    name,
    preapprovalAmount,
    purchasePrice,
    city,
    neighborhoods,
    uuid,
  } = yield select(({
    app: {
      borrowers,
      editBorrower,
    },
  }) => editBorrower
    ? borrowers.find(({ id }) => id === editBorrower)
    : borrowers[borrowers.length - 1]
  );

  const user = yield select(({
    auth,
  }) => auth.user);

  if (!user) return yield put(setAuthModalShown(true));

  if (!name) return alert('Borrower name is required');
  if (!preapprovalAmount || preapprovalAmount === '$') return alert('Preapproval Amount required');
  if (!purchasePrice || purchasePrice === '$') return alert('Purchase Amount required');
  if (!city) return alert('Please select a city');
  if (!neighborhoods.length) return alert('You must select at least 1 neighborhood per borrower');

  try {
    const { data: borrower } = yield saveBorrower({
      name,
      preapprovalAmount,
      purchasePrice,
      city,
      neighborhoods,
    });

    yield put(editBorrower(null));

    yield put(updateBorrower({
      ...borrower,
      uuid,
      neighborhoods,
      city,
    }));

    yield put(addBorrower());

  } catch (e) {
    alert(e.message);
  }
}


function* doDeleteBorrower({ data: id }) {
  yield deleteBorrower(id);

  yield put(editBorrower(null));

  yield put(removeBorrower(id));

}

export default function* root() {
  yield all([
    takeLatest(DO_SAVE_BORROWER, doSaveBorrower),
    takeLatest(DO_DELETE_BORROWER, doDeleteBorrower),
  ]);
}
