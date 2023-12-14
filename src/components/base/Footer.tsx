import styled from '@emotion/styled';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import HandleCertImage from '../../assets/img/handle_cert 1.png';
import LogoBo from '../../assets/img/logo2bo 1.png';

interface Props {
  label?: string;
  required?: boolean;
  htmlFor?: string;
}

const OutlinedButton = styled(Button)`
  color: White;
  background-color: transparent;
  font-weight: 700;
  padding: 5px 22px;
  border-radius: 8px 8px 8px 0;
  border: 1px solid white;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: white;
    color: #303f9f;
  }
`;

const Footer: FC<Props> = () => {
  return (
    <Box
      sx={{
        background: '#2D2188',
      }}>
      <Container maxWidth="xl">
        <div className="flex flex-col md:flex-row w-full py-8">
          <Stack spacing={1} className="w-full text-white">
            <Typography variant="body2">
              © Bản quyền thuộc{' '}
              <Typography
                component="span"
                variant="body2"
                textTransform="uppercase"
                fontWeight={700}>
                TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC GIA
              </Typography>
            </Typography>
            <Typography variant="body2">
              Phát triển bởi{' '}
              <Typography component="span" variant="body2" sx={{ color: '#D32F2F' }}>
                Viettel
              </Typography>
            </Typography>
            <img src={LogoBo} alt="cert" className="max-w-[195px] max-h-[90px]" />
          </Stack>
          <Stack spacing={2} alignItems="end" className="w-full text-white ml-auto">
            <Typography variant="body2">
              Tải sổ sức khỏe điện tử để đăng ký tiêm và nhận giấy chứng nhận tiêm
            </Typography>
            <Stack direction="row" spacing={2}>
              <OutlinedButton>App tiêm di động (Cho HCM)</OutlinedButton>
              <OutlinedButton>App Store</OutlinedButton>
              <OutlinedButton>Google Play</OutlinedButton>
            </Stack>
            <img src={HandleCertImage} alt="cert" className="max-w-[220px] max-h-[100px]" />
          </Stack>
        </div>
      </Container>
    </Box>
  );
};

export default Footer;
