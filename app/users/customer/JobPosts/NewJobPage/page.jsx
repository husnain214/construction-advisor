'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addJob } from '@/redux/reducers/jobReducer';
import { Button } from '@/components';
import { useRouter } from 'next/navigation';

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  siteName: z.string().min(5),
});

const NewJobPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const dispatch = useDispatch();

  const submit = async (data) => {
    setSubmitting(true);
    try {
      await dispatch(addJob(data));
      router.push('/users/customer/JobPosts');
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <>
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
            className="py-2 px-3 pr-11 block border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.siteName && (
            <span role="alert" className="text-red-500 text-sm">
              {errors.siteName.message}
            </span>
          )}
        </div>

        <Button loading={submitting} type={'submit'}>
          Create Job Post
        </Button>
      </form>
    </>
  );
};

export default NewJobPage;
