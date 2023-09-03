import { createSlice } from '@reduxjs/toolkit'

import { StudentsRequestPayload, StudentsState } from './types'

const initialState: StudentsState = {
  students: [],
  loading: false,
  error: undefined,
}

export const StudentsSlice = createSlice({
  name: 'Student',
  initialState,
  reducers: {
    loadStudents: (state, _payload: { payload: StudentsRequestPayload }) => {
      state.loading = true
    },
    filterStudents: (state, _payload: { payload: StudentsRequestPayload }) => {
      state.loading = true
    },
    fetchFilteredStudents: (state, { payload }) => {
      state.loading = false
      state.students = payload
    },
    loadedStudents: (state, { payload }) => {
      state.loading = false
      state.students = [...state.students, ...payload]
    },
  },
})

export const { loadStudents, loadedStudents, filterStudents, fetchFilteredStudents } =
  StudentsSlice.actions
