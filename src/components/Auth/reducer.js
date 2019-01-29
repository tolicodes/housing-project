import {
  SET_USER,
  DO_LOGOUT,
  AUTH_MODAL_SHOWN,
  SET_BORROWERS,
} from './actions';

const initialState = {
  user: null,
};

export default function (state = initialState, { type, data }) {
  switch (type) {
    case SET_USER: {
      if (data && data.photo) {
        localStorage.setItem('photo', data.photo);
      }

      return {
        ...state,
        user: data,
      };
    }

    case DO_LOGOUT: {
      return initialState;
    }

    case AUTH_MODAL_SHOWN: {
      return {
        ...state,
        authModalShown: data,
      };
    }

    default: {
      return state;
    }
  }
}
