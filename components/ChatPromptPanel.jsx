import { SendIcon } from '@/public';
import chatService from '@/services/chatService';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ChatPromptPanel = ({ activeContact }) => {
  const [newMessage, setNewMessage] = useState('');
  const user = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const message = {
      senderId: user.id,
      receiverId: activeContact.id,
      text: newMessage,
      createdAt: new Date().toJSON(),
    };

    await chatService.createMessage(message);

    setNewMessage('');
  };

  return (
    <form
      action=""
      method="post"
      onSubmit={handleSubmit}
      className="h-auto min-h-[84px] p-5 flex items-center"
    >
      <textarea
        className="grow md:mr-5 xs:mr-4 self-end px-5 py-3 rounded-sm content-center outline-none text-sm placeholder:text-black placeholder:opacity-40 text-opacity-70 focus:outline-none transition duration-200 ease-out text-black bg-primary bg-opacity-20 border-opacity-0 max-h-[80px] pr-[50px] resize-none scrollbar-hidden"
        cols={30}
        rows={1}
        placeholder="Write your message here"
        aria-label="Write your message here"
        value={newMessage}
        onChange={({ target }) => setNewMessage(target.value)}
      />
      <button
        className="group flex justify-center items-center outline-none rounded-full focus:outline-none transition-all duration-200 group w-7 h-7 text-white bg-primary hover:bg-opacity-70 active:bg-opacity-70 active:scale-110"
        title="send message"
        aria-label="send message"
        type="submit"
      >
        <SendIcon height={17} width={17} />
      </button>
    </form>
  );
};

export default ChatPromptPanel;
