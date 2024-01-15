'use client';

import { Navbar } from '@/components';
import { getUser } from '@/redux/reducers/userReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingScreen } from '@/components';
import { initializeAllJobs, initializeJobs } from '@/redux/reducers/jobReducer';
import { initializeBids } from '@/redux/reducers/bidReducer';
import { HamburgerIcon } from '@/public';

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getUser());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      if (user.role === 'customer') {
        dispatch(initializeJobs());
      } else if (user.role === 'contractor') {
        dispatch(initializeBids());
        dispatch(initializeAllJobs());
      }
    })();
  }, [dispatch, user]);

  return user ? (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] relative">
      <Navbar navVisible={navVisible} setNavVisible={setNavVisible} />
      <main className="grid px-5 sm:px-20 pt-20 sm:py-10 relative col-start-1 sm:col-start-auto col-end-1 sm:col-end-auto row-start-1 sm:row-start-auto row-end-1 sm:row-end-auto">
        <button
          className="absolute z-10 left-5 top-5 block sm:hidden"
          onClick={() => setNavVisible(true)}
        >
          <HamburgerIcon className={'w-10'} />
        </button>

        {children}
      </main>
    </div>
  ) : (
    <LoadingScreen />
  );
};

export default Layout;
