'use client';

import Image, { StaticImageData } from 'next/image';
import { ProfileAvatar, UploadIcon } from '../../../public';
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupForm } from '@/constants';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { styles } from '@/styles';
import { Oval } from 'react-loader-spinner';

type FormData = {
  profileAvatar: FileList;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  cnicNumber: string;
  gender: string;
  dateOfBirth: Date;
  age?: unknown;
};

const schema: ZodType<FormData> = z.object({
  profileAvatar: z.custom<FileList>().refine((data) => data.length > 0, {
    message: 'Profile picture is required',
  }),
  fullname: z.string().max(30).nonempty(),
  email: z.string().email().nonempty().nonempty(),
  password: z.string().max(20).nonempty(),
  confirmPassword: z.string().max(20).nonempty(),
  phoneNumber: z.string().min(9).max(13),
  cnicNumber: z.string().min(9).max(13),
  gender: z.string().nonempty(),
  dateOfBirth: z.coerce.date().max(new Date()),
  age: z.preprocess(
    (arg) => parseInt(z.string().parse(arg)),
    z.number().nonnegative().min(18),
  ),
});

const SignupForm = () => {
  const [avatar, setAvatar] = useState<string | StaticImageData>(ProfileAvatar);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submit = (data: FormData) => {
    setSubmitting(true);
    console.log(data);
  };

  return (
    <>
      <main className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <article className="bg-white shadow p-4 sm:p-7 dark:bg-slate-900 rounded-xl mx-auto grid gap-5 w-[90vw] max-w-[40rem]">
          <header>
            <h1 className="text-3xl font-bold text-center mb-7">
              Get Onboard: Sign Up Here
            </h1>
          </header>

          <form
            onSubmit={handleSubmit(submit)}
            action=""
            className="grid sm:grid-cols-12 gap-2 sm:gap-6"
          >
            <span className="sm:col-span-3 inline-block text-sm text-gray-800 mt-2.5">
              Profile photo
            </span>

            <div className="sm:col-span-9 flex items-center gap-5">
              <Image
                className="inline-block h-16 w-16 rounded-full ring-2 ring-white"
                src={avatar}
                alt="Image Description"
                width={160}
                height={160}
              />

              <label className="py-2 px-3 relative cursor-pointer inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm">
                <UploadIcon className="text-primary" />
                Upload photo
                <input
                  {...register('profileAvatar', {
                    required: 'Profile picture is required',
                    onChange: ({ target }) =>
                      setAvatar(
                        target.files
                          ? URL.createObjectURL(target.files[0])
                          : avatar,
                      ),
                  })}
                  accept="image/*"
                  type="file"
                  className="absolute inset-0 -z-[1]"
                />
              </label>

              {errors.profileAvatar && (
                <span role="alert" className="text-red-500 text-sm">
                  {errors.profileAvatar.message}
                </span>
              )}
            </div>

            {signupForm.textFields.map((field, index) => (
              <Fragment key={field.name}>
                <label
                  htmlFor={field.name}
                  className="sm:col-span-3 inline-block text-sm text-gray-800 mt-2.5"
                >
                  {field.label}
                </label>

                <div className="sm:col-span-9">
                  <input
                    {...register(field.name as keyof FormData)}
                    className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-primary focus:ring-primary"
                    placeholder={field.placeholder}
                    type={
                      index === signupForm.textFields.length - 1
                        ? 'number'
                        : 'text'
                    }
                    aria-invalid={
                      errors[field.name as keyof FormData] ? 'true' : 'false'
                    }
                  />
                  {errors[field.name as keyof FormData] && (
                    <span role="alert" className="text-red-500 text-sm">
                      {errors[field.name as keyof FormData]?.message ?? ''}
                    </span>
                  )}
                </div>
              </Fragment>
            ))}

            <span className="sm:col-span-3 inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
              Gender
            </span>

            <div className="sm:col-span-9 sm:flex">
              {signupForm.radioButtons.map((radio, index) => (
                <label
                  key={radio}
                  className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-primary focus:ring-primary dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                >
                  <input
                    {...register('gender')}
                    type="radio"
                    className="shrink-0 mt-0.5 border border-gray-200 rounded-full accent-primary pointer-events-none"
                    id={radio}
                    defaultChecked={index === 0}
                  />

                  <span className="text-sm text-gray-500 ml-3 dark:text-gray-400 capitalize">
                    {radio}
                  </span>
                </label>
              ))}
            </div>

            <label
              htmlFor="dateOfBirth"
              className="sm:col-span-3 inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
            >
              Date of Birth
            </label>

            <div className="sm:col-span-9">
              <input
                {...register('dateOfBirth')}
                type="date"
                className="py-2 px-3 pr-11 block w-full border border-gray-200 text-gray-500 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm uppercase tracking-widest"
              />

              {errors.dateOfBirth && (
                <span role="alert" className="text-red-500 text-sm">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={`${styles.primaryButton} col-span-12 mx-auto active:scale-95 flex justify-center items-center gap-3`}
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
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
              Create Account
            </button>
          </form>

          <footer>
            <p className="text-center">
              Already have an account?
              <Link className="text-primary ml-2 underline" href={'/login'}>
                Sign in here!
              </Link>
            </p>
          </footer>
        </article>
      </main>
    </>
  );
};

export default SignupForm;
