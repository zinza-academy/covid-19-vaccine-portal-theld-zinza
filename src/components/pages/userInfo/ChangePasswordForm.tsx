import { Box, Button, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import FieldLabel from '../../base/FieldLabel';
import FieldErrorMsg from '../../base/FieldErrorMsg';

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
    register,
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
          Thông tin cá nhân <EditIcon sx={{ Opacity: 0.5 }} />
        </Typography>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          <div className="input-group">
            <FieldLabel label="Mật khẩu" required={true} htmlFor="password" />
            <TextField
              className="w-full"
              type="password"
              id="password"
              placeholder="Mật khẩu"
              variant="outlined"
              {...register('password')}
            />
            <FieldErrorMsg msg={errors.password?.message} />
          </div>
          <div className="input-group">
            <FieldLabel label="Xác nhận lại mật khẩu" required={true} htmlFor="rePassword" />
            <TextField
              className="w-full"
              type="password"
              id="rePassword"
              placeholder="Xác nhận lại mật khẩu"
              variant="outlined"
              {...register('rePassword')}
            />
            <FieldErrorMsg msg={errors.rePassword?.message} />
          </div>
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
