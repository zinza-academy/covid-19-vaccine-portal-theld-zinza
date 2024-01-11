import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from './api';
import { VaccineType } from '../components/pages/Admin/vaccineType/AdminVaccineType';

export interface registrationSearchParams {
  page?: number;
  limit?: number;
  name?: string;
  citizenCode?: string;
}

interface UpdateFormData {
  id?: number;
  status: number;
  vaccinationPlaceId?: number | null;
  vaccineTypeId?: number | null;
  injectedDate?: string | null;
}

export interface CreateFormData {
  job?: string;
  workplace?: string;
  address?: string;
  injectionDate: string;
  injectionPhase: number;
  insuranceCode?: string;
}

export interface RegistrationItem {
  id: number | string;
  userId: number | string;
  job: string;
  workplace: string;
  address: string;
  injectionDate: string;
  injectionPhase: number | string;
  vaccinationPlaceId: string;
  vaccineTypeId: number | string;
  injectedDate: string;
  insuranceCode: string;
  status: number | string;
  vaccineType: VaccineType;
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
  const searchForUser = useMutation({
    mutationFn: (payload: registrationSearchParams) => {
      return api
        .get('/vaccination-registration', { params: payload })
        .then((res) => {
          return res.data?.data;
        })
        .catch(function (error) {
          toast.error(error.response?.data?.message);
          return false;
        });
    },
  });

  const getCertificate = useMutation({
    mutationFn: () => {
      return api
        .get('/auth/certificate')
        .then((res) => {
          return res.data?.data;
        })
        .catch(function (error) {
          toast.error(error.response?.data?.message);
          return false;
        });
    },
  });

  const create = useMutation({
    mutationFn: (payload: CreateFormData) => {
      return api
        .post(`/vaccination-registration`, payload)
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
    create,
    update,
    searchForUser,
    getCertificate,
  };
};

export default useRegistrationApi;
