import update from 'immutability-helper';
import uuid from 'uuid/v4';
import { findKey } from 'lodash';

import {
  DO_ADD_BORROWER,
  DO_UPDATE_BORROWER,
  DO_EDIT_BORROWER,
  DO_REMOVE_BORROWER,
  DO_SET_BORROWERS,
} from './actions';

let borrowerCounter = 0;

const createBorrower = () => ({
  uuid: uuid(),
  preapprovalAmount: '$',
  name: `Borrower ${borrowerCounter += 1}`,
  purchasePrice: '$',
  neighborhoods: [],
  city: '',
});

const initialState = {
  borrowers: [
    createBorrower(),
  ],
};

function findIndexById(state, id) {
  return findKey(state.borrowers, borrower => borrower.uuid === id || borrower.id === id);
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

    case DO_SET_BORROWERS: {
      console.log(data)
      return {
        ...state,
        borrowers: [...data, createBorrower()],
      };
    }

    case DO_UPDATE_BORROWER: {
      const {
        uuid,
        id,
        preapprovalAmount,
        name,
        purchasePrice,
        neighborhoods,
        city,
      } = data;

      return update(
        state,
        {
          borrowers: {
            [findIndexById(state, uuid || id)]: {
              $set: {
                id,
                uuid,
                preapprovalAmount,
                purchasePrice,
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
      return update(
        state,
        {
          editBorrower: {
            $set: data,
          },
        },
      );
    }

    case DO_REMOVE_BORROWER: {
      return update(
        state,
        {
          borrowers: {
            $splice: [[findIndexById(state, data), 1]],
          },
        },
      );
    }

    default: return state;
  }
}
