import { configureStore } from '@reduxjs/toolkit'
import creationReducer from '../slices/creation'

export const store = configureStore({
  reducer: {
    creation: creationReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch