import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, StrictEffect, debounce } from 'redux-saga/effects'

import { instance } from '../../api'

import {
  fetchFilteredStudents,
  loadStudents,
  loadedStudents,
  filterStudents,
} from './StudentsSlice'
import { Student, StudentsRequestPayload } from './types'

const makeRequest = async (payload: StudentsRequestPayload) => {
  const { query, page } = payload
  const response = await instance.get(`/students?q=${query}&_page=${page}&_limit=20`)
  return response.data
}

export function* studentSaga() {
  yield debounce(1000, loadStudents.toString(), studentsWorker)
}

export function* filteredStudentsSaga() {
  yield debounce(1000, filterStudents.toString(), studentsWorker)
}

export function* studentsWorker(
  action: PayloadAction<StudentsRequestPayload>,
): Generator<StrictEffect, void, Student[]> {
  const response = yield call(makeRequest, action.payload)

  switch (action.type) {
    case filterStudents.type:
      yield put({ type: fetchFilteredStudents.type, payload: response })
      break

    default:
      yield put({ type: loadedStudents.type, payload: response })
      break
  }
}
