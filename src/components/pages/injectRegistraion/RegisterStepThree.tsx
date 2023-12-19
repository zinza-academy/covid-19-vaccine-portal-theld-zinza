import { Box, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationButton from './NavigationButton';

interface dataProp {
  inject_id: string;
  name: string;
  birthday: string;
  gender: number;
  person_id: string;
  insurance_number: string;
  phone_number: string;
  province_id: string | number;
  district_id: string | number;
  ward_id: string | number;
}

interface DetailItemProp {
  title: string;
  value: string | number;
}

const DetailItem: FC<DetailItemProp> = ({ title, value }) => {
  return (
    <div className="block">
      <p>{title}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
};

const RegisterStepThree: FC = () => {
  const [loading, setLoading] = useState(false);
  const data: dataProp = {
    inject_id: '0120211103501237',
    name: 'Nguyễn Văn A',
    birthday: '12/12/1990',
    gender: 1,
    person_id: '123123123123',
    insurance_number: '123321123321',
    phone_number: '123321123321',
    province_id: 1,
    district_id: 2,
    ward_id: 3,
  };

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Box>
      <Stack spacing={2}>
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontWeight: '700',
          }}>
          <span>Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là</span>
          <span className="text-red-600"> {data.inject_id}</span>
        </Typography>
        <Typography variant="body1" align="center">
          <span>
            Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại Bộ y tế đang tiến hành
            thu thập nhu cầu và thông tin để lập danh sách đối tượng đăng ký tiêm vắc xin COVID-19
            theo từng địa bàn. Chúng tôi sẽ liên hệ với quý khách theo số điện thoại
          </span>
          <span className="text-blue-600"> {data.phone_number} </span>
          <span>khi có kế hoạch tiêm trong thời gian sớm nhất.</span>
        </Typography>
        <Typography variant="body1" align="center">
          <span>Mời bạn tải ứng dụng &quot;SỔ SỨC KHỎE ĐIỆN TỬ&quot; tại</span>
          <Link to="https://hssk.kcb.vn/#/sskdt" className="text-red-600">
            {' https://hssk.kcb.vn/#/sskdt '}
          </Link>
          <span>để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng COVID-19</span>
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <DetailItem title="Họ và tên" value={data.name} />
          <DetailItem title="Ngày sinh" value={data.birthday} />
          <DetailItem title="Giới tính" value={data.gender} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DetailItem title="Số CMND/CCCD/Mã định danh công dân" value={data.person_id} />
          <DetailItem title="Số thẻ BHYT" value={data.insurance_number} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DetailItem title="Tỉnh/Thành phố" value={data.province_id} />
          <DetailItem title="Quận/Huyện" value={data.district_id} />
          <DetailItem title="Xã/Phường" value={data.ward_id} />
        </div>
      </Stack>
      <NavigationButton loading={loading} handleNextStep={handleExport} />
    </Box>
  );
};

export default RegisterStepThree;
