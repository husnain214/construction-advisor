'use client';

import { BackButton, Bid } from '@/components';
import bidService from '@/services/bidService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const JobPage = ({ params }) => {
  const { jobId } = params;
  const jobs = useSelector((state) => state.jobPosts);
  const [bids, setBids] = useState([]);
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
      <div>Bids:</div>
      <div>{bids && bids.map((bid) => <Bid key={bid.id} bid={bid} />)}</div>
    </>
  );
};

export default JobPage;
