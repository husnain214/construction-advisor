import Image from 'next/image';

const ChatWindowHeader = ({ activeContact }) => {
  if (!activeContact) return;

  return (
    <div className="w-full min-h-[84px] px-5 py-6 border-b-2 border-gray-100">
      <div className="w-full flex justify-center items-center">
        <div className="flex grow items-center">
          <div className="mr-5">
            <Image
              className="w-[36px] h-[36px] rounded-full object-cover"
              src={activeContact.picture}
              width={36}
              height={36}
              alt={activeContact.name + ' avatar'}
            />
          </div>

          <p className="outline-none text-md text-black  font-semibold leading-4 tracking-[0.16px] mb-2 default-outline">
            {activeContact.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWindowHeader;
