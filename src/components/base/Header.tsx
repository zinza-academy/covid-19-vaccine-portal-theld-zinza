import {
  AppBar,
  Container,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import LogoImage from '../../assets/img/Logo.png';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { PeopleAlt, KeyboardArrowDown, ArrowForward } from '@mui/icons-material';
import { useAppSelector } from '../../store';
import { logoutAuthUser, selectAuthData } from '../../store/slices/authSlice';
import useAuthApi from '../../hooks/UseAuth';
import { useDispatch } from 'react-redux';
import { role } from '../../utils/constants/constants';

interface Props {
  label?: string;
  required?: boolean;
  htmlFor?: string;
}

const LoginBtn = styled(Link)`
  background: white;
  color: #303f9f;
  font-weight: 700;
  padding: 5px 22px;
  border-radius: 8px 8px 8px 0;
  border: 1px solid white;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: White;
    background-color: transparent;
  }
`;

const Header: FC<Props> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);
  const openUser = Boolean(anchorUser);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUser(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorUser(null);
  };

  const userData = useAppSelector(selectAuthData);
  const useAuth = useAuthApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isloggedIn = !!userData.id;
  const isAdmin = userData.role == role.admin;

  const handleLogout = async () => {
    handleClose();
    await useAuth.logout.mutateAsync();

    dispatch(logoutAuthUser());
    navigate('/');
  };

  return (
    <div className="mb-20">
      <AppBar
        component="nav"
        sx={{
          background: 'linear-gradient(90deg, #ED1B23 0%, #2E3091 50%, #253494 100%, #253494 100%)',
        }}>
        <Container maxWidth="xl">
          <Toolbar>
            <img src={LogoImage} alt="Logo" width={42} height={50} className="mr-4" />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              CỔNG THÔNG TIN TIÊM CHỦNG COVID-19
            </Typography>
            <List>
              <ListItem disablePadding sx={{ minHeight: 52 }}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link to="/">Trang chủ</Link>
                </ListItemButton>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link to="/injection-register">Đăng ký tiêm</Link>
                </ListItemButton>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Typography onClick={handleClick}>
                    Tra cứu
                    <KeyboardArrowDown />
                  </Typography>
                </ListItemButton>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link to="/documents">Tài liệu</Link>
                </ListItemButton>
                {isloggedIn && (
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <Typography onClick={handleUserClick}>
                      <b>{`${userData.fullName} ${isAdmin ? '(admin)' : ''}`}</b>
                      <KeyboardArrowDown />
                    </Typography>
                  </ListItemButton>
                )}
                {!isloggedIn && (
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <LoginBtn to="/auth/login">Đăng nhập</LoginBtn>
                  </ListItemButton>
                )}
              </ListItem>
            </List>
          </Toolbar>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}>
            <Link to="/vaccine-certificate">
              <MenuItem onClick={handleClose}>
                <div className="bg-purple-100 rounded-lg p-2">
                  <PeopleAlt className="text-purple-900" />
                </div>
                <div className="block mx-4">
                  <Typography variant="body1" component="h2">
                    Tra cứu chứng nhận tiêm
                  </Typography>
                  <Typography variant="body2">Cập nhật nhanh và chính xác nhất</Typography>
                </div>
                <ArrowForward className="text-purple-900" />
              </MenuItem>
            </Link>
            <Link to="/vaccine-registrations">
              <MenuItem onClick={handleClose}>
                <div className="bg-blue-100 rounded-lg p-2">
                  <PeopleAlt className="text-blue-600" />
                </div>
                <div className="block mx-4">
                  <Typography variant="body1">Tra cứu kết quả đăng ký</Typography>
                  <Typography variant="body2">Cập nhật nhanh và chính xác nhất</Typography>
                </div>
                <ArrowForward className="text-blue-600" />
              </MenuItem>
            </Link>
          </Menu>
          <Menu
            id="user-menu"
            anchorEl={anchorUser}
            open={openUser}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            {isAdmin && (
              <MenuItem onClick={handleClose}>
                <Link to="/admin/vaccine-registrations">Trang quản trị</Link>
              </MenuItem>
            )}
            <MenuItem onClick={handleClose}>
              <Link to="/user-info">Tài khoản của tôi</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
