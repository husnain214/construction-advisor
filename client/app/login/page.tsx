'use client';

import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const schema: ZodType<FormData> = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submit = (data: FormData) => {
    console.log(data);
  };

  return (
    <main className="grid place-items-center bg-slate-50">
      <div className="p-7 shadow-md bg-white rounded-2xl mx-auto grid gap-5 w-[90vw] max-w-[30rem]">
        <header>
          <h1 className="text-3xl font-bold text-center">Welcome back!</h1>
        </header>
        <form className="grid gap-5" action="" onSubmit={handleSubmit(submit)}>
          <label htmlFor="email">Email:</label>
          <div className="grid gap-1">
            <input
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
              className="border rounded-md px-5 py-3"
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
              className="border rounded-md px-5 py-3"
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
            className="bg-red-500 text-white rounded-md py-3"
          >
            Submit
          </button>
        </form>
        <footer>
          <p className="text-center">
            Dont have an account?
            <Link className="text-red-500 ml-2 underline" href={'/signup'}>
              Create one now!
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
};

export default LoginForm;
