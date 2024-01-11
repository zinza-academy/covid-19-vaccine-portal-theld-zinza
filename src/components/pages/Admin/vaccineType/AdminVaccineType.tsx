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
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import VaccineTypeModal from './VaccineTypeModal';
import useTypeApi from '../../../../hooks/UseType';

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

export interface VaccineType {
  id: number;
  name: string;
  batchNumber: string;
}

interface ListPagination {
  total: number;
  items: VaccineType[];
}

export interface SearchFormData {
  name?: string;
  batchNumber?: string;
}

const AdminVaccineType: FC = () => {
  const [data, setData] = useState<ListPagination>();
  const [openModal, setOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState<VaccineType>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const useType = useTypeApi();

  const handleSearch = async () => {
    const list = await useType.search.mutateAsync();
    console.log('🚀 ~ handleSearch ~ list:', list);
    setData(list);
  };

  useEffect(() => {
    handleSearch();
  }, [page, rowsPerPage]);

  const handleShowEditModal = (item?: VaccineType) => {
    setEditingItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditingItem(undefined);
    setOpenModal(false);
  };

  const handleReloadData = () => {
    handleSearch();
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
          <div></div>
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
                <TableCell align="center">Tên Vaccine</TableCell>
                <TableCell align="center">Số lô</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.items?.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {page * rowsPerPage + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={() => handleShowEditModal(row)}>{row.name}</Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.batchNumber}</StyledTableCell>
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
      {openModal && (
        <VaccineTypeModal
          open={openModal}
          modelData={editingItem}
          handleClose={handleCloseModal}
          handleSubmitted={handleReloadData}
        />
      )}
    </Box>
  );
};

export default AdminVaccineType;
