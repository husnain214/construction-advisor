import { SearchIcon } from '@/public';
import Image from 'next/image';

const ChatWindowHeader = ({ activeContact }) => {
  if (!activeContact) return;

  return (
    <div className="w-full min-h-[84px] px-5 py-6 border-b-2 border-gray-100">
      <div className="w-full flex justify-center items-center">
        <div className="flex grow">
          <div className="mr-5">
            <Image
              className="w-[36px] h-[36px] rounded-full object-cover"
              src={activeContact.picture}
              width={36}
              height={36}
              alt={activeContact.name + ' avatar'}
            />
          </div>

          <div className="flex flex-col">
            <p className="outline-none text-sm text-black  font-semibold leading-4 tracking-[0.16px] mb-2 default-outline">
              {activeContact.name}
            </p>
            <p className="outline-none text-sm text-black leading-4 tracking-[0.16px] font-light">
              Last seen Dec 16, 2019
            </p>
          </div>
        </div>
        <div className="flex">
          <button
            className="flex justify-center items-center outline-none rounded-full focus:outline-none transition-all duration-200 focus:bg-primary hover:bg-primary hover:bg-opacity-5 w-7 h-7 mr-3"
            title="search messages"
            aria-label="search messages"
          >
            <SearchIcon height={20} width={20} className="opacity-30" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindowHeader;
