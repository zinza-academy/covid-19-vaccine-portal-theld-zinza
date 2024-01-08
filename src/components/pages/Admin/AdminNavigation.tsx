import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AdminNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(location.pathname);

  const tabs = [
    {
      path: '/admin/vaccination-places',
      label: 'Điểm tiêm',
    },
    {
      path: '/admin/vaccine-registrations',
      label: 'Đăng ký',
    },
    {
      path: '/admin/documents',
      label: 'Tài liệu',
    },
  ];

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  useEffect(() => {
    setTab(location.pathname);
  }, [location]);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tab}
        onChange={handleChangeTab}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example">
        {tabs.map((item, index) => (
          <Tab key={index} value={item.path} label={item.label} />
        ))}
      </Tabs>
    </Box>
  );
}

export default AdminNavigation;
