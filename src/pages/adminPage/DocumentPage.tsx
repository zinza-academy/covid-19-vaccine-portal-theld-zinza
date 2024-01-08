import { Box, Container } from '@mui/material';
import AdminDocument from '../../components/pages/Admin/document/AdminDocument';

const DocumentPage = () => {
  return (
    <Box minHeight="calc(100vh - 68px)">
      <Container maxWidth="xl">
        <AdminDocument />
      </Container>
    </Box>
  );
};

export default DocumentPage;
