'use client';

import { useSelector } from 'react-redux';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateJob } from '@/redux/reducers/jobReducer';
import { BackButton, Button } from '@/components';

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  siteName: z.string().min(5),
});

const UpdateJobPost = ({ params }) => {
  const jobs = useSelector((state) => state.jobPosts);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const dispatch = useDispatch();

  const { jobId } = params;
  const { id, title, siteName, description } =
    jobs.filter((job) => job.id === jobId)[0] || {};

  const submit = async (data) => {
    setSubmitting(true);

    try {
      await dispatch(updateJob(id, data));

      history.back();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }

    setSubmitting(false);
  };

  return (
    <>
      <BackButton />
      <h1 className="text-3xl font-bold my-5 text-center">Update Job Post</h1>
      <form
        action=""
        method="POST"
        onSubmit={handleSubmit(submit)}
        className="grid content-center gap-5"
      >
        <label htmlFor="title">Title:</label>
        <div className="grid gap-1">
          <input
            {...register('title')}
            aria-invalid={errors.title ? 'true' : 'false'}
            defaultValue={title}
            className="py-2 px-3 pr-11 block border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && (
            <span role="alert" className="text-red-500 text-sm">
              {errors.title.message}
            </span>
          )}
        </div>
        <label htmlFor="description">Description:</label>
        <div className="grid gap-1">
          <textarea
            {...register('description')}
            rows={10}
            defaultValue={description}
            aria-invalid={errors.description ? 'true' : 'false'}
            className="py-2 px-3 pr-11 block border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
          {errors.description && (
            <span role="alert" className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>
        <label htmlFor="siteName">Site Name:</label>
        <div className="grid gap-1">
          <input
            {...register('siteName')}
            rows={20}
            aria-invalid={errors.siteName ? 'true' : 'false'}
            defaultValue={siteName}
            className="py-2 px-3 pr-11 block border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.siteName && (
            <span role="alert" className="text-red-500 text-sm">
              {errors.siteName.message}
            </span>
          )}
        </div>

        <Button
          type={'submit'}
          loading={submitting}
          style={'justify-self-center'}
        >
          Update Job Post
        </Button>
      </form>
    </>
  );
};

export default UpdateJobPost;
