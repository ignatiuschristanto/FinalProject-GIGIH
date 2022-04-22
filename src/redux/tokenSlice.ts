import { createSlice } from "@reduxjs/toolkit";
import { UserData } from '../interface-types/user';

interface IInitialState {
  accessToken: string;
  isLogin: boolean;
  user: UserData | null;
}

const initialState: IInitialState = {
  accessToken: '',
  isLogin: false,
  user: null,
}

export const tokenSlice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        login: (state, action) => {
          state.accessToken = action.payload.accessToken;
          state.isLogin = true;
          state.user = action.payload.user;
          localStorage.setItem('expiredDate', action.payload.expiredDate);
          localStorage.setItem('accessToken', state.accessToken);
          localStorage.setItem('user', JSON.stringify(state.user));
        },
        logout: (state) => {
          state.accessToken = '';
          state.isLogin = false;
          state.user = null;
          localStorage.removeItem('expiredDate');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
        }
      }
});

export const { login, logout } = tokenSlice.actions;

export default tokenSlice.reducer;