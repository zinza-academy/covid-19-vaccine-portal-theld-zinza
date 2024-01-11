import { useSearchParams } from 'react-router-dom';
import ForgotPasswordForm from '../../components/pages/auth/ForgotPasswordForm';
import { Box } from '@mui/material';
import ChangePasswordForm from '../../components/pages/auth/ChangePasswordForm';

function ForgotPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <Box>
      {!token && <ForgotPasswordForm />}
      {token && <ChangePasswordForm />}
    </Box>
  );
}

export default ForgotPasswordPage;
