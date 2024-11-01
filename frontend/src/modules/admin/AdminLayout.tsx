import { ReactNode } from 'react';
import Navbar from "../../modules/user/components/Navbar/Navbar";
const UserLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default UserLayout;
