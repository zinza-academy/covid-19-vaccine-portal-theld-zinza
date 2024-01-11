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
  Typography,
  tableCellClasses,
} from '@mui/material';
import styled from '@emotion/styled';
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import VaccinationPlaceModal from './VaccinationPlaceModal';
import SearchPlaceForm from './SearchPlaceForm';
import usePlaceApi from '../../../../hooks/UsePlace';

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

export interface VaccinationPlace {
  id: number;
  name: string;
  address: string;
  managerName: string;
  tableAvailable: number;
}

interface ListPagination {
  total: number;
  items: VaccinationPlace[];
}

export interface SearchFormData {
  name?: string;
  address?: string;
}

const AdminVaccinationPlace: FC = () => {
  const [data, setData] = useState<ListPagination>();
  const [openModal, setOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState<VaccinationPlace>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const usePlace = usePlaceApi();

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

    const list = await usePlace.search.mutateAsync(payload);
    setData(list);
  };

  useEffect(() => {
    handleSearch();
  }, [page, rowsPerPage]);

  const handleShowEditModal = (item?: VaccinationPlace) => {
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
          <SearchPlaceForm handleSearch={handleSearch} />
          <Button variant="outlined" onClick={() => handleShowEditModal()}>
            Thêm mới
          </Button>
        </Stack>
        {(searchName || searchAddress) && (
          <Typography variant="body2">
            Hiển thị kết quả cho: <br />
            Tên điểm tiêm: <b>{searchName}</b>
            <br />
            Địa chỉ: <b>{searchAddress}</b>
          </Typography>
        )}
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
              {data?.items?.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {page * rowsPerPage + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={() => handleShowEditModal(row)}>{row.name}</Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.address}</StyledTableCell>
                  <StyledTableCell align="center">{row.managerName}</StyledTableCell>
                  <StyledTableCell align="center">{row.tableAvailable}</StyledTableCell>
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
