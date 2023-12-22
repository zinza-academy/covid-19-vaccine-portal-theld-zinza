import { Box, Container } from '@mui/material';
import AdminVaccineRegistration from '../../components/pages/Admin/vaccineRegistration/AdminVaccineRegistration';

const VaccineRegistrationPage = () => {
  return (
    <Box minHeight="calc(100vh - 68px)">
      <Container maxWidth="xl">
        <AdminVaccineRegistration />
      </Container>
    </Box>
  );
};

export default VaccineRegistrationPage;
