'use client';

import { ChatAside, ChatWindow } from '@/components';
import { initializeContacts } from '@/redux/reducers/contactReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChatPage = () => {
  const dispatch = useDispatch();
  const [activeContact, setActiveContact] = useState(null);
  const [asideVisible, setAsideVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const sentMessages = user.sentMessages.filter(
      (message) => message.receiverId === activeContact?.id,
    );

    const receivedMessages = user.receivedMessages.filter(
      (message) => message.senderId === activeContact?.id,
    );

    const allMessages = [...receivedMessages, ...sentMessages].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );

    setMessages(allMessages);
  }, [user, activeContact]);

  useEffect(() => {
    dispatch(initializeContacts());
  }, [dispatch]);

  return (
    <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-[auto_1fr] grid-rows-[100vh]">
      <ChatAside
        activeContact={activeContact}
        setActiveContact={setActiveContact}
        asideVisible={asideVisible}
        setAsideVisible={setAsideVisible}
      />
      <ChatWindow
        setAsideVisible={setAsideVisible}
        asideVisible={asideVisible}
        activeContact={activeContact}
        messages={messages}
      />
    </div>
  );
};

export default ChatPage;
