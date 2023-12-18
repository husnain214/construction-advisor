'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userLogin } from '@/redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components';

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1).min(5).max(20),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      router.push(`/users/${user.role}`);
    }
  }, [user, router]);

  const submit = async (data) => {
    setSubmitting(true);
    try {
      await dispatch(userLogin(data));
    } catch (error) {
      setLoginError('invalid credentials');
      setTimeout(() => setLoginError(''), 5000);
    }
    setSubmitting(false);
  };

  return (
    <main className="grid place-items-center bg-slate-50">
      <div className="p-7 shadow-md bg-white rounded-xl mx-auto grid gap-5 w-[90vw] max-w-[30rem]">
        <header>
          <h1 className="text-3xl font-bold text-center">Welcome back!</h1>
        </header>
        <form
          className="grid gap-5"
          action=""
          onSubmit={handleSubmit(submit)}
          method="POST"
        >
          <label htmlFor="email">Email:</label>
          <div className="grid gap-1">
            <input
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
              className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && (
              <span role="alert" className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <label htmlFor="password">Password</label>
          <div className="grid gap-1">
            <input
              type="password"
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
              className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.password && (
              <span role="alert" className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button type={'submit'} loading={submitting}>
            Login
          </Button>
        </form>
        <footer>
          <p className="text-center">
            Dont have an account?
            <Link
              className="text-primary hover:text-red-400 ml-2 underline"
              href={'/signup'}
            >
              Create one now!
            </Link>
          </p>
        </footer>
      </div>

      {loginError && (
        <span role="alert" className="text-red-500 text-sm">
          {loginError}
        </span>
      )}
    </main>
  );
};

export default LoginPage;
