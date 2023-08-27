'use client';

import Image, { StaticImageData } from 'next/image';
import { ProfileAvatar, UploadIcon } from '../../public';
import { useState } from 'react';
import Link from 'next/link';

const SignupForm = () => {
  const [avatar, setAvatar] = useState<string | StaticImageData>(ProfileAvatar);

  return (
    <>
      <main className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="bg-white shadow p-4 sm:p-7 dark:bg-slate-900 rounded-xl mx-auto grid gap-5 w-[90vw] max-w-[40rem]">
          <header>
            <h1 className="text-3xl font-bold text-center mb-7">
              Get Onboard: Sign Up Here
            </h1>
          </header>

          <form>
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
              <div className="sm:col-span-3">
                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  Profile photo
                </label>
              </div>
              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <Image
                    className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                    src={avatar}
                    alt="Image Description"
                    width={160}
                    height={160}
                  />
                  <div className="flex gap-x-2">
                    <div>
                      <label
                        htmlFor="profile-avatar"
                        className="py-2 px-3 cursor-pointer inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      >
                        <UploadIcon className="text-primary" />
                        Upload photo
                        <input
                          onChange={({ target }) =>
                            target.files &&
                            setAvatar(URL.createObjectURL(target.files[0]))
                          }
                          type="file"
                          name="profile-avatar"
                          id="profile-avatar"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="full-name"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  Full name
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="full-name"
                  name="fullname"
                  type="text"
                  className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Maria Boone"
                />
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  Email
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm text-sm rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="maria@site.com"
                />
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  Password
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="password"
                  type="text"
                  className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Enter current password"
                />
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="confirm-password"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  Confirm Password
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="text"
                  className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Enter password"
                />
              </div>
              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="phone-number"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                  >
                    Phone
                  </label>
                </div>
              </div>
              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="text"
                    className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="+92xxxxxxxxxx"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="cnic-number"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                  >
                    CNIC
                  </label>
                </div>
              </div>
              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="cnic-number"
                    name="cnic-number"
                    type="text"
                    className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="xxxxxxxxxxxx"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="gender"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  Gender
                </label>
              </div>
              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <label
                    htmlFor="male"
                    className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  >
                    <input
                      type="radio"
                      name="gender"
                      className="shrink-0 mt-0.5 border border-gray-200 rounded-full accent-primary pointer-events-none"
                      id="male"
                      defaultChecked
                    />
                    <span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
                      Male
                    </span>
                  </label>
                  <label
                    htmlFor="female"
                    className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  >
                    <input
                      type="radio"
                      name="gender"
                      className="shrink-0 mt-0.5 border border-gray-200 rounded-full accent-primary pointer-events-none"
                      id="female"
                    />
                    <span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
                      Female
                    </span>
                  </label>
                  <label
                    htmlFor="other"
                    className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  >
                    <input
                      type="radio"
                      name="gender"
                      className="shrink-0 mt-0.5 border border-gray-200 rounded-full accent-primary pointer-events-none"
                      id="other"
                    />
                    <span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
                      Other
                    </span>
                  </label>
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="date-of-birth"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                  >
                    Date of Birth
                  </label>
                </div>
              </div>
              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="date-of-birth"
                    name="date-of-birth"
                    type="date"
                    className="py-2 px-3 pr-11 block w-full border border-gray-200 text-gray-500 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm uppercase tracking-widest"
                  />
                </div>
              </div>

              <button
                type="button"
                className="bg-primary hover:bg-red-400 active:scale-95 transition-all text-white rounded-full py-3 px-6 col-span-12 mx-auto"
              >
                Create Account
              </button>
            </div>
          </form>

          <footer>
            <p className="text-center">
              Already have an account?
              <Link className="text-primary ml-2 underline" href={'/login'}>
                Sign in here!
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default SignupForm;
