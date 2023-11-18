'use client';

import { navLinks } from '@/constants';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/reducers/userReducer';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoutIcon } from '@/public';

const Navbar = () => {
  const loggedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 grid content-start grid-rows-[auto_1fr] pl-10 pr-10 py-10 sticky top-0 max-h-[100vh]">
      <header className="grid grid-cols-[auto_1fr] items-center gap-x-4">
        <Image
          className="rounded-[17px]"
          src={loggedUser.picture}
          alt={`${loggedUser.name}'s picture`}
          width={55}
          height={55}
        />

        <span className="font-bold text-lg">{loggedUser.name}</span>
      </header>

      <nav className="grid mt-10 font-[500]">
        <ul className="flex flex-col align-start gap-5">
          {navLinks.map(({ name, href, Icon }) => (
            <li
              key={name}
              className={`font-medium ${
                href === pathname
                  ? 'relative py-1 before:absolute before:inset-0 before:-left-5 before:bg-primary before:h-[120%] before:w-1.5 before:rounded-full'
                  : ''
              } ${href === '/login' ? 'mt-auto' : ''}`}
            >
              <Link
                href={href}
                className={`text-md flex justify-start items-center gap-2 capitalize ${
                  pathname === href ? 'text-black' : 'text-gray-600'
                } hover:text-black transition-colors`}
              >
                <Icon height="25" width="25" />
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={handleLogout}
          className="text-md flex justify-start items-center self-end gap-2 capitalize text-gray-600 hover:text-black transition-colors"
        >
          <LogoutIcon height="25" width="25" />
          Log out
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
