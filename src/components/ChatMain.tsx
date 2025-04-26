
import React, { useEffect } from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { useChat } from '@/context/ChatContext';

const ChatMain = () => {
  const { chats, createNewChat } = useChat();

  // If no chats exist, create one when component mounts
  useEffect(() => {
    if (chats.length === 0) {
      createNewChat();
    }
  }, []);

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      <ChatMessages />
      <ChatInput />
    </main>
  );
};

export default ChatMain;
