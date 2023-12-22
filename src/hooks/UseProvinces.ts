import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface SelectionObject {
  value: string | number | undefined;
  label: string | number;
}

interface Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
}

interface District {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
}

interface Ward {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
}

interface ProvinceList extends Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: District[];
}

interface DistrictList extends Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  wards: Ward[];
}

const useProvinces = (province_code?: string | number, district_code?: string | number) => {
  const provinces = useQuery<ProvinceList[]>({
    queryKey: ['province'],
    queryFn: async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/p/');
        return response.data;
      } catch (error) {
        return [];
      }
    },
  });

  const districts = useQuery<DistrictList[]>({
    enabled: !!province_code,
    queryKey: ['district', province_code],
    queryFn: async () => {
      try {
        return await axios
          .get(`https://provinces.open-api.vn/api/p/${province_code}?depth=2`)
          .then((response) => response.data.districts);
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
        return await axios
          .get(`https://provinces.open-api.vn/api/d/${district_code}?depth=2`)
          .then((response) => response.data.wards);
      } catch (error) {
        return [];
      }
    },
  });

  const listProvinces = (): SelectionObject[] => {
    return provinces.data
      ? provinces.data.map((item) => {
          return {
            label: item.name,
            value: item.code,
          };
        })
      : [];
  };

  const listDistricts = (): SelectionObject[] => {
    return districts.data
      ? districts.data.map((item) => {
          return {
            label: item.name,
            value: item.code,
          };
        })
      : [];
  };

  const listWards = (): SelectionObject[] => {
    return wards.data
      ? wards.data.map((item) => {
          return {
            label: item.name,
            value: item.code,
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
