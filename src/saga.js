import { all } from 'redux-saga/effects';
import authSaga from './components/Auth/saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
  ]);
}
