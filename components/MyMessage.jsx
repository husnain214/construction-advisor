import helpers from '@/helpers';

const MyMessage = ({ text, time }) => {
  return (
    <div className="xs:mb-6 md:mb-5 flex justify-end">
      <div className="mr-4"></div>
      <div className="flex items-end">
        <div className="group max-w-[500px] p-3 rounded-full rounded-tr-none transition duration-500 ml-4 order-2 bg-primary">
          <p
            className="text-sm font-normal leading-4 tracking-[0.16px] outline-none text-white"
            tabIndex={0}
          >
            {text}
          </p>
        </div>
        <div className="ml-4 order-1">
          <p className="outline-none text-xs text-black  font-light leading-4 tracking-[0.16px] whitespace-pre uppercase">
            {helpers.formatTime(time)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyMessage;
