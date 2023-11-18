'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';
import { userLogin } from '@/redux/reducers/userReducer';
import { useDispatch } from 'react-redux';

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1).min(5).max(20),
});

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const submit = async (data) => {
    setSubmitting(true);
    try {
      await dispatch(userLogin(data));
      router.push('/users');
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

          <button
            type="submit"
            className="bg-primary hover:bg-red-400 transition-all text-white rounded-full py-3 px-6 justify-self-center flex justify-center items-center gap-3"
          >
            <Oval
              height={20}
              width={20}
              color="#ffff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={submitting}
              ariaLabel="oval-loading"
              secondaryColor="#EE6338"
              strokeWidth={4}
              strokeWidthSecondary={4}
            />
            Login
          </button>
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

export default App;
