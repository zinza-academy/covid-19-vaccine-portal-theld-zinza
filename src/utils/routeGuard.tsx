import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import { selectAuthData } from '../store/slices/authSlice';
import { role } from './constants/constants';

export function AuthGuard(element: React.ReactNode) {
  const userData = useAppSelector(selectAuthData);

  if (!userData.id) {
    return <Navigate to="/" />;
  }

  return element;
}

export function NotAuthGuard(element: React.ReactNode) {
  const userData = useAppSelector(selectAuthData);

  if (userData.id) {
    return <Navigate to="/" />;
  }

  return element;
}

export function AdminGuard(element: React.ReactNode) {
  const userData = useAppSelector(selectAuthData);

  if (!userData.id) {
    return <Navigate to="/" />;
  }

  if (userData.role != role.admin) {
    return <Navigate to="/" />;
  }

  return element;
}
