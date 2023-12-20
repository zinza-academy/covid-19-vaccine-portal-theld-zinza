import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import PortalNavigation from '../components/pages/Portal/PortalNavigation';

const PortalLayout: React.FC = () => {
  return (
    <Box>
      <Container maxWidth="xl">
        <PortalNavigation />
      </Container>
      <hr className="mb-8" />
      <Outlet />
    </Box>
  );
};

export default PortalLayout;
