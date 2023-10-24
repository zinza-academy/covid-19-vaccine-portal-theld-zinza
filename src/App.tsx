import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './pages/authPage/Layout';
import LoginPage from './pages/authPage/Login';

function App() {
  return (
    <BrowserRouter>
      <AuthLayout>
        <Routes>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </AuthLayout>
    </BrowserRouter>
  );
}

export default App;
