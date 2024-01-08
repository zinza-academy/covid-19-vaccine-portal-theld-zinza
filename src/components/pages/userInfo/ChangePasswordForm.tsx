import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import InputTextField from '../../base/InputTextField';

const ChangePasswordForm: FC = () => {
  const userInfoSchema = Yup.object().shape({
    password: Yup.string()
      .required('Mật khẩu không được bỏ trống')
      .matches(/\S/, 'Mật khẩu không được có khoảng trắng')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    rePassword: Yup.string()
      .required('Nhập lại mật khẩu không được bỏ trống')
      .oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  type Payload = Yup.InferType<typeof userInfoSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Payload>({
    resolver: yupResolver(userInfoSchema),
  });

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
          Mật khẩu <EditIcon sx={{ Opacity: 0.5 }} />
        </Typography>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          <InputTextField
            label="Mật khẩu mới"
            type="password"
            name="password"
            control={control}
            required={true}
            errorMsg={errors.password?.message}
          />
          <InputTextField
            label="Xác nhận lại mật khẩu"
            type="password"
            name="rePassword"
            control={control}
            required={true}
            errorMsg={errors.rePassword?.message}
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

export default ChangePasswordForm;
