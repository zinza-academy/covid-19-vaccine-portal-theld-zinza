import { useMutation } from '@tanstack/react-query';
import api from './api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginAuthUser } from '../store/slices/authSlice';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ChangePasswordFormData {
  token: string | null;
  password: string;
  rePassword: string;
}

export interface registerFormData {
  citizenCode: string;
  email: string;
  password: string;
  fullName: string;
  birthday: string;
  gender: string;
  wardId: string;
}

const useAuthApi = () => {
  const fetchGetInfo = async () => {
    const dispatch = useDispatch();

    try {
      const res = await api.post('/auth/info');
      const authUser = res.data?.data;
      dispatch(loginAuthUser(authUser));
      return res.data?.data;
    } catch (error) {
      return false;
    }
  };

  const getCurrentUser = useMutation({
    mutationFn: () => {
      return fetchGetInfo();
    },
  });

  const login = useMutation({
    mutationFn: async (payload: LoginFormData) => {
      return await api
        .post('/auth/login', payload)
        .then((res) => {
          return res.data?.data;
        })
        .catch(function (error) {
          toast.error(error.response?.data?.message);
          return false;
        });
    },
  });

  const forgotPassword = useMutation({
    mutationFn: async (payload: ForgotPasswordFormData) => {
      return await api
        .post('/auth/forgot-password', payload)
        .then(() => {
          toast.success('Đã gửi mail thành công!');
          return true;
        })
        .catch(function (error) {
          toast.error(error.response?.data?.message);
          return false;
        });
    },
  });

  const register = useMutation({
    mutationFn: async (payload: registerFormData) => {
      return await api
        .post('/auth/register', {
          ...payload,
          gender: parseInt(payload.gender),
          wardId: parseInt(payload.wardId),
        })
        .then(() => {
          toast.success('Đăng ký thành công!');
          return true;
        })
        .catch(function (error) {
          toast.error(error.response?.data?.message);
          return false;
        });
    },
  });

  const changePassword = useMutation({
    mutationFn: async (payload: ChangePasswordFormData) => {
      return await api
        .put('/auth/forgot-password', payload)
        .then(() => {
          toast.success('Thay đổi mật khẩu thành công!');
          return true;
        })
        .catch(function (error) {
          toast.error(error.response?.data?.message);
          return false;
        });
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      return await api
        .get('/auth/logout')
        .then(() => {
          return true;
        })
        .catch(function () {
          return false;
        });
    },
  });

  return {
    login,
    logout,
    register,
    getCurrentUser,
    forgotPassword,
    changePassword,
    fetchGetInfo,
  };
};

export default useAuthApi;
