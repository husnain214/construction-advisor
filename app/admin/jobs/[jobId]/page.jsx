'use client';

import { BackButton } from '@/components';
import { UsersContext } from '@/context';
import { useContext } from 'react';

const JobPage = ({ params }) => {
  const { jobId } = params;
  const { jobs } = useContext(UsersContext);
  const {
    id,
    title,
    siteName,
    contractor,
    description,
    createdAt,
    status,
    cost,
  } = jobs.filter((job) => job.id === jobId)[0];

  return (
    <>
      <BackButton />

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
      <p>{createdAt?.split('T')[0]}</p>

      <h2 className="text-md font-bold my-3">Status:</h2>
      <p className="capitalize">{status}</p>

      <h2 className="text-md font-bold my-3">Bid Amount:</h2>
      <p>{cost || 'NA'}</p>

      <h2 className="text-md font-bold my-3">Contractor:</h2>
      <p>{contractor || 'NA'}</p>
    </>
  );
};

export default JobPage;
