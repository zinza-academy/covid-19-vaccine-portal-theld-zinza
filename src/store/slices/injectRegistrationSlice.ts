import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { injectRegistrationSteps } from '../../utils/constants/constants';
import { RootState } from '../store';

export interface FormData {
  priority?: number;
  insurance_number?: string;
  career?: string;
  workplace?: string;
  current_address?: string;
  injection_date?: string;
  injection_phase?: number;
}

export interface formStepData {
  steps: string[];
  currentStep: number;
}

const formState: FormData = {};

const formStep: formStepData = {
  steps: injectRegistrationSteps,
  currentStep: 0,
};

export const injectRegistrationSlice = createSlice({
  name: 'injectRegistrationForm',
  initialState: formState,
  reducers: {
    updateForm: (state, action: PayloadAction<FormData>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => {
      return { ...formState };
    },
  },
});

export const formStepSlice = createSlice({
  name: 'formStepState',
  initialState: formStep,
  reducers: {
    setSteps: (state, action: PayloadAction<string[]>) => {
      state.steps = action.payload;
    },
    incrementStep: (state) => {
      state.currentStep =
        state.currentStep == state.steps.length - 1 ? state.currentStep : state.currentStep + 1;
    },
    decrementStep: (state) => {
      state.currentStep = state.currentStep <= 0 ? state.currentStep : state.currentStep - 1;
    },
  },
});

export const { updateForm, resetForm } = injectRegistrationSlice.actions;
export const { setSteps, incrementStep, decrementStep } = formStepSlice.actions;

export const injectRegistrationFormData = (state: RootState) => state.injectRegistrationForm;
