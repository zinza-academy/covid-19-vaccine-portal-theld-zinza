import { Stack, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LoadingButton from '@mui/lab/LoadingButton';
import InputTextField from '../../components/base/InputTextField';
import SelectField from '../../components/base/SelectField';
import { genderList } from '../../utils/constants/constants';
import useAuthApi from '../../hooks/UseAuth';
import useProvinces from '../../hooks/UseProvinces';

function RegisterPage() {
  const formSchema = Yup.object().shape({
    citizenCode: Yup.string()
      .required('Số CMND/CCCD không được bỏ trống')
      .matches(/^(\d{9}|\d{12})$/, 'Số CMND/CCCD không hợp lệ'),
    email: Yup.string().required('Email không được bỏ trống').email('Email không hợp lệ'),
    password: Yup.string()
      .required('Mật khẩu không được bỏ trống')
      .matches(/\S/, 'Mật khẩu không được có khoảng trắng')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    fullName: Yup.string().required('Họ và tên không được bỏ trống'),
    birthday: Yup.string().required('Ngày sinh không được bỏ trống'),
    gender: Yup.string().required('Giới tính không được bỏ trống'),
    provinceId: Yup.string().required('Tỉnh/Thành phố không được bỏ trống'),
    districtId: Yup.string().required('Quận/Huyện không được bỏ trống'),
    wardId: Yup.string().required('Phường/Xã không được bỏ trống'),
  });

  const navigate = useNavigate();
  const useAuth = useAuthApi();

  type Payload = Yup.InferType<typeof formSchema>;

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<Payload>({
    defaultValues: {
      citizenCode: '',
      email: '',
      password: '',
      fullName: '',
      gender: '',
      provinceId: '',
      districtId: '',
      wardId: '',
    },
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    setValue('districtId', '');
  }, [watch('provinceId'), setValue]);

  useEffect(() => {
    setValue('wardId', '');
  }, [watch('districtId'), setValue]);

  const { listProvinces, listDistricts, listWards } = useProvinces(
    getValues('provinceId'),
    getValues('districtId'),
  );

  const onSubmit: SubmitHandler<Payload> = async (data) => {
    const result = await useAuth.register.mutateAsync(data);
    if (result) {
      navigate('/auth/login');
    }
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
          <Stack spacing={2} className="my-6">
            <InputTextField
              label="Số CMND/CCCD"
              control={control}
              name="citizenCode"
              required={true}
              errorMsg={errors.citizenCode?.message}
            />
            <InputTextField
              label="Email"
              control={control}
              name="email"
              required={true}
              errorMsg={errors.email?.message}
            />
            <InputTextField
              label="Mật khẩu"
              control={control}
              type="password"
              name="password"
              required={true}
              errorMsg={errors.password?.message}
            />
            <InputTextField
              label="Họ và tên"
              control={control}
              name="fullName"
              required={true}
              errorMsg={errors.fullName?.message}
            />
            <InputTextField
              label="Ngày sinh"
              control={control}
              type="date"
              name="birthday"
              required={true}
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
            <SelectField
              list={listProvinces()}
              label="Tỉnh/thành phố"
              control={control}
              name="provinceId"
              required={true}
              errorMsg={errors.provinceId?.message}
            />
            <SelectField
              list={listDistricts()}
              label="Quận/Huyện"
              control={control}
              name="districtId"
              required={true}
              errorMsg={errors.districtId?.message}
            />
            <SelectField
              list={listWards()}
              label="Xã/Phường"
              control={control}
              name="wardId"
              required={true}
              errorMsg={errors.wardId?.message}
            />
          </Stack>
          <div className="text-end text-[#3949ab]">
            <LoadingButton
              type="submit"
              endIcon={<ArrowForwardIcon />}
              loading={useAuth.register.isPending}
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
