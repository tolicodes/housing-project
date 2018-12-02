export const DO_ADD_BORROWER = 'DO_ADD_BORROWER';
export const DO_UPDATE_BORROWER = 'DO_UPDATE_BORROWER';
export const DO_SAVE_BORROWER = 'DO_SAVE_BORROWER';

export function addBorrower(data) {
  return { type: DO_ADD_BORROWER, data };
}

export function updateBorrower(data) {
  return { type: DO_UPDATE_BORROWER, data };
}

export function saveBorrower() {
  return { type: DO_SAVE_BORROWER };
}
