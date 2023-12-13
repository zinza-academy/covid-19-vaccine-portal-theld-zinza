import { TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled';
import { useState } from 'react';
import FieldErrorMsg from '../../components/base/FieldErrorMsg';
import FieldLabel from '../../components/base/FieldLabel';

const LoadingBtn = styled(LoadingButton)`
  background: #66bb6a;
  color: white;
  line-height: 50px;
  font-weight: 700;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #5aa65d;
  }
  .MuiLoadingButton-loadingIndicator {
    color: white;
  }
`;
const RegisterBtn = styled(Link)`
  background: white;
  color: #9ccc65;
  line-height: 50px;
  font-weight: 700;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #9ccc65;
  cursor: pointer;
  text-align: center;
`;

function LoginPage() {
  const [loading, setLoading] = useState(false);

  const formSchema = Yup.object().shape({
    email: Yup.string().required('Email không được bỏ trống').email('Email không hợp lệ'),
    password: Yup.string()
      .required('Mật khẩu không được bỏ trống')
      .matches(/\S/, 'Mật khẩu không được có khoảng trắng')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  });

  type Payload = Yup.InferType<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Payload>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Payload> = (data) => {
    setLoading(true);
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
            Đăng nhập vào tài khoản
          </Typography>
          <div className="form-group my-6">
            <div className="input-group mb-4">
              <FieldLabel label="Email" htmlFor="email" />
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
              <FieldLabel label="Mật khẩu" htmlFor="password" />
              <TextField
                className="w-full"
                id="password"
                type="password"
                placeholder="Password"
                variant="outlined"
                {...register('password')}
                error={!!errors.password}
              />
              <FieldErrorMsg msg={errors.password?.message} />
            </div>
          </div>
          <div className="text-end text-[#3949ab]">
            <Link to="/auth/forgot-password">Quên mật khẩu?</Link>
          </div>
          <div className="my-6">
            <LoadingBtn type="submit" className="w-full" loading={loading} disabled={!isValid}>
              Đăng nhập
            </LoadingBtn>
          </div>
          <div className="text-center">
            <span>Hoặc đăng ký tài khoản, nếu bạn chưa đăng ký !</span>
          </div>
          <div className="h-[100px] my-6"></div>
          <div className="text-end text-[#3949ab]">
            <RegisterBtn to="/auth/register" type="submit" className="w-full">
              Đăng ký
            </RegisterBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
