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

      <Link href={`/admin/users/${user.id}/update`}>Update</Link>

      <Image
        className="inline-block h-16 w-16 rounded-full ring-2 ring-white"
        src={user.picture}
        alt="Image Description"
        width={160}
        height={160}
      />
      <div className="">ID</div>
      {user.id}
      <div className="">Name</div>
      {user.name}
      <div className="">Age</div>
      {user.age}
      <div className="">Gender</div>
      {user.gender}
    </>
  );
};

export default UserPage;
