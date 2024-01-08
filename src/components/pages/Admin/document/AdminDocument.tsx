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
import DocumentFormModel from './DocumentFormModel';
import SearchDocumentForm from './SearchDocumentForm';

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

interface Document {
  id: number;
  title: string;
  file_path: string;
}

const AdminDocument: FC = () => {
  const data: Document[] = [
    {
      id: 1,
      title: 'Tài liệu 1',
      file_path:
        'https://image.similarpng.com/very-thumbnail/2021/07/Logo-design-template-on-transparent-background-PNG.png',
    },
    {
      id: 2,
      title: 'Tài liệu 2',
      file_path:
        'https://image.similarpng.com/very-thumbnail/2021/07/Logo-design-template-on-transparent-background-PNG.png',
    },
    {
      id: 3,
      title: 'Tài liệu 3',
      file_path:
        'https://image.similarpng.com/very-thumbnail/2021/07/Logo-design-template-on-transparent-background-PNG.png',
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<Document>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleShowEditModal = async (id?: number) => {
    if (id) {
      console.log('GET: ', id);

      const resData = {
        id: 3,
        title: 'Tài liệu x',
        file_path:
          'https://image.similarpng.com/very-thumbnail/2021/07/Logo-design-template-on-transparent-background-PNG.png',
      };
      setEditingId(resData);
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditingId(undefined);
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
          <SearchDocumentForm />
          <Button variant="outlined" onClick={() => handleShowEditModal()}>
            Thêm mới
          </Button>
        </Stack>
      </div>
      <div className="w-full h-full flex justify-center my-6 lg:my-none">
        <TableContainer>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell size="small">STT</TableCell>
                <TableCell align="center">Tên tài liệu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={() => handleShowEditModal(row.id)}>{row.title}</Button>
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
        <DocumentFormModel
          open={openModal}
          modelData={editingId}
          handleClose={handleCloseModal}
          handleSubmitted={handleReloadData}
        />
      )}
    </Box>
  );
};

export default AdminDocument;
