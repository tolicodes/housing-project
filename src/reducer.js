import { combineReducers } from 'redux';

import auth from './components/Auth/reducer';
import app from './components/App/reducer';

export default combineReducers({
  auth,
  app,
});
