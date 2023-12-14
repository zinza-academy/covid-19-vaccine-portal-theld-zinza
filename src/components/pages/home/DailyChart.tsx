import { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';
import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DailyChart: FC = () => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Đã tiêm',
        data: labels.map(() => faker.number.int({ min: 400, max: 2200000 })),
        borderColor: '#2D2188',
        backgroundColor: '#2D2188',
      },
    ],
  };

  return (
    <Paper elevation={3} className="px-4 py-6 mt-10">
      <Typography variant="h6">Dữ liệu tiêm theo ngày</Typography>
      <Line options={options} data={data} className="border-[1px] border-[#EE0033] p-2" />
    </Paper>
  );
};

export default DailyChart;
