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
  } = jobs.filter((job) => job.id === jobId)[0] || {};

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

      {status === 'ongoing' && user.name === contractor && (
        <Button
          onClick={handleDeleteBid}
          loading={deleting}
          style={'justify-self-start mt-5'}
        >
          Delete Bid
        </Button>
      )}

      {formVisible && (
        <form action="" method="POST" onSubmit={handleSubmit(submit)}>
          <h2 className="text-xl font-bold my-5">Apply for this Job:</h2>

          <label className="grid gap-4 mb-4 justify-start">
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

          <Button
            type={'submit'}
            loading={submitting}
            style="justify-self-start"
          >
            Create Bid
          </Button>
        </form>
      )}
    </>
  );
};

export default JobPage;
