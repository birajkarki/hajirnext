// splitScreenSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

const splitScreenSlice = createSlice({
  name: 'splitScreen',
  initialState,
  reducers: {
    openSplitScreen: (state) => {
      state.isOpen = true
    },
    closeSplitScreen: (state) => {
      state.isOpen = false
    },
  },
})

export const { openSplitScreen, closeSplitScreen } = splitScreenSlice.actions

export default splitScreenSlice.reducer
