import {
  Box,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from '@mui/material';
import { FC } from 'react';
import logo2 from '../../assets/img/logo2.png';
import qrCode from '../../assets/img/qr-code.png';
import { Person, DateRange, FeaturedVideo } from '@mui/icons-material';
import styled from '@emotion/styled';

interface vaccinationRecord {
  id: number;
  index: number;
  injectionTime: string;
  vaccineType: string;
  batchNumber: string;
  place: string;
}

interface dataProp {
  name: string;
  birthday: string;
  person_id: string;
  insurance_number: string;
  conclusion: string;
  address: string;
  vaccinationRecords: vaccinationRecord[];
}

interface DetailItemProp {
  title: string;
  value: string | number;
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DetailItem: FC<DetailItemProp> = ({ title, value }) => {
  return (
    <div className="block">
      <p>{title}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
};

const VaccineCertificate: FC = () => {
  const data: dataProp = {
    name: 'Nguyễn Văn A',
    birthday: '12/12/1990',
    person_id: '123123123123',
    insurance_number: '123321123321',
    conclusion: 'Đã được tiêm phòng vắc xin phòng bệnh Covid-19    ',
    address: 'Phường Giang Biên - Quận Long Biên - Thành phố Hà Nội',
    vaccinationRecords: [
      {
        id: 1,
        index: 1,
        injectionTime: '2022-12-12 19:00:00',
        vaccineType: 'COVID-19 Vaccine AstraZeneca',
        batchNumber: 'NJ0342',
        place: 'TYT Dịch Vọng Hậu',
      },
      {
        id: 2,
        index: 2,
        injectionTime: '2022-12-12 19:00:00',
        vaccineType: 'COVID-19 Vaccine AstraZeneca',
        batchNumber: 'NJ0342',
        place: 'TYT Dịch Vọng Hậu',
      },
    ],
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 68px)',
      }}>
      <Container maxWidth="xl">
        <div className="block lg:flex">
          <div className="w-full lg:w-9/12">
            <div>
              <Typography
                variant="body1"
                align="center"
                sx={{
                  fontWeight: 'regular',
                }}>
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </Typography>
              <Typography
                variant="body1"
                align="center"
                sx={{
                  fontWeight: 'medium',
                }}>
                Độc lập - Tự do - Hạnh phúc
              </Typography>
              <Typography
                variant="h5"
                align="center"
                sx={{
                  fontWeight: 'medium',
                  fontSize: 24,
                  marginY: '24px',
                }}>
                CHỨNG NHẬN TIÊM CHỦNG COVID-19
              </Typography>
            </div>
            <Stack spacing={2}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DetailItem title="Họ và tên" value={data.name} />
                <DetailItem title="Ngày sinh" value={data.birthday} />
                <DetailItem title="Số CMND/CCCD" value={data.person_id} />
                <DetailItem title="Số thẻ BHYT" value={data.insurance_number} />
              </div>
              <DetailItem title="Địa chỉ" value={data.address} />
              <DetailItem title="Kết luận" value={data.conclusion} />
            </Stack>
            <TableContainer>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell>Mũi số</TableCell>
                    <TableCell align="center">Thời gian tiêm</TableCell>
                    <TableCell align="center">Tên vắc xin</TableCell>
                    <TableCell align="center">Số lô</TableCell>
                    <TableCell align="center">Nơi tiêm</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.vaccinationRecords.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.index}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.injectionTime}</StyledTableCell>
                      <StyledTableCell align="center">{row.vaccineType}</StyledTableCell>
                      <StyledTableCell align="center">{row.batchNumber}</StyledTableCell>
                      <StyledTableCell align="center">{row.place}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="w-full h-full flex lg:w-3/12 justify-center my-6 lg:my-none">
            <div
              className={`${
                data.vaccinationRecords.length >= 2 ? 'bg-green-600' : 'bg-yellow-500'
              } bg-green-600 p-6 rounded-lg rounded-bl-none`}>
              <Stack spacing={2}>
                <img src={logo2} width={100} alt="logo" className="place-self-center" />
                <Typography
                  variant="h5"
                  align="center"
                  sx={{
                    fontWeight: 'medium',
                    fontSize: 24,
                    marginY: '24px',
                    color: 'white',
                  }}>
                  ĐÃ TIÊM {data.vaccinationRecords.length} MŨI VẮC XIN
                </Typography>
                <img src={qrCode} width={196} alt="logo" className="place-self-center" />
                <div className="bg-white rounded-lg rounded-bl-none p-4">
                  <div className="flex gap-2">
                    <Person />
                    <DetailItem title="Họ và tên" value={data.name} />
                  </div>
                  <div className="flex gap-2 my-4">
                    <DateRange />
                    <DetailItem title="Ngày sinh" value={data.birthday} />
                  </div>
                  <div className="flex gap-2">
                    <FeaturedVideo />
                    <DetailItem title="Số CMND/CCCD" value={data.person_id} />
                  </div>
                </div>
              </Stack>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default VaccineCertificate;
