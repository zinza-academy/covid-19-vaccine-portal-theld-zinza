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
import { FC, useEffect, useState } from 'react';
import logo2 from '../../assets/img/logo2.png';
import qrCode from '../../assets/img/qr-code.png';
import { Person, DateRange, FeaturedVideo } from '@mui/icons-material';
import styled from '@emotion/styled';
import useRegistrationApi, { RegistrationItem } from '../../hooks/useRegistration';
import { AuthEntity } from '../../store/slices/authSlice';
import { injectStatus } from '../../utils/constants/constants';
import usePlaceApi from '../../hooks/UsePlace';
import { VaccinationPlace } from '../../components/pages/Admin/vaccinePlace/AdminVaccinationPlace';
import { getLabelByValue } from '../../utils/helper';

interface DetailItemProp {
  title: string;
  value?: string | number;
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
  const [data, setData] = useState<AuthEntity>();
  const useRegistration = useRegistrationApi();
  const [vaccinePlaces, setVaccinePlaces] = useState<VaccinationPlace[]>([]);
  const usePlace = usePlaceApi();

  const handleGetCertificate = async () => {
    const result = await useRegistration.getCertificate.mutateAsync();
    setData(result);
  };

  const getAllPlace = async () => {
    const result = await usePlace.getAll();
    setVaccinePlaces(result);
  };

  useEffect(() => {
    handleGetCertificate();
    getAllPlace();
  }, []);

  const listPlaces = vaccinePlaces.map((place) => {
    return { label: place.name, value: place.id };
  });

  const listInjected = data?.registrations?.filter((item) => item.status === injectStatus.done);

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
                <DetailItem title="Họ và tên" value={data?.fullName} />
                <DetailItem title="Ngày sinh" value={data?.birthday} />
                <DetailItem title="Số CMND/CCCD" value={data?.citizenCode} />
                <DetailItem
                  title="Số thẻ BHYT"
                  value={listInjected?.[listInjected?.length - 1]?.insuranceCode}
                />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DetailItem title="Tỉnh/Thành phố" value={data?.ward?.district?.province?.name} />
                <DetailItem title="Quận/Huyện" value={data?.ward?.district?.name} />
                <DetailItem title="Xã/Phường" value={data?.ward?.name} />
              </div>

              <DetailItem
                title="Kết luận"
                value={listInjected?.length ? 'Đã tiêm chủng' : 'Chưa tiêm chủng'}
              />
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
                  {listInjected?.map((row: RegistrationItem, index) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.injectedDate}</StyledTableCell>
                      <StyledTableCell align="center">{row.vaccineType?.name}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.vaccineType?.batchNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {getLabelByValue(row.vaccinationPlaceId, listPlaces)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="w-full h-full flex lg:w-3/12 justify-center my-6 lg:my-none">
            <div
              className={`${
                listInjected && listInjected?.length >= 2 ? 'bg-green-600' : 'bg-yellow-500'
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
                  ĐÃ TIÊM {listInjected?.length} MŨI VẮC XIN
                </Typography>
                <img src={qrCode} width={196} alt="logo" className="place-self-center" />
                <div className="bg-white rounded-lg rounded-bl-none p-4">
                  <div className="flex gap-2">
                    <Person />
                    <DetailItem title="Họ và tên" value={data?.fullName} />
                  </div>
                  <div className="flex gap-2 my-4">
                    <DateRange />
                    <DetailItem title="Ngày sinh" value={data?.birthday} />
                  </div>
                  <div className="flex gap-2">
                    <FeaturedVideo />
                    <DetailItem title="Số CMND/CCCD" value={data?.citizenCode} />
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
