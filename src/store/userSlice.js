import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: '',
  token: ''
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      return {...state, ...action.payload}
    },
    deleteUser: (state) => {
      state.userId = ''
      state.token = ''
    },
  },
})

export const { addUser, deleteUser } = userSlice.actions
export default userSlice.reducer