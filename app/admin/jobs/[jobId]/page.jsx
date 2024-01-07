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

      <div>Job ID: {id}</div>
      <div>Title: {title}</div>
      <div>Site Name: {siteName}</div>
      <div>Description: {description}</div>
      <div>Created At: {createdAt}</div>
      <div>Status: {status}</div>
      <div>Bid Amount: {cost || 'NA'}</div>
      <div>Contractor: {contractor || 'NA'}</div>
    </>
  );
};

export default JobPage;
