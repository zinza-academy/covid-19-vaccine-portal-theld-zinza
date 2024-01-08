import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import AdminNavigation from '../components/pages/Admin/AdminNavigation';

const AdminLayout: React.FC = () => {
  return (
    <Box>
      <Container maxWidth="xl">
        <AdminNavigation />
      </Container>
      <hr className="mb-8" />
      <Outlet />
    </Box>
  );
};

export default AdminLayout;
