import {
  Box,
  Button,
  Stack,
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
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import VaccinationPlaceModal from './VaccinationPlaceModal';
import SearchPlaceForm from './SearchPlaceForm';

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

interface VaccinationPlace {
  id: number;
  name: string;
  address: string;
  manager_name: string;
  table_number: number;
}

const AdminVaccinationPlace: FC = () => {
  const data: VaccinationPlace[] = [
    {
      id: 1,
      name: 'Bệnh viện Đa khoa Medlatec',
      address: '42-44 Nghĩa Dũng',
      manager_name: 'Nguyễn Thị Kim Liên',
      table_number: 12,
    },
    {
      id: 2,
      name: 'Bệnh viện Đa khoa Medlatec',
      address: '42 Dũng Nghĩa',
      manager_name: 'Nguyễn Thị Kim',
      table_number: 9,
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState<VaccinationPlace>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleShowEditModal = (item?: VaccinationPlace) => {
    setEditingItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditingItem(undefined);
    setOpenModal(false);
  };

  const handleReloadData = () => {
    console.log('UPDATED');
    handleCloseModal();
  };

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
      <div className="mt-6">
        <Stack justifyContent="space-between" direction="row">
          <SearchPlaceForm />
          <Button variant="outlined" onClick={() => handleShowEditModal()}>
            Thêm mới
          </Button>
        </Stack>
      </div>
      <div className="w-full h-full flex justify-center my-6 lg:my-none">
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="center">Tên điểm tiêm</TableCell>
                <TableCell align="center">Địa chỉ</TableCell>
                <TableCell align="center">Người đứng đầu cơ sở tiêm chủng</TableCell>
                <TableCell align="center">Số bàn tiêm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={() => handleShowEditModal(row)}>{row.name}</Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.address}</StyledTableCell>
                  <StyledTableCell align="center">{row.manager_name}</StyledTableCell>
                  <StyledTableCell align="center">{row.table_number}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
      {openModal && (
        <VaccinationPlaceModal
          open={openModal}
          modelData={editingItem}
          handleClose={handleCloseModal}
          handleSubmitted={handleReloadData}
        />
      )}
    </Box>
  );
};

export default AdminVaccinationPlace;
