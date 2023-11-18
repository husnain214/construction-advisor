'use client';

import { Navbar } from '@/components';
import { getUser } from '@/redux/reducers/userReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingScreen } from '@/components';

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return user ? (
    <div className="grid grid-cols-[auto_1fr] relative">
      <Navbar />
      <main>{children}</main>
    </div>
  ) : (
    <LoadingScreen />
  );
};

export default Layout;
