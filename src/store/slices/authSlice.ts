import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AuthEntity {
  id?: number | string;
  fullName?: string;
  email?: string;
  citizenCode?: string;
  birthday?: string;
  gender?: number | string;
  wardId?: number | string;
  role?: number | string;
}

const initialState: AuthEntity = {
  id: '',
  fullName: '',
  email: '',
  citizenCode: '',
  birthday: '',
  gender: '',
  wardId: '',
  role: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginAuthUser: (state, action: PayloadAction<AuthEntity>) => {
      return { ...state, ...action.payload };
    },
    logoutAuthUser: () => {
      return { ...initialState };
    },
  },
});

export const { loginAuthUser, logoutAuthUser } = authSlice.actions;
export const selectAuthData = (state: RootState) => state.auth;
