'use client';

import { JobDetails } from '@/components';
import Link from 'next/link';

function JobPost() {
  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-sky-950">All Jobs</h1>

          <Link
            href={'/users/customer/JobPosts/NewJobPage'}
            className="px-14 py-3 rounded-full bg-primary text-white"
          >
            <div className="flex items-center justify-center">New</div>
          </Link>
        </div>
        <JobDetails filter="none" />
      </div>
    </>
  );
}

export default JobPost;
