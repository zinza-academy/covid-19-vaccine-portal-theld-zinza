import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useAppDispatch } from '../../../store/hooks';
import { decrementStep } from '../../../store/slices/injectRegistrationSlice';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  handleNextStep?: () => void;
  disabledNext?: boolean;
  loading?: boolean;
}

const BackBtn = styled(LoadingButton)`
  padding: 6px 16px;
  background: white;
  margin-right: 16px;
  color: #303f9f;
  font-weight: 700;
  font-size: 16px;
  border-radius: 8px 8px 8px 0;
  border: 1px solid #303f9f;
  cursor: pointer;
  text-align: center;
`;

const LoadingBtn = styled(LoadingButton)`
  background: #303f9f;
  padding: 6px 16px;
  color: white;
  line-height: unset;
  font-weight: 700;
  font-size: 16px;
  border-radius: 8px 8px 8px 0;
  cursor: pointer;
  &:hover {
    background-color: #303f9f;
  }
  .MuiLoadingButton-loadingIndicator {
    color: white;
  }
`;

const NavigationButton: FC<Props> = ({ handleNextStep, disabledNext, loading }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector((state: RootState) => state.formStepState.currentStep);
  const steps = useSelector((state: RootState) => state.formStepState.steps);

  const handleBackStep = () => {
    if (currentStep === 0) {
      navigate('/');
    }

    dispatch(decrementStep());
  };

  return (
    <div className="m-auto flex justify-center mt-6 mb-6">
      <BackBtn onClick={handleBackStep} startIcon={<ArrowBackIcon />}>
        {currentStep === 0 ? 'HỦY BỎ' : 'QUAY LẠI'}
      </BackBtn>
      <LoadingBtn
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        onClick={handleNextStep}
        type="submit"
        loading={loading}
        disabled={disabledNext}>
        {currentStep === steps.length - 1 ? 'XUẤT THÔNG TIN' : 'TIẾP TỤC'}
      </LoadingBtn>
    </div>
  );
};

export default NavigationButton;
