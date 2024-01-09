import { useDispatch, useSelector } from 'react-redux';
import { ChatPromptPanel, ChatWindowHeader, MyMessage } from '.';
import TheirMessage from './TheirMessage';
import { useEffect, useRef } from 'react';
import { addMessage } from '@/redux/reducers/userReducer';
import { pusherClient } from '@/libs/pusher';

const ChatWindow = ({ activeContact, messages, setAsideVisible }) => {
  const user = useSelector((state) => state.user);
  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    pusherClient.subscribe('chat');
    pusherClient.bind('send-message', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      pusherClient.unsubscribe('chat');
      pusherClient.unbind('send-message');
    };
  }, [dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!activeContact) {
    return (
      <div className="grid place-items-center h-full col-start-1 sm:col-start-auto col-end-1 sm:col-end-auto row-start-1 sm:row-start-auto row-end-1 sm:row-end-auto">
        <button
          className="self-start mt-5 z-10 left-5 top-5 block sm:hidden bg-primary bg-opacity-25 py-2 px-5 rounded-full tracking-wider font-bold border-2 border-primary border-opacity-40 text-xl"
          onClick={() => setAsideVisible(true)}
        >
          Chats
        </button>
        <p className="margin-auto text-slate-400 font-bold tracking-wider">
          No conversation to show here
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col scrollbar-hidden">
      <button
        className="absolute z-10 left-5 top-5 block sm:hidden"
        onClick={() => setAsideVisible(true)}
      >
        Contacts
      </button>
      <ChatWindowHeader activeContact={activeContact} />
      <div
        className="grow px-5 py-5 flex flex-col overflow-y-scroll scrollbar-hidden"
        ref={scrollRef}
      >
        {messages.map(({ senderId, text, createdAt }, index) =>
          senderId === user.id ? (
            <MyMessage key={index} text={text} time={createdAt} />
          ) : (
            <TheirMessage
              key={index}
              text={text}
              time={createdAt}
              activeContact={activeContact}
            />
          ),
        )}
      </div>
      <ChatPromptPanel activeContact={activeContact} />
    </div>
  );
};

export default ChatWindow;
