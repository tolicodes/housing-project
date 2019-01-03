import update from 'immutability-helper';
import uuid from 'uuid/v4';
import { findKey } from 'lodash';

import {
  DO_ADD_BORROWER,
  DO_UPDATE_BORROWER,
  DO_EDIT_BORROWER,
  DO_DELETE_BORROWER,
} from './actions';

let borrowerCounter = 0;

const createBorrower = () => ({
  uuid: uuid(),
  preapprovalAmount: '$',
  name: `Borrower ${borrowerCounter += 1}`,
  neighborhoods: [],
  city: '',
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
        preapprovalAmount,
        name,
        neighborhoods,
        city,
      } = data;

      return update(
        state,
        {
          borrowers: {
            [findIndexById(state, uuid)]: {
              $set: {
                uuid,
                preapprovalAmount,
                name,
                neighborhoods,
                city,
              },
            },
          },
        },
      );
    }

    case DO_EDIT_BORROWER: {
      console.log(data);
      return update(
        state,
        {
          editBorrower: {
            $set: data,
          },
        },
      );
    }

    case DO_DELETE_BORROWER: {
      console.log(data);
      return update(
        state,
        {
          deleteBorrower: {
            $splice: [[findIndexById(state, uuid), 1]],
          },
        },
      );
    }

    default: return state;
  }
}
