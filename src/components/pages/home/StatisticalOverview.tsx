import { Box, Container, Typography } from '@mui/material';
import { FC } from 'react';
import IcRegister from '../../../assets/img/ic_register_people 1.png';
import IcInjection from '../../../assets/img/ic_injection.png';

interface DataItemProps {
  label: string;
  value: number;
  measurement: string;
  icon: string;
}

const StatisticalItem: FC<DataItemProps> = ({ label, value, measurement, icon }) => {
  return (
    <div className="flex w-full bg-white">
      <img src={icon} alt="cert" className="max-w-[44px] max-h-[44px] m-4" />
      <div className="block">
        <Typography variant="h6">{label}</Typography>
        <Typography variant="h4" className="inline-flex items-baseline">
          {value.toLocaleString()}
          <Typography variant="body2" className="italic">
            ({measurement})
          </Typography>
        </Typography>
      </div>
    </div>
  );
};

const StatisticalOverview: FC = () => {
  const listItem = [
    {
      label: 'Đối tượng đăng ký tiêm',
      value: 11203873,
      measurement: 'lượt',
      icon: IcRegister,
    },
    {
      label: 'Số mũi tiêm hôm qua',
      value: 1762191,
      measurement: 'mũi',
      icon: IcInjection,
    },
  ];

  return (
    <Box
      sx={{
        background: '#F7FBFE',
      }}>
      <Container maxWidth="xl">
        <div className="flex flex-col md:flex-row w-full py-8">
          {listItem.map((item, index) => {
            return (
              <StatisticalItem
                label={item.label}
                value={item.value}
                measurement={item.measurement}
                icon={item.icon}
                key={index}
              />
            );
          })}
        </div>
      </Container>
    </Box>
  );
};

export default StatisticalOverview;
