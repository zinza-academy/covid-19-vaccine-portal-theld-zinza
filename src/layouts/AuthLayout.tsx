import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import authImage from '../assets/img/auth1.png';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC<any> = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${authImage})` }}></div>
        <div className="w-full h-full flex items-center justify-center lg:w-1/2 bg-white px-10 py-16 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default AuthLayout;
