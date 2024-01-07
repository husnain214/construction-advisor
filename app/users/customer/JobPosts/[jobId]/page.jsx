'use client';

import { BackButton, Bid, Button } from '@/components';
import { deleteJob } from '@/redux/reducers/jobReducer';
import bidService from '@/services/bidService';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const JobPage = ({ params }) => {
  const { jobId } = params;
  const jobs = useSelector((state) => state.jobPosts);
  const [deleting, setDeleting] = useState(false);
  const [bids, setBids] = useState([]);
  const dispatch = useDispatch();
  const {
    id,
    title,
    siteName,
    contractor,
    description,
    createdAt,
    status,
    cost,
  } = jobs.filter((job) => job.id === jobId)[0] || {};

  useEffect(() => {
    (async () => {
      try {
        const data = await bidService.getJobBids(jobId);
        setBids(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [jobId, setBids]);

  const omitJob = () => {
    setDeleting(true);
    try {
      dispatch(deleteJob(id));
    } catch (error) {
      console.error(error);
    }
    setDeleting(false);
  };

  return (
    <div>
      <BackButton />

      <div className="flex justify-between my-5">
        <Button style={'bg-red-500'} loading={deleting} onClick={omitJob}>
          Delete
        </Button>

        <Link
          href={`/users/customer/JobPosts/${id}/update`}
          className="px-14 py-3 rounded-full bg-primary text-white"
        >
          Update
        </Link>
      </div>

      <h1 className="text-3xl font-bold my-5 text-center">Job Details</h1>

      <h2 className="text-md font-bold my-3">Job ID:</h2>
      <p>{id}</p>

      <h2 className="text-md font-bold my-3">Title:</h2>
      <p>{title}</p>

      <h2 className="text-md font-bold my-3">Site Name:</h2>
      <p>{siteName}</p>

      <h2 className="text-md font-bold my-3">Description:</h2>
      <p className="break-all">{description}</p>

      <h2 className="text-md font-bold my-3">Created At:</h2>
      <p>{createdAt.split('T')[0]}</p>

      <h2 className="text-md font-bold my-3">Status:</h2>
      <p className="capitalize">{status}</p>

      <h2 className="text-md font-bold my-3">Bid Amount:</h2>
      <p>{cost || 'NA'}</p>

      <h2 className="text-md font-bold my-3">Contractor:</h2>
      <p>{contractor || 'NA'}</p>

      <h2 className="text-xl font-bold my-3">Bids:</h2>
      {bids && bids.map((bid) => <Bid key={bid.id} bid={bid} />)}
    </div>
  );
};

export default JobPage;
