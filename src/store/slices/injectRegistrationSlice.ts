import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { injectRegistrationSteps } from '../../utils/constants/constants';
import { RootState } from '../store';
import { AuthEntity } from './authSlice';

export interface FormData {
  priority: number;
  insuranceCode?: string;
  job?: string | undefined;
  workplace?: string;
  address?: string;
  injectionDate: string;
  injectionPhase: number;
}

export interface ResultData {
  id: number | string;
  userId: number | string;
  job: string;
  workplace: string;
  address: string;
  insuranceCode: string;
  injectionDate: string;
  injectionPhase: number | string;
  user: AuthEntity;
}

export interface formStepData {
  steps: string[];
  currentStep: number;
}

const formState: FormData = {
  priority: -1,
  insuranceCode: '',
  job: '',
  workplace: '',
  address: '',
  injectionDate: '',
  injectionPhase: -1,
};

const resultState: ResultData = {
  id: '',
  userId: '',
  job: '',
  workplace: '',
  address: '',
  insuranceCode: '',
  injectionDate: '',
  injectionPhase: '',
  user: {},
};

const formStep: formStepData = {
  steps: injectRegistrationSteps,
  currentStep: 0,
};

const initialState = {
  formData: formState,
  resultData: resultState,
  step: formStep,
};

export const injectRegistrationSlice = createSlice({
  name: 'injectRegistrationForm',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<FormData>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetForm: (state) => {
      state.formData = { ...formState };
    },
    updateResult: (state, action: PayloadAction<ResultData>) => {
      state.resultData = { ...state.resultData, ...action.payload };
    },
    resetResult: (state) => {
      state.resultData = { ...resultState };
    },
    setSteps: (state, action: PayloadAction<string[]>) => {
      state.step.steps = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.step.currentStep = action.payload;
    },
    incrementStep: (state) => {
      state.step.currentStep =
        state.step.currentStep == state.step.steps.length - 1
          ? state.step.currentStep
          : state.step.currentStep + 1;
    },
    decrementStep: (state) => {
      state.step.currentStep =
        state.step.currentStep <= 0 ? state.step.currentStep : state.step.currentStep - 1;
    },
  },
});

export const {
  updateForm,
  resetForm,
  updateResult,
  resetResult,
  setSteps,
  setCurrentStep,
  incrementStep,
  decrementStep,
} = injectRegistrationSlice.actions;

export const injectRegistrationFormData = (state: RootState) =>
  state.injectRegistrationForm.formData;
export const injectRegistrationResult = (state: RootState) =>
  state.injectRegistrationForm.resultData;
export const formStepState = (state: RootState) => state.injectRegistrationForm.step;
