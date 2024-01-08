import { Box, Container } from '@mui/material';
import StatisticalOverview from '../../components/pages/home/StatisticalOverview';
import DailyChart from '../../components/pages/home/DailyChart';
import StaticsPlaceTable from '../../components/pages/home/StaticsPlaceTable';

function HomePage() {
  return (
    <Box>
      <StatisticalOverview />
      <Container maxWidth="xl">
        <DailyChart />
        <StaticsPlaceTable />
      </Container>
    </Box>
  );
}

export default HomePage;
