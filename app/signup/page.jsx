'use client';

import Image from 'next/image';
import { ProfileAvatar, UploadIcon } from '../../public';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupForm } from '@/constants';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '@/redux/reducers/userReducer';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';

const schema = z
  .object({
    picture: z.custom().refine((data) => data.length > 0, {
      message: 'Profile picture is required',
    }),
    name: z.string().min(1).max(30),
    email: z.string().min(12).max(20).email(),
    password: z.string().min(5).max(20),
    confirmPassword: z.string().min(5).max(20),
    phone: z.string().min(7).max(13),
    cnic: z.string().min(13).max(13),
    gender: z.string(),
    role: z.string(),
    dob: z.coerce.date().max(new Date()),
    age: z.preprocess(
      (arg) => parseInt(z.string().parse(arg)),
      z.number().nonnegative().min(18).max(100),
    ),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignupForm = () => {
  const [avatar, setAvatar] = useState(ProfileAvatar);
  const [submitting, setSubmitting] = useState(false);
  const [signupError, setSignupError] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = async (data) => {
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('file', data.picture[0]);
      formData.append('upload_preset', 'ml_default');

      const {
        data: { url },
      } = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_URL, formData);

      delete data.confirmPassword;

      data.picture = url;

      await dispatch(addUser(data));
      router.push('/users');
    } catch (error) {
      console.error(error);
      setSignupError('signup failed!');
      setTimeout(() => setSignupError(''), 5000);
    }

    setSubmitting(false);
  };

  return (
    <>
      <main className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <article className="bg-white shadow p-4 sm:p-7 rounded-xl mx-auto grid gap-5 w-[90vw] max-w-[40rem]">
          <header>
            <h1 className="text-3xl font-bold text-center mb-7">
              Get Onboard: Sign Up Here
            </h1>
          </header>

          <form
            onSubmit={handleSubmit(submit)}
            method="POST"
            action=""
            className="sm:grid sm:grid-cols-12 gap-2 sm:gap-6"
          >
            <span className="col-span-3 inline-block text-sm text-gray-800 mt-2.5 mb-2 sm:mb-0">
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
                  {...register('picture', {
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

              {errors.picture && (
                <span role="alert" className="text-red-500 text-sm">
                  {errors.picture.message}
                </span>
              )}
            </div>

            {signupForm.textFields.map((field) => (
              <Fragment key={field.name}>
                <label
                  htmlFor={field.name}
                  className="col-span-3 inline-block text-sm text-gray-800 mt-2.5 mb-2 sm:mb-0"
                >
                  {field.label}
                </label>

                <div className="sm:col-span-9">
                  <input
                    {...register(field.name)}
                    className={`py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-primary focus:ring-primary ${
                      field.type === 'number'
                        ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        : ''
                    }`}
                    placeholder={field.placeholder}
                    type={field.type}
                    aria-invalid={errors[field.name] ? 'true' : 'false'}
                  />
                  {errors[field.name] && (
                    <span role="alert" className="text-red-500 text-sm">
                      {errors[field.name]?.message ?? ''}
                    </span>
                  )}
                </div>
              </Fragment>
            ))}

            <span className="col-span-3 inline-block text-sm text-gray-800 mt-2.5">
              Gender
            </span>

            <div className="sm:col-span-9 sm:flex">
              {signupForm.genders.map((gender) => (
                <label
                  key={gender}
                  className="flex py-2 px-3 mb-2w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-primary focus:ring-primary"
                >
                  <input
                    {...register('gender')}
                    type="radio"
                    className="shrink-0 mt-0.5 border border-gray-200 rounded-full accent-primary pointer-events-none"
                    id={gender}
                    value={gender}
                  />

                  <span className="text-sm text-gray-500 ml-3 capitalize">
                    {gender}
                  </span>
                </label>
              ))}
            </div>

            <span className="col-span-3 inline-block text-sm text-gray-800 mt-2.5 mb-2 sm:mb-0">
              Role
            </span>

            <div className="sm:col-span-9 sm:flex">
              {signupForm.roles.map((role) => (
                <label
                  key={role}
                  className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-primary focus:ring-primary"
                >
                  <input
                    {...register('role')}
                    type="radio"
                    className="shrink-0 mt-0.5 border border-gray-200 rounded-full accent-primary pointer-events-none"
                    id={role}
                    value={role}
                  />

                  <span className="text-sm text-gray-500 ml-3 capitalize">
                    {role}
                  </span>
                </label>
              ))}
            </div>

            <label
              htmlFor="dob"
              className="col-span-3 inline-block text-sm text-gray-800 mt-2.5 mb-2 sm:mb-0"
            >
              Date of Birth
            </label>

            <div className="sm:col-span-9">
              <input
                {...register('dob')}
                type="date"
                className="py-2 px-3 pr-11 block w-full border border-gray-200 text-gray-500 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm uppercase tracking-widest"
              />

              {errors.dob && (
                <span role="alert" className="text-red-500 text-sm">
                  {errors.dob.message}
                </span>
              )}
            </div>

            <Button
              type={'submit'}
              loading={submitting}
              style="mx-auto col-span-12"
            >
              Create Account
            </Button>
          </form>

          <footer>
            <p className="text-center">
              Already have an account?
              <Link className="text-primary ml-2 underline" href={'/'}>
                Sign in here!
              </Link>
            </p>
          </footer>
        </article>

        {signupError && (
          <span role="alert" className="text-red-500 text-sm">
            {signupError}
          </span>
        )}
      </main>
    </>
  );
};

export default SignupForm;
