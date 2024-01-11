import { Box, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationButton from './NavigationButton';
import { getLabelByValue } from '../../../utils/helper';
import { genderList } from '../../../utils/constants/constants';
import { useAppSelector } from '../../../store';
import { injectRegistrationResult } from '../../../store/slices/injectRegistrationSlice';

interface DetailItemProp {
  title: string;
  value?: string | number;
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
  const data = useAppSelector(injectRegistrationResult);

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
          <span className="text-red-600"> {data.id}</span>
        </Typography>
        <Typography variant="body1" align="center">
          <span>
            Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại Bộ y tế đang tiến hành
            thu thập nhu cầu và thông tin để lập danh sách đối tượng đăng ký tiêm vắc xin COVID-19
            theo từng địa bàn. Chúng tôi sẽ liên hệ với quý khách theo số điện thoại
          </span>
          <span className="text-blue-600"> {data?.user?.citizenCode} </span>
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
          <DetailItem title="Họ và tên" value={data?.user?.fullName} />
          <DetailItem title="Ngày sinh" value={data?.user?.birthday} />
          <DetailItem title="Giới tính" value={getLabelByValue(data?.user?.gender, genderList)} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DetailItem title="Số CMND/CCCD/Mã định danh công dân" value={data?.user?.citizenCode} />
          <DetailItem title="Số thẻ BHYT" value={data.insuranceCode} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DetailItem title="Tỉnh/Thành phố" value={data?.user?.ward?.district?.province?.name} />
          <DetailItem title="Quận/Huyện" value={data?.user?.ward?.district?.name} />
          <DetailItem title="Xã/Phường" value={data?.user?.ward?.name} />
        </div>
      </Stack>
      <NavigationButton loading={loading} handleNextStep={handleExport} />
    </Box>
  );
};

export default RegisterStepThree;
