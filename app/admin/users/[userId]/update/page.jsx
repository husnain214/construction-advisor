'use client';

import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserForm } from '@/constants';
import { Fragment, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BackButton, Button } from '@/components';
import { ProfileAvatar, UploadIcon } from '@/public';
import { UsersContext } from '@/context';
import userService from '@/services/userService';

const schema = z.object({
  picture: z.custom(),
  name: z.string().min(1).max(30),
  email: z.string().min(12).max(20).email(),
  phone: z.string().min(7).max(13),
  cnic: z.string().min(13).max(13),
  gender: z.string(),
  role: z.string(),
  dob: z.coerce.date().max(new Date()),
  age: z.preprocess(
    (arg) => parseInt(z.string().parse(arg)),
    z.number().nonnegative().min(18).max(100),
  ),
});

const UpdateUserForm = ({ params }) => {
  const [avatar, setAvatar] = useState(ProfileAvatar);
  const [submitting, setSubmitting] = useState(false);
  const [updateUserError, setUpdateError] = useState('');
  const router = useRouter();
  const { users, setUsers } = useContext(UsersContext);
  const { userId } = params;
  const user = users.filter((user) => user.id === userId)[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = async (data) => {
    console.log('update');
    setSubmitting(true);

    let pictureUrl = '';

    if (data.picture && data.picture.length > 0) {
      const formData = new FormData();
      formData.append('file', data.picture[0]);
      formData.append('upload_preset', 'ml_default');

      try {
        const { data: picture } = await axios.post(
          'https://api.cloudinary.com/v1_1/dyo9kvck4/image/upload',
          formData,
        );

        pictureUrl = picture.url;
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        setUpdateError('Image upload failed!');
        setTimeout(() => setUpdateError(''), 5000);
        setSubmitting(false);
        return;
      }
    } else {
      pictureUrl = user.picture;
    }

    const userData = {
      ...data,
      id: user.id,
      picture: pictureUrl,
    };

    try {
      const updatedUser = await userService.updateUser(userData);
      const newUsersList = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      );
      setUsers(newUsersList);
      router.push('/admin');
    } catch (error) {
      console.error('Error updating user:', error);
      setUpdateError('Update failed!');
      setTimeout(() => setUpdateError(''), 5000);
    }

    setSubmitting(false);
  };

  return (
    <>
      <BackButton />
      <main className="max-w-4xl mx-auto">
        <article className="bg-white shadow p-4 sm:p-7 rounded-xl mx-auto grid gap-5 w-[90vw] max-w-[40rem]">
          <header>
            <h1 className="text-3xl font-bold text-center mb-7">
              Update User Details
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
                src={user.picture}
                alt="Image Description"
                width={160}
                height={160}
              />

              <label className="py-2 px-3 relative cursor-pointer inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm">
                <UploadIcon className="text-primary" />
                Upload photo
                <input
                  {...register('picture', {
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

            {updateUserForm.textFields.map((field) => (
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
                    defaultValue={user[field.name]}
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
              {updateUserForm.genders.map((gender) => (
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
                    checked={user.gender === gender}
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
              {updateUserForm.roles.map((role) => (
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
                    checked={user.role === role}
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
                {...register('dob')}
                type="date"
                defaultValue={new Date(user.dob).toISOString().split('T')[0]}
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
              Update Account
            </Button>
          </form>
        </article>

        {updateUserError && (
          <span role="alert" className="text-red-500 text-sm">
            {updateUserError}
          </span>
        )}
      </main>
    </>
  );
};

export default UpdateUserForm;
