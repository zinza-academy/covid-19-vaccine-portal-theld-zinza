import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from '@mui/material';
import styled from '@emotion/styled';
import { FC } from 'react';
import { ConvertGenderText } from '../../utils/helper';

interface vaccinationRecord {
  id: number;
  name: string;
  birthday: string;
  gender: number;
  person_id: string;
  status: number;
}

interface statusValueProp {
  value: number;
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

const Status: FC<statusValueProp> = ({ value }) => {
  return (
    <div className="font-bold leading-6">
      {value === 0 && (
        <p className="bg-red-100 border rounded-lg border-red-600">Đăng ký thất bại</p>
      )}
      {value === 1 && (
        <p className="bg-blue-100 border rounded-lg border-blue-600">Đăng ký thành công</p>
      )}
    </div>
  );
};

const VaccineRegistrations: FC = () => {
  const data: vaccinationRecord[] = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      birthday: '2022-12-12',
      gender: 1,
      person_id: '123123123123',
      status: 1,
    },
    {
      id: 2,
      name: 'Nguyễn Văn A',
      birthday: '2022-12-13',
      gender: 1,
      person_id: '123123123123',
      status: 0,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 68px)',
      }}>
      <Container maxWidth="xl">
        <div className="w-full h-full flex justify-center my-6 lg:my-none">
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell align="center">Họ và tên</TableCell>
                  <TableCell align="center">Ngày sinh</TableCell>
                  <TableCell align="center">Giới tính</TableCell>
                  <TableCell align="center">Số CMND/CCCD/Mã định danh công dân</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.birthday}</StyledTableCell>
                    <StyledTableCell align="center">
                      {ConvertGenderText(row.gender)}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.person_id}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Status value={row.status} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </Box>
  );
};

export default VaccineRegistrations;
