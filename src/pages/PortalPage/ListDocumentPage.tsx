import { Box, Container, Typography } from '@mui/material';
import { FC } from 'react';
import ListDocument from '../../components/pages/Portal/ListDocument';

const ListDocumentPage: FC = () => {
  return (
    <Box minHeight="calc(100vh - 68px)">
      <div className="bg-[#F5F5F5]">
        <Container maxWidth="xl" className="p-4">
          <Typography variant="h5">Tài liệu</Typography>
        </Container>
      </div>
      <Container maxWidth="xl">
        <ListDocument />
      </Container>
    </Box>
  );
};

export default ListDocumentPage;
