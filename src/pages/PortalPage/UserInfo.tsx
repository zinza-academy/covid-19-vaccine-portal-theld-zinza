import { Box, Container } from '@mui/material';
import { FC } from 'react';
import UserInfoForm from '../../components/pages/userInfo/InfoForm';
import ChangePasswordForm from '../../components/pages/userInfo/ChangePasswordForm';

const UserInfo: FC = () => {
  return (
    <Box minHeight="calc(100vh - 68px)">
      <Container maxWidth="xl">
        <UserInfoForm />
        <ChangePasswordForm />
      </Container>
    </Box>
  );
};

export default UserInfo;
