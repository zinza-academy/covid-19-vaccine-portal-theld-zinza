import { Outlet } from 'react-router-dom';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import { Box } from '@mui/material';

const DefaultLayout: React.FC = () => {
  return (
    <Box>
      <Header />
      <div className="min-h-[100vh]">
        <Outlet />
      </div>
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
