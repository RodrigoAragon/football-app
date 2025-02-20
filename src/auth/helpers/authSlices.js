import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
      status: 'not-authenticated',
      user: {
        uid: '',
        email: '',
        displayName: '',
        photoUrl: ''
      },
      error: null
  },
  reducers: {
    startLogin: (state) => {
      state.status = 'checking'
    },
    endLoginSuccess: (state, {payload}) =>{
      state.user.uid = payload.uid
      state.user.email = payload.email
      state.user.displayName = payload.displayName
      state.user.photoUrl = payload.photoUrl
      state.status = 'authenticated'
    },
    endLoginFailed: (state, {payload}) =>{
        state.error = payload
        state.status = 'not-authenticated'
    },
    startSignOut: (state) =>{
        state.status = 'checking'
    },
    endSignOut: (state) =>{
        state.status = 'not-autenticated',
        state.user = {
            uid: '',
            email: '',
            displayName:'',
            photoUrl:''
        }
        state.error=null
    },
    startRegister: (state) =>{
        state.status = 'checking'
    },
    endRegisterSuccess: (state, {payload}) =>{
        state.user.uid = payload.uid
        state.user.email = payload.email
        state.user.displayName = payload.displayName
        state.user.photoUrl = payload.photoUrl
        state.status = 'authenticated'
    },
    endRegisterFailed: (state, {payload}) =>{
        state.error = payload
        state.status = 'not-authenticated'
    }

  },
})

export const { 
    startLogin, 
    endLoginFailed, 
    endLoginSuccess, 
    startSignOut, 
    endSignOut,
    startRegister,
    endRegisterFailed,
    endRegisterSuccess,
} = authSlice.actions