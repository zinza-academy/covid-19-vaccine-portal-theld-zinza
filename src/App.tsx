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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/injection-register" element={<InjectRegistration />} />

          <Route path="" element={<PortalLayout />}>
            <Route path="/vaccine-certificate" element={<VaccineCertificate />} />
            <Route path="/vaccine-registrations" element={<VaccineRegistrations />} />
            <Route path="/user-info" element={<UserInfo />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
