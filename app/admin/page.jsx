'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { UsersContext } from '@/context';

const AdminPage = () => {
  const { users } = useContext(UsersContext);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-7">Users List</h1>
      <div className="flex justify-around mt-12 font-semibold  text-sky-950 text-sm">
        <div className="">ID</div>
        <div className="">Name</div>
        <div className="">Role</div>
        <div className="">Avatar</div>
      </div>
      <div>
        {users.map((user) => (
          <Link
            href={`/admin/users/${user.id}`}
            key={user.id}
            className="flex justify-around font-semibold text-sm text-sky-950 bg-slate-200 py-5 mt-10 rounded-lg"
          >
            <span className="flex items-center uppercase">
              #{user.id.slice(0, 6)}...
            </span>
            <span className="flex items-center text-slate-500 text-xs">
              {user.name.slice(0, 20)}
            </span>
            <span className="flex items-center text-slate-500 text-xs capitalize">
              {user.role}
            </span>
            <div className="flex items-center">
              <Image
                className="rounded-[17px] aspect-square object-cover"
                alt={`${user.name} avatar`}
                src={user.picture}
                height={30}
                width={30}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
