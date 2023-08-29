import { navLinks } from '@/constants';
import { ProfilePicture } from '@/public';
import { styles } from '@/styles';
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
    <aside className="bg-gray-100 grid content-start grid-rows-[auto_1fr] pl-10 pr-4 py-10">
      <div className="grid grid-cols-[auto_1fr] gap-x-2">
        <Image
          className="row-span-2 rounded-[17px] border border-green-700"
          src={ProfilePicture}
          alt={`${user.name}'s picture`}
        />

        <span className="font-bold text-lg">{user.name}</span>
        <span className="text-gray-500">@{user.username}</span>
      </div>

      <nav className="grid mt-10">
        <ul className="flex flex-col align-start gap-4">
          {navLinks.map(({ name, href, Icon }) => (
            <li
              key={name}
              className={`${href === active ? styles.activeLink : ''} ${
                href === '/login' ? 'mt-auto' : ''
              }`}
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
    </aside>
  );
};

export default Navbar;
