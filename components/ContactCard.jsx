import helpers from '@/helpers';
import { useSelector } from 'react-redux';

const ContactCard = ({ contact, onClick, isActive }) => {
  const user = useSelector((state) => state.user);
  const { id, picture, name } = contact;
  const sentMessages = user.sentMessages.filter(
    (message) => message.receiverId === id,
  );

  const receivedMessages = user.receivedMessages.filter(
    (message) => message.senderId === id,
  );

  const { text, createdAt } = [...receivedMessages, ...sentMessages]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .at(-1);
  return (
    <>
      <button
        onClick={onClick}
        aria-label="conversation with Dylan Billy"
        tabIndex={0}
        className={`w-full h-[92px] px-5 py-6 flex ${
          isActive
            ? 'bg-primary bg-opacity-30 text-white duration-200'
            : 'hover:bg-primary hover:bg-opacity-10 duration-500'
        } focus:outline-none transition ease-out`}
      >
        <div className="mr-4">
          <div
            style={{
              backgroundImage: `url(${picture})`,
            }}
            className="w-7 h-7 rounded-full bg-cover bg-center"
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full">
            <div className="flex items-start">
              <div className="grow mb-4 text-start">
                <p className="outline-none text-sm text-black font-semibold leading-4 tracking-[0.16px]">
                  {name}
                </p>
              </div>
              <p className="outline-none text-xs text-black font-light leading-4 tracking-[0.16px] uppercase">
                {helpers.formatTime(createdAt)}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="outline-none text-sm text-black font-normal leading-4 tracking-[0.16px] flex justify-start items-center">
                <span className="">{text}</span>
              </p>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

export default ContactCard;
