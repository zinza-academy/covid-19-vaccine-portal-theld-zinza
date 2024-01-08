import { Paper, TablePagination, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddressSearchForm from './AddressSearchForm';
import { ChangeEvent, MouseEvent, useState } from 'react';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface StatisticalPlaceItem {
  id: number;
  name: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  manager: string;
  tableNumber: string | number;
}

function StaticsPlaceTable() {
  const tableData: StatisticalPlaceItem[] = [
    {
      id: 1,
      name: 'Bệnh viện Đa khoa Medlatec',
      address: '42-44 Nghĩa Dũng',
      ward: 'Phúc Xá',
      district: 'Quận Ba Đình',
      province: 'Thành phố Hà Nội',
      manager: 'Nguyễn Thị Kim Liên',
      tableNumber: 1,
    },
    {
      id: 2,
      name: 'Bệnh viện Đa khoa Medlatec',
      address: '42-44 Nghĩa Dũng',
      ward: 'Phúc Xá',
      district: 'Quận Ba Đình',
      province: 'Thành phố Hà Nội',
      manager: 'Nguyễn Thị Kim Liên',
      tableNumber: 1,
    },
    {
      id: 3,
      name: 'Bệnh viện Đa khoa Medlatec',
      address: '42-44 Nghĩa Dũng',
      ward: 'Phúc Xá',
      district: 'Quận Ba Đình',
      province: 'Thành phố Hà Nội',
      manager: 'Nguyễn Thị Kim Liên',
      tableNumber: 1,
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper elevation={3} className="px-4 py-6 my-10">
      <Typography variant="h6">Tra cứu điểm tiêm theo địa bàn</Typography>
      <AddressSearchForm />
      <hr className="mt-4" />
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="center">Tên điểm tiêm</TableCell>
              <TableCell align="center">Số nhà, tên đường</TableCell>
              <TableCell align="center">Xã/Phường</TableCell>
              <TableCell align="center">Quận/Huyện</TableCell>
              <TableCell align="center">Tỉnh/Thành phố</TableCell>
              <TableCell align="center">Người đứng đầu cơ sở tiêm chủng</TableCell>
              <TableCell align="center">Số bàn tiêm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{row.address}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.ward}</StyledTableCell>
                <StyledTableCell align="center">{row.district}</StyledTableCell>
                <StyledTableCell align="center">{row.province}</StyledTableCell>
                <StyledTableCell align="center">{row.manager}</StyledTableCell>
                <StyledTableCell align="center">{row.tableNumber}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={tableData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
}

export default StaticsPlaceTable;
