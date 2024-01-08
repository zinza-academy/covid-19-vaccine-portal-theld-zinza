import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { injectRegistrationSlice, formStepSlice } from './slices/injectRegistrationSlice';

const rootReducer = combineReducers({
  injectRegistrationForm: injectRegistrationSlice.reducer,
  formStepState: formStepSlice.reducer,
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
