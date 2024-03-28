// createCompanySlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCreating: false,
};

const createCompanySlice = createSlice({
  name: 'createCompany',
  initialState,
  reducers: {
    startCreating: (state) => {
      state.isCreating = true
    },
    finishCreating: (state) => {
      state.isCreating = false
    },
  },
})

export const { startCreating, finishCreating } = createCompanySlice.actions

export default createCompanySlice.reducer
