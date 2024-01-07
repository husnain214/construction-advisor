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

const Layout = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
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
      <div className="grid grid-cols-[auto_1fr] relative items-start">
        <Navbar />
        <main className="grid px-20 py-10 relative">{children}</main>
      </div>
    </UsersContext.Provider>
  ) : (
    <LoadingScreen />
  );
};

export default Layout;
