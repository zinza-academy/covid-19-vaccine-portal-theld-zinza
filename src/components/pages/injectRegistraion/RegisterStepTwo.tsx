import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import NavigationButton from './NavigationButton';
import ShieldImage from '../../../assets/img/shield.png';
import VacineImage from '../../../assets/img/vaccine2.png';
import HospitalImage from '../../../assets/img/hospital.png';
import { incrementStep } from '../../../store/slices/injectRegistrationSlice';
import { RootState, useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';

const RegisterStepTwo: FC = () => {
  const guide = [
    {
      icon: ShieldImage,
      text: '1. Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả, tuy nhiên vắc xin phòng COVID-19 có thể không phòng được bệnh hoàn toàn. Người được tiêm chủng vắc xin phòng COVID-19 có thể phòng được bệnh hoặc giảm mức độ nặng nếu mắc bệnh. Tuy nhiên, sau khi tiêm chủng vẫn phải tiếp tục thực hiện nghiêm các biện pháp phòng chống dịch theo quy định.',
    },
    {
      icon: VacineImage,
      text: '2. Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu hiện tại chỗ tiêm hoặc toàn thân như sưng, đau chỗ tiêm, nhức đầu, buồn nôn, sốt, đau cơ…hoặc tai biến nặng sau tiêm chủng. Tiêm vắc xin mũi 2 do Pfizer sản xuất ở người đã tiêm mũi 1 bằng vắc xin AstraZeneca có thể tăng khả năng xảy ra phản ứng thông thường sau tiêm chủng.',
    },
    {
      icon: HospitalImage,
      text: '3. Khi có triệu chứng bất thường về sức khỏe, người được tiêm chủng cần đến ngay cơ sở y tế gần nhất để được tư vấn, thăm khám và điều trị kịp thời.',
    },
  ];

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const formData = useSelector((state: RootState) => state.injectRegistrationForm);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgree(event.target.checked);
  };

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      console.log(formData);

      setLoading(false);
      dispatch(incrementStep());
    }, 1000);
  };

  return (
    <Box>
      <Stack spacing={2}>
        {guide.map((item) => {
          return (
            <div className="flex items-center" key={item.icon}>
              <div className="w-6 mr-4">
                <img src={item.icon} className="max-w-none" />
              </div>
              <Typography variant="body2">{item.text}</Typography>
            </div>
          );
        })}
        <hr />
        <div className="flex items-center">
          <div className="mr-4">
            <Typography variant="body2">
              Sau khi đã đọc các thông tin nêu trên, tôi đã hiểu về các nguy cơ và:
            </Typography>
          </div>
          <FormControlLabel
            control={<Checkbox onChange={handleChange} />}
            label="Đồng ý tiêm chủng"
          />
        </div>
      </Stack>
      <NavigationButton disabledNext={!isAgree} loading={loading} handleNextStep={handleRegister} />
    </Box>
  );
};

export default RegisterStepTwo;
