import { Navbar } from '@/components';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
