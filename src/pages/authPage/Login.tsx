import { TextField, Typography } from '@mui/material';

function LoginPage() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-[376px]">
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: '700',
            fontSize: '33px',
          }}>
          Đăng nhập vào tài khoản
        </Typography>
        <div className="input-group">
          <TextField className="w-full" id="email" label="Email" variant="outlined" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
