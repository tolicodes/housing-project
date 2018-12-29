export const DO_ADD_BORROWER = 'DO_ADD_BORROWER';
export const DO_UPDATE_BORROWER = 'DO_UPDATE_BORROWER';
export const DO_SAVE_BORROWER = 'DO_SAVE_BORROWER';
export const DO_EDIT_BORROWER = 'DO_EDIT_BORROWER';

export const addBorrower = data => ({ type: DO_ADD_BORROWER, data });

export const updateBorrower = data => ({ type: DO_UPDATE_BORROWER, data });

export const saveBorrower = () => ({ type: DO_SAVE_BORROWER });

export const editBorrower = id => ({ type: DO_EDIT_BORROWER, data: id });
