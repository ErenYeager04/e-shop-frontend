import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  brand: '',
  type: '',
}


export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    makeQuery: (state, action) => {
      return {...state, ...action.payload}
    },
  },
})

export const { makeQuery } = querySlice.actions
export default querySlice.reducer