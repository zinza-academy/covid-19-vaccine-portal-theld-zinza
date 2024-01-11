import { Box, Container, Typography } from '@mui/material';
import StepBar from '../../components/pages/injectRegistraion/StepBar';
import RegisterStepOne from '../../components/pages/injectRegistraion/RegisterStepOne';
import RegisterStepTwo from '../../components/pages/injectRegistraion/RegisterStepTwo';
import RegisterStepThree from '../../components/pages/injectRegistraion/RegisterStepThree';
import { useSelector } from 'react-redux';
import { injectRegistrationSteps } from '../../utils/constants/constants';
import { formStepState } from '../../store/slices/injectRegistrationSlice';

function InjectRegistration() {
  const { currentStep } = useSelector(formStepState);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 68px)',
      }}>
      <div className="bg-[#F5F5F5]">
        <Container maxWidth="xl" className="p-4">
          <Typography variant="h5">Tra cứu đăng ký tiêm</Typography>
        </Container>
      </div>
      <Container maxWidth="xl">
        <StepBar steps={injectRegistrationSteps} currentStep={currentStep} />
        {currentStep === 0 && <RegisterStepOne />}
        {currentStep === 1 && <RegisterStepTwo />}
        {currentStep === 2 && <RegisterStepThree />}
      </Container>
    </Box>
  );
}

export default InjectRegistration;
