import {
  SET_USER,
  DO_LOGOUT,
} from './actions';

const initialState = {
  user: null,
};

export default function (state = initialState, { type, data }) {
  switch (type) {
    case SET_USER: {
      return {
        ...state,
        user: data,
      };
    }

    case DO_LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
