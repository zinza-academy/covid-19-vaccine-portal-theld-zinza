import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled';
import useAuthApi from '../../../hooks/UseAuth';
import InputTextField from '../../base/InputTextField';
import { Stack, Typography } from '@mui/material';

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

function ChangePasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Mật khẩu không được bỏ trống')
      .matches(/\S/, 'Mật khẩu không được có khoảng trắng')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    rePassword: Yup.string()
      .required('Nhập lại mật khẩu không được bỏ trống')
      .oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
  });

  type Payload = Yup.InferType<typeof formSchema>;
  const useAuth = useAuthApi();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Payload>({
    defaultValues: {
      password: '',
      rePassword: '',
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Payload> = async (data) => {
    await useAuth.changePassword.mutateAsync({
      ...data,
      token,
    });
    navigate('/auth/login');
  };

  return (
    <div className="w-full flex items-center justify-center m-auto">
      <div className="w-[621px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: '700',
              fontSize: '33px',
            }}>
            Thay đổi mật khẩu
          </Typography>
          <Stack spacing={2} className="p-6">
            <InputTextField
              label="Mật khẩu mới"
              control={control}
              type="password"
              name="password"
              required={true}
              errorMsg={errors.password?.message}
            />
            <InputTextField
              label="Nhập lại mật khẩu"
              control={control}
              type="password"
              name="rePassword"
              required={true}
              errorMsg={errors.rePassword?.message}
            />
            <div className="m-auto flex justify-center">
              <LoadingBtn
                variant="contained"
                type="submit"
                loading={useAuth.forgotPassword.isPending}
                disabled={!isValid}>
                GỬI
              </LoadingBtn>
            </div>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
