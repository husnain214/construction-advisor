import helpers from '@/helpers';
import Image from 'next/image';

const TheirMessage = ({ text, time, activeContact }) => {
  return (
    <div className="xs:mb-6 md:mb-5 flex">
      <div className="mr-4">
        <Image
          className="w-[36px] h-[36px] rounded-full object-cover"
          src={activeContact.picture}
          width={36}
          height={36}
          alt={activeContact.name + ' avatar'}
        />
      </div>
      <div className="flex items-end">
        <div className="group max-w-[500px] p-3 rounded-full rounded-tl-none transition duration-500 mr-4 bg-primary bg-opacity-10">
          <p
            className="text-sm font-normal leading-4 tracking-[0.16px] outline-none text-black "
            tabIndex={0}
          >
            {text}
          </p>
        </div>
        <div className="mr-4">
          <p className="outline-none text-xs text-black  font-light leading-4 tracking-[0.16px] whitespace-pre uppercase">
            {helpers.formatTime(time)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TheirMessage;
