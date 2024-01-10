import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from './api';

export interface placeSearchParams {
  page?: number;
  limit?: number;
  name?: string;
  address?: string;
}

interface PlaceFormData {
  id?: number;
  name: string;
  address: string;
  managerName: string;
  tableAvailable: number;
}

const usePlaceApi = () => {
  const search = useMutation({
    mutationFn: (payload: placeSearchParams) => {
      return api
        .get('/vaccination-place', { params: payload })
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
      .get('/vaccination-place/all')
      .then((res) => {
        return res.data?.data;
      })
      .catch(function (error) {
        toast.error(error.response?.data?.message);
        return false;
      });
  };

  const create = useMutation({
    mutationFn: (payload: PlaceFormData) => {
      return api
        .post('/vaccination-place', payload)
        .then((res) => {
          toast.success('Thêm điểm tiêm thành công');
          return res.data?.data;
        })
        .catch(function (error) {
          toast.error(error.response?.data?.message);
          return false;
        });
    },
  });

  const update = useMutation({
    mutationFn: (payload: PlaceFormData) => {
      return api
        .put(`/vaccination-place/${payload.id}`, payload)
        .then((res) => {
          toast.success('Cập nhật điểm tiêm thành công');
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

export default usePlaceApi;
