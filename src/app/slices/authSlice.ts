import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  username: string | null;
  id: number | null;
  role: 'admin' | 'user' | null;
  isAuth: boolean;
}

const savedUser = localStorage.getItem('user');

const initialState: AuthState = savedUser
  ? JSON.parse(savedUser)
  : { id: null, username: null, role: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.isAuth = true;
    },
    logout: (state) => {
      state.username = null;
      state.id = null;
      state.role = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
