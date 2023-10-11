import { navLinks } from '@/constants';
import { ProfilePicture } from '@/public';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const user = {
    name: 'Barbara Gordon',
    picture: ProfilePicture,
    username: 'igaspar',
  };

  const active = '/general';

  return (
    <div className="bg-gray-100 grid content-start grid-rows-[auto_1fr] pl-10 pr-10 py-10 sticky top-0 max-h-[100vh]">
      <header className="grid grid-cols-[auto_1fr] gap-x-4">
        <Image
          className="row-span-2 rounded-[17px] border border-green-700"
          src={ProfilePicture}
          alt={`${user.name}'s picture`}
        />

        <span className="font-bold text-lg">{user.name}</span>
        <span className="text-gray-500">@{user.username}</span>
      </header>

      <nav className="grid mt-10">
        <ul className="flex flex-col align-start gap-4">
          {navLinks.map(({ name, href, Icon }) => (
            <li
              key={name}
              className={`font-medium ${
                href === active
                  ? 'relative py-1 before:absolute before:inset-0 before:-left-5 before:bg-primary before:h-[120%] before:w-1.5 before:rounded-full'
                  : ''
              } ${href === '/login' ? 'mt-auto' : ''}`}
            >
              <Link
                href={href}
                className={`text-md flex justify-start items-center gap-2 capitalize ${
                  active === href ? 'text-black' : 'text-gray-600'
                } hover:text-black transition-colors`}
              >
                <Icon height="25" width="25" />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
