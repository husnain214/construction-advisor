'use client';

import { Navbar } from '@/components';
import { getUser } from '@/redux/reducers/userReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingScreen } from '@/components';
import userService from '@/services/userService';
import { UsersContext } from '@/context';
import jobService from '@/services/jobService';
import bidService from '@/services/bidService';
import { HamburgerIcon } from '@/public';

const Layout = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [navVisible, setNavVisible] = useState(false);

  const [bids, setBids] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getUser());
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const data = await userService.getAll();
      setUsers(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await jobService.getAll();
      setJobs(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await bidService.getAll();
      setBids(data);
    })();
  }, []);

  return user && users ? (
    <UsersContext.Provider value={{ users, setUsers, jobs, bids }}>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] relative">
        <Navbar navVisible={navVisible} setNavVisible={setNavVisible} />
        <main className="grid align-content-start px-5 md:px-20 pt-20 md:py-10 relative col-start-1 md:col-start-auto col-end-1 md:col-end-auto row-start-1 md:row-start-auto row-end-1 md:row-end-auto">
          <button
            className="absolute z-10 left-5 top-5 block md:hidden"
            onClick={() => setNavVisible(true)}
          >
            <HamburgerIcon className={'w-10'} />
          </button>
          {children}
        </main>
      </div>
    </UsersContext.Provider>
  ) : (
    <LoadingScreen />
  );
};

export default Layout;
