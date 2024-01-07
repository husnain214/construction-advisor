'use client';

import { UsersContext } from '@/context';
import { ArrowOpenIcon } from '@/public';
import Link from 'next/link';
import { useContext } from 'react';

function BidsPage() {
  const { bids } = useContext(UsersContext);
  return (
    <div>
      <div className="flex justify-around mt-12 font-semibold  text-sky-950 text-sm">
        <div className="">ID</div>
        <div className="">Amount</div>
        <div className="">Created At</div>
        <div className="">Status</div>
        <div className="">Job Post</div>
      </div>
      <div>
        {bids.map((bid) => (
          <div
            key={bid.id}
            className="flex justify-around font-semibold text-sm text-sky-950 bg-slate-200 py-5 mt-10 rounded-lg"
          >
            <span className="flex items-center uppercase">
              #{bid.id.slice(0, 6)}...
            </span>
            <span className="flex items-center text-slate-500 text-xs">
              ${bid.amount}
            </span>
            <span className="flex items-center text-slate-500 text-xs">
              {bid.createdAt.slice(0, 10)}
            </span>
            <div className="flex items-center text-orange-400 bg-amber-100 rounded-lg px-4 py-2 capitalize">
              <span className="mr-2 text-lg">•</span>
              {bid.successful ? 'Accepted' : 'Pending'}
            </div>

            <Link href={`/admin/jobs/${bid.jobId}`} className="text-black">
              <ArrowOpenIcon />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BidsPage;
