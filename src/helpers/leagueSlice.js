import { createSlice } from '@reduxjs/toolkit'

export const leagueSlice = createSlice({
  name: 'league',
  initialState: {
      counter: 10
  },
  reducers: {
    increment: (state) => {
      state.counter += 1
    },
  },
})

export const { increment } = leagueSlice.actions