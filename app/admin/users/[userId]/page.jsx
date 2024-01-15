'use client';

import { useContext } from 'react';
import { UsersContext } from '@/context';
import Link from 'next/link';
import { BackButton } from '@/components';
import Image from 'next/image';

const UserPage = ({ params }) => {
  const { userId } = params;
  const { users } = useContext(UsersContext);
  const user = users.filter((user) => user.id === userId)[0];

  return (
    <>
      <BackButton />

      <Link
        href={`/admin/users/${user.id}/update`}
        className={
          'bg-primary hover:bg-red-400 transition-all text-white rounded-full py-3 px-6 my-5 grid place-content-center self-start justify-self-start'
        }
      >
        Update
      </Link>

      <Image
        className="inline-block h-16 w-16 rounded-full ring-2 ring-white"
        src={user.picture}
        alt="Image Description"
        width={160}
        height={160}
      />

      <h2 className="text-md font-bold my-3">ID:</h2>
      <p>{user.id}</p>

      <h2 className="text-md font-bold my-3">Name:</h2>
      <p className="capitalize">{user.name}</p>

      <h2 className="text-md font-bold my-3">Age:</h2>
      <p>{user.age}</p>

      <h2 className="text-md font-bold my-3">Email:</h2>
      <p>{user.email}</p>

      <h2 className="text-md font-bold my-3">Gender:</h2>
      <p className="capitalize">{user.gender}</p>

      <h2 className="text-md font-bold my-3">CNIC:</h2>
      <p>{user.cnic}</p>

      <h2 className="text-md font-bold my-3">Role:</h2>
      <p className="capitalize">{user.role}</p>

      <h2 className="text-md font-bold my-3">Date of Birth:</h2>
      <p>{user.dob?.split('T')[0]}</p>

      <h2 className="text-md font-bold my-3">Phone Number:</h2>
      <p>{user.phone}</p>
    </>
  );
};

export default UserPage;
