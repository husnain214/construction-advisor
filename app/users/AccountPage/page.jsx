'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import auth from '@/services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout, modifyUser } from '@/redux/reducers/userReducer';
import userService from '@/services/userService';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';

const schema = z
  .object({
    oldPassword: z.string().min(5),
    newPassword: z.string().min(5),
  })
  .refine(
    async ({ oldPassword }) => {
      try {
        await auth.verifyPassword({ password: oldPassword });
        return true;
      } catch (error) {
        console.error(error);
      }

      return false;
    },
    {
      message: 'Password is not correct',
      path: ['oldPassword'],
    },
  );

const AccountPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const submit = async ({ newPassword: password }) => {
    setSubmitting(true);

    try {
      dispatch(modifyUser({ password }));
    } catch (error) {
      console.error(error);
    }

    setSubmitting(false);
  };

  const deleteAccount = async () => {
    try {
      await userService.deleteUser();
      await dispatch(logout());
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="grid items-center">
        <header>
          <h1 className="text-3xl font-bold mb-5">Manage Your Account</h1>
          <h2 className="text-2xl font-bold">Change Your Password</h2>
        </header>

        <form
          method="POST"
          action=""
          onSubmit={handleSubmit(submit)}
          className="grid gap-5 justify-start"
        >
          <label htmlFor="oldPassword" className="font-bold">
            Old Password:
          </label>
          <div className="grid gap-1">
            <input
              {...register('oldPassword')}
              type="password"
              aria-invalid={errors.oldPassword ? 'true' : 'false'}
              className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.oldPassword && (
              <span role="alert" className="text-red-500 text-sm">
                {errors.oldPassword.message}
              </span>
            )}
          </div>
          <label htmlFor="newPassword" className="font-bold">
            New Password:
          </label>
          <div className="grid gap-1">
            <input
              type="password"
              {...register('newPassword')}
              aria-invalid={errors.newPassword ? 'true' : 'false'}
              className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.newPassword && (
              <span role="alert" className="text-red-500 text-sm">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <Button
            type={'submit'}
            loading={submitting}
            style={'justify-self-start'}
          >
            Update
          </Button>
        </form>

        {user.role !== 'admin' && (
          <Button
            type="button"
            onClick={deleteAccount}
            style="bg-red-700 hover:bg-red-400 transition-all text-white rounded-full py-3 px-6 justify-self-start flex justify-center items-center gap-3"
          >
            Delete Your Account
          </Button>
        )}
      </div>
    </>
  );
};

export default AccountPage;
