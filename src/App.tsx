import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/authPage/Login';
import ForgotPasswordPage from './pages/authPage/ForgotPassword';
import RegisterPage from './pages/authPage/Register';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage/Home';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
