'use client';

import Image from 'next/image';
import { ProfileAvatar, UploadIcon } from '../../public';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupForm } from '@/constants';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { addUser } from '@/redux/reducers/userReducer';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const schema = z
  .object({
    profileAvatar: z.custom().refine((data) => data.length > 0, {
      message: 'Profile picture is required',
    }),
    fullname: z.string().min(1).max(30),
    email: z.string().min(1).email(),
    password: z.string().min(5).max(20),
    confirmPassword: z.string().min(5).max(20),
    phoneNumber: z.string().min(9).max(13),
    cnicNumber: z.string().min(9).max(13),
    gender: z.string(),
    role: z.string(),
    dateOfBirth: z.coerce.date().max(new Date()),
    age: z.preprocess(
      (arg) => parseInt(z.string().parse(arg)),
      z.number().nonnegative().min(18),
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
    const formData = new FormData();
    formData.append('file', data.profileAvatar[0]);
    formData.append('upload_preset', 'ml_default');
    const { data: picture } = await axios.post(
      'https://api.cloudinary.com/v1_1/dyo9kvck4/image/upload',
      formData,
    );
    const userData = {
      email: data.email,
      password: data.password,
      name: data.fullname,
      age: data.age,
      gender: data.gender,
      dob: data.dateOfBirth,
      cnic: data.cnicNumber,
      phone: data.phoneNumber,
      picture: picture.url,
      role: data.role,
    };
    try {
      await dispatch(addUser(userData));
      router.push('/users/login');
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

            {signupForm.textFields.map((field) => (
              <Fragment key={field.name}>
                <label
                  htmlFor={field.name}
                  className="sm:col-span-3 inline-block text-sm text-gray-800 mt-2.5"
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

            <span className="sm:col-span-3 inline-block text-sm text-gray-800 mt-2.5">
              Gender
            </span>

            <div className="sm:col-span-9 sm:flex">
              {signupForm.genders.map((gender) => (
                <label
                  key={gender}
                  className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-primary focus:ring-primary"
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

            <span className="sm:col-span-3 inline-block text-sm text-gray-800 mt-2.5">
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
              htmlFor="dateOfBirth"
              className="sm:col-span-3 inline-block text-sm text-gray-800 mt-2.5"
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
              className="bg-primary hover:bg-red-400 transition-all text-white rounded-full py-3 px-6 col-span-12 mx-auto flex justify-center items-center gap-3"
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
              Create Account
            </button>
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
