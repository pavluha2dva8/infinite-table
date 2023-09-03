import { all } from 'redux-saga/effects'

import { studentSaga, filteredStudentsSaga } from '../pages/students/StudentsSaga'

export default function* saga() {
  yield all([studentSaga(), filteredStudentsSaga()])
}
