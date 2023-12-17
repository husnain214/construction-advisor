'use client';

import { BackButton, Button } from '@/components';
import { cancelBid, initializeBids } from '@/redux/reducers/bidReducer';
import { initializeJobs } from '@/redux/reducers/jobReducer';
import bidService from '@/services/bidService';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

const schema = z.object({
  amount: z.preprocess(
    (arg) => parseInt(z.string().parse(arg)),
    z.number().min(5),
  ),
});

const JobPage = ({ params }) => {
  const jobs = useSelector((state) => state.jobPosts);
  const [submitting, setSubmitting] = useState(false);
  const myBids = useSelector((state) => state.bids);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [deleting, setDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const { jobId } = params;
  const jobBid = myBids.find((bid) => bid.jobId === jobId);
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
        await axios.get(`/api/bids?JobPostId=${id}`);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  const submit = async ({ amount }) => {
    setSubmitting(true);
    try {
      await bidService.create({ amount, jobId, email: user.email });
      dispatch(initializeJobs());
    } catch (error) {
      console.error(error);
    }

    setSubmitting(false);
  };

  const handleDeleteBid = async () => {
    setDeleting(true);

    try {
      await dispatch(cancelBid(jobBid.id));
      dispatch(initializeJobs());
      dispatch(initializeBids());
    } catch (error) {
      console.error(error.message);
    }

    setDeleting(false);
  };

  const formVisible = status !== 'ongoing' && !jobBid;

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

      {status === 'ongoing' && (
        <Button onClick={handleDeleteBid} loading={deleting}>
          Delete Bid
        </Button>
      )}

      {formVisible && (
        <form action="" method="POST" onSubmit={handleSubmit(submit)}>
          <label className="grid gap-4 mb-4">
            Bid Amount:
            <input
              {...register('amount')}
              type="text"
              inputMode="decimal"
              className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm"
            />
            {errors.amount && (
              <span role="alert" className="text-red-500 text-sm">
                {errors.amount.message}
              </span>
            )}
          </label>

          <Button type={'submit'} loading={submitting}>
            Create Bid
          </Button>
        </form>
      )}
    </>
  );
};

export default JobPage;
