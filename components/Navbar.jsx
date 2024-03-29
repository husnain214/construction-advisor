'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/reducers/userReducer';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LogoutIcon,
  BriefcaseIcon,
  CalculatorIcon,
  EnvelopeIcon,
  HomeIcon,
  UserIcon,
  DollarIcon,
  MultipleUserIcon,
  CrossIcon,
  SearchIcon,
} from '@/public';

const Navbar = ({ navVisible, setNavVisible }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const pathname = usePathname();

  const userLinks = [
    {
      name: 'General',
      href: `/users/${user.role}`,
      Icon: HomeIcon,
    },
    {
      name: 'Calculator',
      href: '/users/CalculatorPage',
      Icon: CalculatorIcon,
    },
    {
      name: 'Messages',
      href: '/users/ChatPage',
      Icon: EnvelopeIcon,
    },
    {
      name: 'Account',
      href: '/users/AccountPage',
      Icon: UserIcon,
    },
    {
      name: 'Jobs',
      href: `/users/${user.role}/JobPosts`,
      Icon: BriefcaseIcon,
    },
    {
      name: 'Shahid',
      href: `/users/${user.role}/JobPosts`,
      Icon: BriefcaseIcon,
    },
    {
      name: 'Search Vendors',
      href: '/users/VendorsPage',
      Icon: SearchIcon,
    },
  ];

  const adminLinks = [
    {
      name: 'Users',
      href: '/admin',
      Icon: MultipleUserIcon,
    },
    {
      name: 'Jobs',
      href: '/admin/jobs',
      Icon: BriefcaseIcon,
    },
    {
      name: 'Bids',
      href: '/admin/bids',
      Icon: DollarIcon,
    },
    {
      name: 'Account',
      href: '/users/AccountPage',
      Icon: UserIcon,
    },
  ];

  const navLinks = user.role === 'admin' ? adminLinks : userLinks;

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      router.push('/');
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div
      className={`col-start-1 md:col-start-auto col-end-1 md:col-end-auto row-start-1 md:row-start-auto row-end-1 md:row-end-auto z-20 md:translate-x-0 ${
        navVisible ? '' : '-translate-x-full'
      } bg-gray-100 grid content-start grid-rows-[auto_1fr] pl-10 pr-10 py-10 sticky top-0 max-h-screen transition-all duration-500`}
    >
      <button
        className="absolute z-10 right-5 top-5 block md:hidden"
        onClick={() => setNavVisible(false)}
      >
        <CrossIcon className={'w-10'} />
      </button>

      <header className="grid grid-cols-[auto_1fr] items-center gap-x-4">
        <Image
          className="rounded-[17px] aspect-square object-cover"
          src={user.picture}
          alt={`${user.name}'s picture`}
          width={55}
          height={55}
          priority={true}
        />

        <span className="font-bold text-lg">{user.name}</span>
      </header>

      <nav className="grid mt-10 font-[500]">
        <ul className="flex flex-col align-start gap-5">
          {navLinks.map(({ name, href, Icon }) => {
            return (
              <li
                key={name}
                className={`font-medium ${
                  href === pathname
                    ? 'relative py-1 before:absolute before:inset-0 before:-left-5 before:bg-primary before:h-[120%] before:w-1.5 before:rounded-full'
                    : ''
                }`}
              >
                <Link
                  onClick={() => setNavVisible(false)}
                  href={href}
                  className={`text-md flex justify-start items-center gap-2 capitalize ${
                    pathname === href ? 'text-black' : 'text-gray-600'
                  } hover:text-black transition-colors`}
                >
                  <Icon height="25" width="25" />
                  {name}
                </Link>
              </li>
            );
          })}
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
