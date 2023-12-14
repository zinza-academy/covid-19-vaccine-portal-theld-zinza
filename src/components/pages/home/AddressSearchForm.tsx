import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem, Select, Stack } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import useProvinces from '../../../hooks/UseProvinces';
import FieldErrorMsg from '../../base/FieldErrorMsg';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchButton = styled(LoadingButton)`
  color: White;
  cursor: pointer;
  text-align: center;
  background-color: #171a88;
  border-radius: 8px 8px 8px 0;
`;

function AddressSearchForm() {
  const [loading, setLoading] = useState(false);

  const formSchema = Yup.object().shape({
    province_id: Yup.string().required('Tỉnh/Thành phố không được bỏ trống'),
    district_id: Yup.string().required('Quận/Huyện không được bỏ trống'),
    ward_id: Yup.string().required('Phường/Xã không được bỏ trống'),
  });

  type Payload = Yup.InferType<typeof formSchema>;

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<Payload>({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    setValue('district_id', '');
  }, [watch('province_id'), setValue]);

  useEffect(() => {
    setValue('ward_id', '');
  }, [watch('district_id'), setValue]);

  const { listProvinces, listDistricts, listWards } = useProvinces(
    getValues('province_id'),
    getValues('district_id'),
  );

  const onSubmit: SubmitHandler<Payload> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2}>
        <div className="block input-group mb-4">
          <Select
            displayEmpty
            id="province_id"
            variant="outlined"
            defaultValue=""
            sx={{ minWidth: '260px' }}
            {...register('province_id')}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value="" disabled>
              Tỉnh/thành phố
            </MenuItem>
            {listProvinces().map((item) => (
              <MenuItem key={'p' + item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <FieldErrorMsg msg={errors.province_id?.message} />
        </div>
        <div className="block input-group mb-4">
          <Select
            displayEmpty
            id="district_id"
            variant="outlined"
            defaultValue=""
            sx={{ minWidth: '260px' }}
            {...register('district_id')}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value="" disabled>
              Quận/Huyện
            </MenuItem>
            {listDistricts().map((item) => (
              <MenuItem key={'d' + item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <FieldErrorMsg msg={errors.district_id?.message} />
        </div>
        <div className="block input-group mb-4">
          <Select
            displayEmpty
            id="ward_id"
            variant="outlined"
            defaultValue=""
            sx={{ minWidth: '260px' }}
            {...register('ward_id')}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value="" disabled>
              Xã/Phường
            </MenuItem>
            {listWards().map((item) => (
              <MenuItem key={'w' + item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <FieldErrorMsg msg={errors.ward_id?.message} />
        </div>
        <SearchButton
          variant="contained"
          startIcon={<SearchIcon />}
          type="submit"
          loading={loading}
          disabled={!isValid}>
          Tìm kiếm
        </SearchButton>
      </Stack>
    </form>
  );
}

export default AddressSearchForm;
