import { TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled';
import { useState } from 'react';
import FieldErrorMsg from '../../components/base/FieldErrorMsg';

const LoadingBtn = styled(LoadingButton)`
  background: #303f9f;
  padding: 6px 16px;
  width: 103px;
  color: white;
  line-height: unset;
  font-weight: 700;
  font-size: 16px;
  border-radius: 8px 8px 8px 0;
  cursor: pointer;
  &:hover {
    background-color: #303f9f;
  }
  .MuiLoadingButton-loadingIndicator {
    color: white;
  }
`;
const BackBtn = styled(Link)`
  padding: 6px 16px;
  background: white;
  color: #303f9f;
  font-weight: 700;
  font-size: 16px;
  border-radius: 8px 8px 8px 0;
  border: 1px solid #303f9f;
  cursor: pointer;
  text-align: center;
`;

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formSchema = Yup.object().shape({
    email: Yup.string().required('Email không được bỏ trống').email('Email không hợp lệ'),
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
    console.log(data);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/auth/login');
    }, 2000);
  };

  return (
    <div className="w-full flex items-center justify-center m-auto">
      <div className="w-[621px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center">
            <span>
              Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng ký
              <span className="text-red-600"> (*)</span>
            </span>
          </div>
          <div className="form-group my-6">
            <div className="input-group mb-4">
              <TextField
                className="w-full"
                id="email"
                placeholder="Email"
                variant="outlined"
                {...register('email')}
              />
              <FieldErrorMsg msg={errors.email?.message} />
            </div>
          </div>
          <div className="m-auto flex justify-center">
            <BackBtn to="/auth/login" className="mr-4">
              QUAY LẠI
            </BackBtn>
            <LoadingBtn type="submit" loading={loading} disabled={!isValid}>
              GỬI
            </LoadingBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
