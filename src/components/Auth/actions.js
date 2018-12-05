export const SET_USER = 'SET_USER';
export const DO_LOGOUT = 'DO_LOGOUT';
export const AUTH_MODAL_SHOWN = 'AUTH_MODAL_SHOWN';

export const setUser = data => ({ type: SET_USER, data });

export const setAuthModalShown = shown => ({ type: AUTH_MODAL_SHOWN, data: shown });
