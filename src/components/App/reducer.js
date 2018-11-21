import update from 'immutability-helper';
import uuid from 'uuid/v4';
import { findKey } from 'lodash';

import {
  DO_ADD_BORROWER,
  DO_UPDATE_BORROWER,
} from './actions';

let borrowerCounter = 0;

const createBorrower = () => ({
  uuid: uuid(),
  borrowerAmount: '$',
  borrowerName: `Borrower ${borrowerCounter += 1}`,
});

const initialState = {
  borrowers: [
    createBorrower(),
  ],
};

function findIndexById(state, uuid) {
  return findKey(state.borrowers, borrower => borrower.uuid === uuid);
}

export default function (state = initialState, action) {
  const { data } = action;
  switch (action.type) {
    case DO_ADD_BORROWER: {
      return update(
        state,
        {
          borrowers: {
            $push: [createBorrower()],
          },
        },
      );
    }

    case DO_UPDATE_BORROWER: {
      const {
        uuid,
        borrowerAmount,
        borrowerName,
      } = data;

      return update(
        state,
        {
          borrowers: {
            [findIndexById(state, uuid)]: {
              $set: {
                uuid,
                borrowerAmount,
                borrowerName,
              },
            },
          },
        },
      );
    }

    default: return state;
  }
}  