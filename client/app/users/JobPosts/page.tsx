import React from 'react';
import Layout from '../Layout';
import { GigInfo } from '@/components';

function JobPost() {
  return (
    <Layout>
      {/* <div> */}
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
        <div className="flex justify-around mt-12 font-semibold  text-sky-950 text-sm">
          <div className="">ID</div>
          <div className="">Construction Name</div>
          <div className="">Contractor</div>
          <div className="">Amount</div>
          <div className="">Status</div>
        </div>
        <GigInfo />
      </div>
    </Layout>
  );
}

export default JobPost;
