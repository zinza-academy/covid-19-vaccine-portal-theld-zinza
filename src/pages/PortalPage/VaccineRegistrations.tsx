import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  tableCellClasses,
} from '@mui/material';
import styled from '@emotion/styled';
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { getLabelByValue } from '../../utils/helper';
import { dayPhases } from '../../utils/constants/constants';
import useRegistrationApi from '../../hooks/useRegistration';
import {
  Status,
  VaccineRegistration,
} from '../../components/pages/Admin/vaccineRegistration/AdminVaccineRegistration';
import { SearchFormData } from '../../components/pages/Admin/vaccinePlace/AdminVaccinationPlace';

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

interface ListPagination {
  total: number;
  items: VaccineRegistration[];
}

const VaccineRegistrations: FC = () => {
  const [data, setData] = useState<ListPagination>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const useRegistration = useRegistrationApi();

  const handleSearch = async (searchData?: SearchFormData) => {
    const payload = {
      page: page,
      limit: rowsPerPage,
      name: searchName,
      address: searchAddress,
    };

    if (searchData) {
      setPage(0);
      setSearchName(searchData.name || '');
      setSearchAddress(searchData.address || '');

      payload.page = 0;
      payload.name = searchData.name || '';
      payload.address = searchData.address || '';
    }

    const list = await useRegistration.searchForUser.mutateAsync(payload);
    setData(list);
  };

  useEffect(() => {
    handleSearch();
  }, [page, rowsPerPage]);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
                  <TableCell align="center">Số CMND/CCCD/Mã định danh công dân</TableCell>
                  <TableCell align="center">Ngày tiêm mong muốn</TableCell>
                  <TableCell align="center">Buổi tiêm mong muốn</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.items?.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {page * rowsPerPage + index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.user.fullName}</StyledTableCell>
                    <StyledTableCell align="center">{row.user.citizenCode}</StyledTableCell>
                    <StyledTableCell align="center">{row.injectionDate}</StyledTableCell>
                    <StyledTableCell align="center">
                      {getLabelByValue(row.injectionPhase, dayPhases)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Status value={row.status} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={data?.total || 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </Container>
    </Box>
  );
};

export default VaccineRegistrations;
