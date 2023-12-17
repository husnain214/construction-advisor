import { useDispatch, useSelector } from 'react-redux';
import { ChatPromptPanel, ChatWindowHeader, MyMessage } from '.';
import TheirMessage from './TheirMessage';
import { useEffect, useRef } from 'react';
import { addMessage } from '@/redux/reducers/userReducer';
import { pusherClient } from '@/libs/pusher';

const ChatWindow = ({ activeContact, messages }) => {
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
      <div className="grid place-items-center h-full">
        <p className="margin-auto text-slate-400 font-bold tracking-wider">
          No conversation to show here
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col scrollbar-hidden">
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
