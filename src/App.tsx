import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/authPage/Login';
import ForgotPasswordPage from './pages/authPage/ForgotPassword';
import RegisterPage from './pages/authPage/Register';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage/Home';
import InjectRegistration from './pages/injectRegistraionPage/InjectRegistration';
import VaccineCertificate from './pages/PortalPage/VaccineCertificate';
import PortalLayout from './layouts/PortalLayout';
import VaccineRegistrations from './pages/PortalPage/VaccineRegistrations';
import UserInfo from './pages/PortalPage/UserInfo';
import AdminLayout from './layouts/AdminLayout';
import AdminVaccinationPlacePage from './pages/adminPage/VaccinationPlacePage';
import VaccineRegistrationPage from './pages/adminPage/VaccineRegistrationPage';
import DocumentPage from './pages/adminPage/DocumentPage';
import ListDocument from './pages/PortalPage/ListDocumentPage';
import { AdminGuard, AuthGuard, NotAuthGuard } from './utils/routeGuard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import api from './hooks/api';
import { useDispatch } from 'react-redux';
import { loginAuthUser } from './store/slices/authSlice';
import { getCookie } from 'cookies-next';

function App() {
  const queryClient = new QueryClient();
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGetInfo = async () => {
      if (!getCookie('access_token')) {
        return setInitialized(true);
      }

      await api
        .get('/auth/info')
        .then((res) => {
          const data = res.data?.data;

          if (data) {
            dispatch(loginAuthUser(data));
          }

          setInitialized(true);
        })
        .catch(() => {
          setInitialized(true);
        });
    };

    fetchGetInfo();
  }, []);

  initialized;

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="auth" element={NotAuthGuard(<AuthLayout />)}>
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/injection-register" element={AuthGuard(<InjectRegistration />)} />
            <Route path="/documents" element={AuthGuard(<ListDocument />)} />

            <Route path="" element={AuthGuard(<PortalLayout />)}>
              <Route path="/vaccine-certificate" element={<VaccineCertificate />} />
              <Route path="/vaccine-registrations" element={<VaccineRegistrations />} />
              <Route path="/user-info" element={<UserInfo />} />
            </Route>

            <Route path="/admin" element={AdminGuard(<AdminLayout />)}>
              <Route path="/admin/vaccination-places" element={<AdminVaccinationPlacePage />} />
              <Route path="/admin/vaccine-registrations" element={<VaccineRegistrationPage />} />
              <Route path="/admin/documents" element={<DocumentPage />} />
            </Route>
          </Route>
        </Routes>
      </QueryClientProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
