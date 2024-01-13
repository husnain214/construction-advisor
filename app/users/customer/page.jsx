'use client';

import { JobDetails } from '@/components';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <div>
        <h1 className="text-2xl font-black">
          Welcome {user.name.split(' ').at(0)}!
        </h1>

        <h2 className="mt-14 text-xl font-black">Ongoing Gigs</h2>

        <JobDetails filter="ongoing" />
      </div>
    </>
  );
}

export default Home;
