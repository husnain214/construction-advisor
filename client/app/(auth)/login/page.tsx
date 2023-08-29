'use client';

import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { styles } from '@/styles';
import { useState } from 'react';
import { Oval } from 'react-loader-spinner';

type FormData = {
  email: string;
  password: string;
};

const schema: ZodType<FormData> = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(5).max(20),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [submitting, setSubmitting] = useState(false);

  const submit = (data: FormData) => {
    setSubmitting(true);
    console.log(data);
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
              className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
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
              className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            />
            {errors.password && (
              <span role="alert" className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 accent-red-500 rounded text-red-500 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-red-500 dark:checked:border-red-500 dark:focus:ring-offset-gray-800"
              id="hs-checked-checkbox"
            />
            <label
              htmlFor="hs-checked-checkbox"
              className="text-sm text-gray-500 ml-3 dark:text-gray-400"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className={`${styles.primaryButton} justify-self-center flex justify-center items-center gap-3`}
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
    </main>
  );
};

export default LoginForm;
