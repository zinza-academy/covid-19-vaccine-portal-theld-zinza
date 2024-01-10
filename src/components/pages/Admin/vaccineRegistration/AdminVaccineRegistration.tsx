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
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import SearchRegistrationForm from './SearchRegistrationForm';
import VaccineRegistrationModal from './VaccineRegistrationModal';
import useRegistrationApi from '../../../../hooks/useRegistration';
import { AuthEntity } from '../../../../store/slices/authSlice';
import { getLabelByValue } from '../../../../utils/helper';
import { dayPhases, injectStatus } from '../../../../utils/constants/constants';
import usePlaceApi from '../../../../hooks/UsePlace';
import { VaccinationPlace } from '../vaccinePlace/AdminVaccinationPlace';

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

export const Status: FC<statusValueProp> = ({ value }) => {
  return (
    <div className="font-bold leading-6">
      {value === injectStatus.pending && (
        <p className="bg-yellow-100 border rounded-lg border-yellow-600">Chưa xử lý</p>
      )}
      {value === injectStatus.accept && (
        <p className="bg-blue-100 border rounded-lg border-blue-600">Chấp thuận</p>
      )}
      {value === injectStatus.reject && (
        <p className="bg-red-100 border rounded-lg border-red-600">Từ chối</p>
      )}
      {value === injectStatus.done && (
        <p className="bg-green-100 border rounded-lg border-green-600">Đã tiêm</p>
      )}
    </div>
  );
};

export interface VaccineRegistration {
  id: number;
  userId: number;
  job: string;
  workplace: string;
  address: string;
  injectionDate: string;
  injectionPhase: number;
  vaccinationPlaceId: number;
  vaccineTypeId: number;
  injectedDate: string;
  insuranceCode: string;
  status: number;
  user: AuthEntity;
}

interface ListPagination {
  total: number;
  items: VaccineRegistration[];
}

export interface SearchFormData {
  name?: string;
  address?: string;
}

const AdminVaccineRegistration: FC = () => {
  const [data, setData] = useState<ListPagination>();
  const [openModal, setOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState<VaccineRegistration>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [vaccinePlaces, setVaccinePlaces] = useState<VaccinationPlace[]>([]);
  const useRegistration = useRegistrationApi();
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

    const list = await useRegistration.search.mutateAsync(payload);
    setData(list);
  };

  useEffect(() => {
    handleSearch();
  }, [page, rowsPerPage]);

  const getAllPlace = async () => {
    const result = await usePlace.getAll();
    setVaccinePlaces(result);
  };

  useEffect(() => {
    getAllPlace();
  }, []);

  const handleShowEditModal = (item?: VaccineRegistration) => {
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
        <SearchRegistrationForm handleSearch={handleSearch} />
      </div>
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
                  <StyledTableCell align="center">
                    <Button onClick={() => handleShowEditModal(row)}>{row.user.fullName}</Button>
                  </StyledTableCell>
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
      {openModal && (
        <VaccineRegistrationModal
          open={openModal}
          modelData={editingItem}
          handleClose={handleCloseModal}
          handleSubmitted={handleReloadData}
          vaccinePlaces={vaccinePlaces}
        />
      )}
    </Box>
  );
};

export default AdminVaccineRegistration;
