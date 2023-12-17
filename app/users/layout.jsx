'use client';

import { Navbar } from '@/components';
import { getUser } from '@/redux/reducers/userReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingScreen } from '@/components';
import { initializeJobs } from '@/redux/reducers/jobReducer';
import { initializeBids } from '@/redux/reducers/bidReducer';

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getUser());
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(initializeJobs(user?.role === 'customer'));
    })();
  }, [dispatch, user]);

  useEffect(() => {
    (async () => {
      await dispatch(initializeBids(user?.role === 'contractor'));
    })();
  }, [dispatch, user]);

  return user ? (
    <div className="grid grid-cols-[auto_1fr] relative">
      <Navbar />
      <main className="grid px-20 py-10 relative">{children}</main>
    </div>
  ) : (
    <LoadingScreen />
  );
};

export default Layout;
