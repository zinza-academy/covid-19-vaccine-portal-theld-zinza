import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { injectRegistrationSlice } from './slices/injectRegistrationSlice';
import { authSlice } from './slices/authSlice';

const rootReducer = combineReducers({
  injectRegistrationForm: injectRegistrationSlice.reducer,
  auth: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
