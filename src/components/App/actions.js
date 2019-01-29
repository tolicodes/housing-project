export const DO_ADD_BORROWER = 'DO_ADD_BORROWER';
export const DO_UPDATE_BORROWER = 'DO_UPDATE_BORROWER';
export const DO_SAVE_BORROWER = 'DO_SAVE_BORROWER';
export const DO_EDIT_BORROWER = 'DO_EDIT_BORROWER';
export const DO_DELETE_BORROWER = 'DO_DELETE_BORROWER';
export const DO_REMOVE_BORROWER = 'DO_REMOVE_BORROWER';
export const DO_SET_BORROWERS = 'DO_SET_BORROWERS';

export const addBorrower = data => ({ type: DO_ADD_BORROWER, data });

export const updateBorrower = data => ({ type: DO_UPDATE_BORROWER, data });

export const saveBorrower = () => ({ type: DO_SAVE_BORROWER });

export const editBorrower = id => ({ type: DO_EDIT_BORROWER, data: id });

export const deleteBorrower = id => ({ type: DO_DELETE_BORROWER, data: id });

export const setBorrowers = data => ({ type: DO_SET_BORROWERS, data });

export const removeBorrower = id => ({ type: DO_REMOVE_BORROWER, data: id });