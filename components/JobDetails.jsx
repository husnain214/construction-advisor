'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';

const JobDetails = ({ filter }) => {
  const jobs = useSelector((state) => state.jobPosts);
  const user = useSelector((state) => state.user);
  const filteredJobs =
    filter === 'none' ? jobs : jobs.filter((job) => job.status === filter);

  return (
    <div>
      <div className="flex justify-around mt-12 font-semibold  text-sky-950 text-sm">
        <div className="">ID</div>
        <div className="">Construction Name</div>
        <div className="">Contractor</div>
        <div className="">Amount</div>
        <div className="">Status</div>
      </div>
      <div>
        {filteredJobs.map((job) => (
          <Link
            href={`/users/${user.role}/JobPosts/${job.id}`}
            key={job.id}
            className="flex justify-around font-semibold text-sm text-sky-950 bg-slate-200 py-5 mt-10 rounded-lg"
          >
            <span className="flex items-center uppercase">
              #{job.id.slice(0, 6)}...
            </span>
            <span className="flex items-center text-slate-500 text-xs">
              {job.siteName.slice(0, 20)}
            </span>
            <span className="flex items-center text-slate-500 text-xs">
              {job.contractor}
            </span>
            <div className="flex items-center">${job.bidAmount}</div>
            <div className="flex items-center text-orange-400 bg-amber-100 rounded-lg px-4 py-2 capitalize">
              <span className="mr-2 text-lg">•</span>
              {job.status}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobDetails;
