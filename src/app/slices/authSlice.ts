import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  username: string | null;
  id: number | null;
  role: 'admin' | 'user' | null;
  isAuth: boolean;
}

const savedUser = localStorage.getItem('user');

const parsedUser = (() => {
  try {
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
})();

const initialState: AuthState = parsedUser
  ? { ...parsedUser, isAuth: true }
  : { id: null, username: null, role: null, isAuth: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ id: number; username: string; role: 'admin' | 'user' }>,
    ) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.isAuth = true;

      localStorage.setItem('user', JSON.stringify(state));
    },

    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      localStorage.setItem('user', JSON.stringify(state));
    },

    logout: (state) => {
      state.username = null;
      state.id = null;
      state.role = null;
      state.isAuth = false;

      localStorage.removeItem('user');
    },
  },
});

export const { setUser, logout, updateUsername } = authSlice.actions;
export default authSlice.reducer;
