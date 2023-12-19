import { MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import useProvinces from '../../hooks/UseProvinces';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LoadingButton from '@mui/lab/LoadingButton';
import FieldLabel from '../../components/base/FieldLabel';
import FieldErrorMsg from '../../components/base/FieldErrorMsg';

function RegisterPage() {
  const formSchema = Yup.object().shape({
    person_id: Yup.string()
      .required('Số CMND/CCCD không được bỏ trống')
      .matches(/^(\d{9}|\d{12})$/, 'Số CMND/CCCD không hợp lệ'),
    email: Yup.string().required('Email không được bỏ trống').email('Email không hợp lệ'),
    password: Yup.string()
      .required('Mật khẩu không được bỏ trống')
      .matches(/\S/, 'Mật khẩu không được có khoảng trắng')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    name: Yup.string().required('Họ và tên không được bỏ trống'),
    birthday: Yup.date().typeError('Ngày sinh không được bỏ trống'),
    gender: Yup.string().required('Giới tính không được bỏ trống'),
    province_id: Yup.string().required('Tỉnh/Thành phố không được bỏ trống'),
    district_id: Yup.string().required('Quận/Huyện không được bỏ trống'),
    ward_id: Yup.string().required('Phường/Xã không được bỏ trống'),
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    console.log(data);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/auth/login');
    }, 1000);
  };

  return (
    <div className="w-full flex items-center justify-center m-auto">
      <div className="w-[376px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: '700',
              fontSize: '33px',
            }}>
            Đăng ký tài khoản
          </Typography>
          <div className="form-group my-6">
            <div className="input-group mb-4">
              <FieldLabel label="Số CMND/CCCD" required={true} htmlFor="person_id" />
              <TextField
                className="w-full"
                id="person_id"
                placeholder="Số CMND/CCCD"
                variant="outlined"
                {...register('person_id')}
              />
              <FieldErrorMsg msg={errors.person_id?.message} />
            </div>
            <div className="input-group mb-4">
              <FieldLabel label="Email" required={true} htmlFor="email" />
              <TextField
                className="w-full"
                id="email"
                placeholder="Email"
                variant="outlined"
                {...register('email')}
              />
              <FieldErrorMsg msg={errors.email?.message} />
            </div>
            <div className="input-group mb-4">
              <FieldLabel label="Mật khẩu" required={true} htmlFor="password" />
              <TextField
                className="w-full"
                id="password"
                type="password"
                placeholder="Mật khẩu"
                variant="outlined"
                {...register('password')}
                error={!!errors.password}
              />
              <FieldErrorMsg msg={errors.password?.message} />
            </div>
            <div className="input-group mb-4">
              <FieldLabel label="Họ và tên" required={true} htmlFor="name" />
              <TextField
                className="w-full"
                id="name"
                placeholder="Họ và tên"
                variant="outlined"
                {...register('name')}
              />
              <FieldErrorMsg msg={errors.name?.message} />
            </div>
            <div className="input-group mb-4">
              <FieldLabel label="Ngày sinh" required={true} htmlFor="birthday" />
              <TextField
                className="w-full"
                id="birthday"
                type="date"
                variant="outlined"
                {...register('birthday')}
              />
              <FieldErrorMsg msg={errors.birthday?.message} />
            </div>
            <div className="input-group mb-4">
              <FieldLabel label="Giới tính" required={true} htmlFor="gender" />
              <Select
                className="w-full"
                displayEmpty
                id="gender"
                variant="outlined"
                defaultValue=""
                {...register('gender')}
                inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="" disabled>
                  Giới tính
                </MenuItem>
                <MenuItem value={1}>Nam</MenuItem>
                <MenuItem value={0}>Nữ</MenuItem>
              </Select>
              <FieldErrorMsg msg={errors.gender?.message} />
            </div>
            <div className="input-group mb-4">
              <FieldLabel label="Tỉnh/thành phố" required={true} htmlFor="province_id" />
              <Select
                className="w-full"
                displayEmpty
                id="province_id"
                variant="outlined"
                defaultValue=""
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
            <div className="input-group mb-4">
              <FieldLabel label="Quận/Huyện" required={true} htmlFor="district_id" />
              <Select
                className="w-full"
                displayEmpty
                id="district_id"
                variant="outlined"
                defaultValue=""
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
            <div className="input-group mb-4">
              <FieldLabel label="Xã/Phường" required={true} htmlFor="ward_id" />
              <Select
                className="w-full"
                displayEmpty
                id="ward_id"
                variant="outlined"
                defaultValue=""
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
          </div>
          <div className="text-end text-[#3949ab]">
            <LoadingButton
              type="submit"
              endIcon={<ArrowForwardIcon />}
              loading={loading}
              disabled={!isValid}>
              Tiếp tục
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
