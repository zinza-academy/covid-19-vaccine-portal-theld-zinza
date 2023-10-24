import { ReactNode } from 'react';
import authImage from '../../assets/img/auth1.png';

interface LayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="flex h-screen">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${authImage})` }}></div>
        <div className="w-full lg:w-1/2 bg-white p-8 overflow-y-auto">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
