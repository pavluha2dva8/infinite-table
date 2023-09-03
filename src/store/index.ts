import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { StudentsSlice } from '../pages/students/StudentsSlice'

import saga from './saga'

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    students: StudentsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(saga)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
