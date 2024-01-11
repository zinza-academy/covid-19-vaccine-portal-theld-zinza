import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from './api';

export interface registrationSearchParams {
  page?: number;
  limit?: number;
  name?: string;
  citizenCode?: string;
}

interface UpdateFormData {
  id?: number;
  status: number;
}

const useRegistrationApi = () => {
  const search = useMutation({
    mutationFn: (payload: registrationSearchParams) => {
      return api
        .get('/vaccination-registration/for-admin', { params: payload })
        .then((res) => {
          return res.data?.data;
        })
        .catch(function (error) {
          toast.error(error.response?.data?.message);
          return false;
        });
    },
  });

  const update = useMutation({
    mutationFn: (payload: UpdateFormData) => {
      return api
        .put(`/vaccination-registration/${payload.id}`, payload)
        .then((res) => {
          toast.success('Cập nhật đăng ký thành công');
          return res.data?.data;
        })
        .catch(function (error) {
          toast.error(error.response?.data?.message);
          return false;
        });
    },
  });

  return {
    search,
    update,
  };
};

export default useRegistrationApi;
