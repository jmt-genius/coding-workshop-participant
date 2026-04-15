import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('luminous_user');
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // payload: { user: { name, email }, role }
      const sessionData = { 
        ...action.payload.user, 
        role: action.payload.role 
      };
      state.user = sessionData;
      state.isAuthenticated = true;
      localStorage.setItem('luminous_user', JSON.stringify(sessionData));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('luminous_user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
