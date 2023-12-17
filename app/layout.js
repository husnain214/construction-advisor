import { Poppins } from 'next/font/google';
import { ReduxProvider } from '@/redux/provider';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '900'],
  variable: '--poppins-font',
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-primary min-h-screen grid items-stretch text-neutral-900 tracking-wide text-sm`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
