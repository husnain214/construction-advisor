'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/jobs');
      setJobs(response.data);
    })();
  }, []);
  return (
    <>
      {jobs.map((job) => (
        <Link
          href={`/admin/jobs/${job.id}`}
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
          <div className="flex items-center">${job.cost}</div>
          <div className="flex items-center text-orange-400 bg-amber-100 rounded-lg px-4 py-2 capitalize">
            <span className="mr-2 text-lg">•</span>
            {job.status}
          </div>
        </Link>
      ))}
    </>
  );
};

export default JobsPage;
