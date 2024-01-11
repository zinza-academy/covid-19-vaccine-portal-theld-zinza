import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from './api';

interface VaccineTypeFormData {
  id?: number;
  name: string;
  batchNumber: string;
}

const useTypeApi = () => {
  const search = useMutation({
    mutationFn: () => {
      return api
        .get('/vaccine-type')
        .then((res) => {
          return res.data?.data;
        })
        .catch(function (error) {
          toast.error(error.response?.data?.message);
          return false;
        });
    },
  });

  const getAll = async () => {
    return await api
      .get('/vaccine-type/all')
      .then((res) => {
        return res.data?.data;
      })
      .catch(function (error) {
        toast.error(error.response?.data?.message);
        return false;
      });
  };

  const create = useMutation({
    mutationFn: (payload: VaccineTypeFormData) => {
      return api
        .post('/vaccine-type', payload)
        .then((res) => {
          toast.success('Thêm loại vaccine thành công');
          return res.data?.data;
        })
        .catch(function (error) {
          toast.error(error.response?.data?.message);
          return false;
        });
    },
  });

  const update = useMutation({
    mutationFn: (payload: VaccineTypeFormData) => {
      return api
        .put(`/vaccine-type/${payload.id}`, payload)
        .then((res) => {
          toast.success('Cập nhật loại vaccine thành công');
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
    create,
    update,
    getAll,
  };
};

export default useTypeApi;
