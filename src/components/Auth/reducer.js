// import {
// } from './actions';

const initialState = {
  loggedIn: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    // case SET_LOGGED_IN: {
    //   return {
    //     ...state,
    //     loggedIn: action.loggedIn,
    //   };
    // }

    // case SET_ME: {
    //   return {
    //     ...state,
    //     user: action.user,
    //   };
    // }

    // case DO_LOGOUT: {
    //   return initialState;
    // }

    default: {
      return state;
    }
  }
}
