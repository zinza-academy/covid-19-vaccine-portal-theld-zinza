import { Box, Button, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import useProvinces from '../../../hooks/UseProvinces';
import SelectField from '../../base/SelectField';
import { genderList } from '../../../utils/constants/constants';
import InputTextField from '../../base/InputTextField';

interface dataProp {
  name: string;
  birthday: string;
  gender: number;
  province_id: string;
  district_id: string;
  ward_id: string;
}

const UserInfoForm: FC = () => {
  const userInfoSchema = Yup.object().shape({
    name: Yup.string().required('Họ và tên không được bỏ trống'),
    birthday: Yup.string().typeError('Ngày sinh không được bỏ trống'),
    gender: Yup.number().required('Giới tính không được bỏ trống'),
    province_id: Yup.string().required('Tỉnh/Thành phố không được bỏ trống'),
    district_id: Yup.string().required('Quận/Huyện không được bỏ trống'),
    ward_id: Yup.string().required('Phường/Xã không được bỏ trống'),
  });

  const data: dataProp = {
    name: 'Nguyen Van A',
    birthday: '2022-12-12',
    gender: 1,
    province_id: '1',
    district_id: '1',
    ward_id: '1',
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  type Payload = Yup.InferType<typeof userInfoSchema>;

  const {
    watch,
    getValues,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: data,
    resolver: yupResolver(userInfoSchema),
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

  const onSubmitInfo: SubmitHandler<Payload> = (data) => {
    console.log(data);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmitInfo)}>
        <Typography variant="body1" fontWeight={600}>
          Thông tin cá nhân <EditIcon sx={{ Opacity: 0.5 }} />
        </Typography>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          <InputTextField
            label="Họ và tên"
            name="name"
            control={control}
            errorMsg={errors.name?.message}
          />
          <InputTextField
            label="Ngày sinh"
            type="date"
            name="birthday"
            control={control}
            errorMsg={errors.birthday?.message}
          />
          <SelectField
            list={genderList}
            label="Giới tính"
            control={control}
            name="gender"
            required={true}
            errorMsg={errors.gender?.message}
          />
          <div className="input-group"></div>
          <SelectField
            list={listProvinces()}
            label="Tỉnh/thành phố"
            control={control}
            name="province_id"
            required={true}
            errorMsg={errors.province_id?.message}
          />
          <SelectField
            list={listDistricts()}
            label="Quận/Huyện"
            control={control}
            name="district_id"
            required={true}
            errorMsg={errors.district_id?.message}
          />
          <SelectField
            list={listWards()}
            label="Xã/Phường"
            control={control}
            name="ward_id"
            required={true}
            errorMsg={errors.ward_id?.message}
          />
        </div>
        <div className="action-group flex gap-2 p-4">
          <Link to="/">
            <Button variant="outlined">Hủy bỏ</Button>
          </Link>
          <LoadingButton type="submit" variant="contained" loading={loading}>
            Lưu
          </LoadingButton>
        </div>
      </form>
    </Box>
  );
};

export default UserInfoForm;
