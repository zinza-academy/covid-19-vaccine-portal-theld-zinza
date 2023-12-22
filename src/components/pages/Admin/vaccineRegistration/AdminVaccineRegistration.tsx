import {
  Box,
  Button,
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
import { ConvertGenderText } from '../../../../utils/helper';
import SearchRegistrationForm from './SearchRegistrationForm';
import VaccineRegistrationModal from './VaccineRegistrationModal';

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

type statusValueProp = {
  value: number;
};

const Status: FC<statusValueProp> = ({ value }) => {
  return (
    <div className="font-bold leading-6">
      {value === 0 && (
        <p className="bg-yellow-100 border rounded-lg border-yellow-600">Chưa xử lý</p>
      )}
      {value === 1 && <p className="bg-blue-100 border rounded-lg border-blue-600">Chấp thuận</p>}
      {value === 2 && <p className="bg-red-100 border rounded-lg border-red-600">Từ chối</p>}
    </div>
  );
};

interface VaccineRegistration {
  id: number;
  name: string;
  birthday: string;
  gender: number;
  person_id: string;
  status: number;
}

const AdminVaccineRegistration: FC = () => {
  const data: VaccineRegistration[] = [
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
    {
      id: 3,
      name: 'Nguyễn Văn A',
      birthday: '2022-12-12',
      gender: 1,
      person_id: '123123123123',
      status: 2,
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState<VaccineRegistration>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleShowEditModal = (item?: VaccineRegistration) => {
    editingItem;
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
        <SearchRegistrationForm />
      </div>
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
                  <StyledTableCell align="center">
                    <Button onClick={() => handleShowEditModal(row)}>{row.name}</Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.birthday}</StyledTableCell>
                  <StyledTableCell align="center">{ConvertGenderText(row.gender)}</StyledTableCell>
                  <StyledTableCell align="center">{row.person_id}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Status value={row.status} />
                  </StyledTableCell>
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
        <VaccineRegistrationModal
          open={openModal}
          modelData={editingItem}
          handleClose={handleCloseModal}
          handleSubmitted={handleReloadData}
        />
      )}
    </Box>
  );
};

export default AdminVaccineRegistration;
