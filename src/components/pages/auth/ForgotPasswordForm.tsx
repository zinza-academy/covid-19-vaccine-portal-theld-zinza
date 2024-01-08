import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled';
import useAuthApi from '../../../hooks/UseAuth';
import InputTextField from '../../base/InputTextField';

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

function ForgotPasswordForm() {
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    email: Yup.string().required('Email không được bỏ trống').email('Email không hợp lệ'),
  });

  type Payload = Yup.InferType<typeof formSchema>;
  const useAuth = useAuthApi();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Payload>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Payload> = async (data) => {
    const result = await useAuth.forgotPassword.mutateAsync(data);
    if (result) {
      navigate('/auth/login');
    }
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
            <InputTextField
              label=""
              control={control}
              name="email"
              hideLabel={true}
              required={true}
              errorMsg={errors.email?.message}
            />
          </div>
          <div className="m-auto flex justify-center">
            <BackBtn to="/auth/login" className="mr-4">
              QUAY LẠI
            </BackBtn>
            <LoadingBtn
              variant="contained"
              type="submit"
              loading={useAuth.forgotPassword.isPending}
              disabled={!isValid}>
              GỬI
            </LoadingBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
