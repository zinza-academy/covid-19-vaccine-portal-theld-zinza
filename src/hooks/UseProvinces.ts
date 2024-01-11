import { useQuery } from '@tanstack/react-query';
import api from './api';

interface SelectionObject {
  value: string | number | undefined;
  label: string | number;
}

interface Province {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
  provinceId: number;
  province?: Province;
}

export interface Ward {
  id: number;
  name: string;
  districtId: number;
  district?: District;
}

const useProvinces = (province_code?: string | number, district_code?: string | number) => {
  const provinces = useQuery<Province[]>({
    queryKey: ['province'],
    queryFn: async () => {
      try {
        const response = await api.get('/address');
        return response.data?.data;
      } catch (error) {
        return [];
      }
    },
  });

  const districts = useQuery<District[]>({
    enabled: !!province_code,
    queryKey: ['district', province_code],
    queryFn: async () => {
      try {
        return await api.get(`/address/p/${province_code}`).then((response) => response.data?.data);
      } catch (error) {
        return [];
      }
    },
  });

  const wards = useQuery<Ward[]>({
    enabled: !!district_code,
    queryKey: ['district', district_code],
    queryFn: async () => {
      try {
        return await api.get(`/address/d/${district_code}`).then((response) => response.data?.data);
      } catch (error) {
        return [];
      }
    },
  });

  const listProvinces = (): SelectionObject[] => {
    return provinces.data?.length
      ? provinces.data.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      : [];
  };

  const listDistricts = (): SelectionObject[] => {
    return districts.data?.length
      ? districts.data.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      : [];
  };

  const listWards = (): SelectionObject[] => {
    return wards.data?.length
      ? wards.data.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      : [];
  };

  return {
    provinces,
    districts,
    wards,
    listProvinces,
    listDistricts,
    listWards,
  };
};

export default useProvinces;
