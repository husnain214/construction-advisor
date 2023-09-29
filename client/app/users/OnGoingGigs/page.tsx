import React from 'react';
import Link from 'next/link';
import Layout from '../Layout';
import { GigInfo } from '@/components';

function OnGoingGigs() {
  return (
    <Layout>
      <div className="mx-20">
        <div className="mt-12 text-2xl  text-sky-950 font-black">
          {' '}
          Welcome Barbara!
        </div>
        <div className="flex justify-around mt-12  text-sky-950 text-sm">
          <div className="bg-primary py-10 px-2 text-white rounded-3xl font-medium">
            <Link href="/">Post a New Construction Gig</Link>
          </div>
          <div className="bg-sky-950 py-10 px-2 text-white rounded-3xl font-medium">
            <Link href="/">Calculate a New Estimation</Link>
          </div>
          <div className="bg-primary py-10 px-2 text-white rounded-3xl font-medium">
            <Link href="/">Add a New Payment Method</Link>
          </div>
          <div className="bg-sky-950 py-10 px-2 text-white rounded-3xl font-medium">
            <Link href="/">Manage Your Account</Link>
          </div>
        </div>
        <div className="mt-14  text-sky-950 text-xl font-black">
          Ongoing Gigs
        </div>
        <GigInfo />
      </div>
    </Layout>
  );
}

export default OnGoingGigs;
