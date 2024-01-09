import { CrossIcon, SearchIcon } from '@/public';
import { ContactCard } from '.';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const ChatAside = ({
  setActiveContact,
  activeContact,
  asideVisible,
  setAsideVisible,
}) => {
  const [filter, setFilter] = useState('');
  const contacts = useSelector((state) => state.contacts);
  const filteredContacts = filter
    ? contacts.filter((contact) => contact.name.includes(filter))
    : contacts;

  return (
    <aside
      className={`col-start-1 sm:col-start-auto col-end-1 sm:col-end-auto row-start-1 sm:row-start-auto row-end-1 sm:row-end-auto z-20 sm:translate-x-0 ${
        asideVisible ? '' : '-translate-x-full'
      } xs:w-full md:w-[350px] h-full bg-gray-50 xs:px-5 md:p-0 flex flex-col overflow-visible transition-all duration-500 xs:grow-1 md:grow-0 xs:overflow-y-scroll md:overflow-visible scrollbar-hidden`}
    >
      <button
        className="absolute z-10 right-5 top-5 block sm:hidden"
        onClick={() => setAsideVisible(false)}
      >
        <CrossIcon className={'w-10'} />
      </button>

      <div className="h-full flex flex-col">
        <p className=" px-5 py-6 text-black text-xl leading-4 tracking-[0.16px] outline-none font-bold">
          Messages
        </p>

        <div className="mx-5 xs:mb-6 md:mb-5 flex justify-between items-center rounded-sm bg-primary bg-opacity-10 focus-within:outline-none focus-within:ring focus-within:ring-primary focus-within:ring-opacity-20 focus-within:bg-white duration-200 transition ease-out">
          <SearchIcon
            height={16}
            width={16}
            className="m-2 bg-transparent opacity-30"
          />
          <input
            type="text"
            placeholder="Search.."
            value={filter}
            onChange={({ target }) => setFilter(target.value)}
            className="w-full h-8 py-4 px-3 bg-transparent outline-none text-black opacity-70 placeholder:text-black placeholder:opacity-60 duration-200 transition ease-out text-opacity-70 border-none"
          />
        </div>
        <div className="w-full h-full scroll-smooth overflow-x-hidden">
          <div className="select-none" role="listitem">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                isActive={activeContact?.id === contact.id}
                onClick={() => setActiveContact(contact)}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatAside;
