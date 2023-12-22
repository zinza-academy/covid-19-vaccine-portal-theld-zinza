import { Box, Container } from '@mui/material';
import AdminVaccinationPlace from '../../components/pages/Admin/vaccinePlace/AdminVaccinationPlace';

const AdminVaccinationPlacePage = () => {
  return (
    <Box minHeight="calc(100vh - 68px)">
      <Container maxWidth="xl">
        <AdminVaccinationPlace />
      </Container>
    </Box>
  );
};

export default AdminVaccinationPlacePage;
