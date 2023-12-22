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
import { Link } from 'react-router-dom';

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

const ListDocument: FC = () => {
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
    <Box
      sx={{
        minHeight: 'calc(100vh - 68px)',
      }}>
      <div className="w-full h-full flex justify-center my-6 lg:my-none">
        <TableContainer>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell size="small">STT</TableCell>
                <TableCell align="center">Tên tài liệu</TableCell>
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.title}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Link download={true} to={row.file_path}>
                      <Button variant="outlined">Download</Button>
                    </Link>
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
    </Box>
  );
};

export default ListDocument;
