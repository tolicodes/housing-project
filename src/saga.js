import { all } from 'redux-saga/effects';
import authSaga from './components/Auth/saga';
import appSaga from './components/App/saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    appSaga(),
  ]);
}
