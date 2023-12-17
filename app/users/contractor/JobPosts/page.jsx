'use client';

import { JobDetails } from '@/components';

function JobPost() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-sky-950">All Jobs</h1>
        <JobDetails filter="none" />
      </div>
    </>
  );
}

export default JobPost;
