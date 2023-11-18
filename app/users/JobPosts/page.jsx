'use client';

import { GigInfo } from '@/components';

function JobPost() {
  return (
    <>
      <div className="mx-20">
        <div className="flex justify-between">
          <div className=" mt-12 h-10">
            <h1 className="text-2xl font-bold text-sky-950">Posted Jobs</h1>
          </div>

          <div className="mt-12">
            <button className="px-14 py-3 rounded-full bg-primary text-white">
              <div className="flex items-center justify-center">New</div>
            </button>
          </div>
        </div>
        <GigInfo />
      </div>
    </>
  );
}

export default JobPost;
