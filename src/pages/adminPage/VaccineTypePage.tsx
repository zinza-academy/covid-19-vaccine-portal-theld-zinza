import { Box, Container } from '@mui/material';
import AdminVaccineType from '../../components/pages/Admin/vaccineType/AdminVaccineType';

const AdminVaccineTypePage = () => {
  return (
    <Box minHeight="calc(100vh - 68px)">
      <Container maxWidth="xl">
        <AdminVaccineType />
      </Container>
    </Box>
  );
};

export default AdminVaccineTypePage;
