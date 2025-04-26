
import React, { useRef, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';

const ChatMessages = () => {
  const { getCurrentChat } = useChat();
  const currentChat = getCurrentChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChat?.messages]);

  // If no active chat, show welcome screen
  if (!currentChat || currentChat.messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-8 bg-[#343541]">
        <h1 className="text-4xl font-bold mb-8 text-center">ChatGPT</h1>
        <div className="max-w-lg text-center text-gray-400">
          <p>This is a ChatGPT UI clone with functional chat interface.</p>
          <p className="mt-4">Start a conversation or create a new chat using the sidebar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {currentChat.messages.map((message, index) => (
        <div
          key={index}
          className={`p-6 ${
            message.role === 'assistant' ? 'bg-[#444654]' : 'bg-[#343541]'
          }`}
        >
          <div className="max-w-3xl mx-auto flex gap-6">
            <div className={`w-8 h-8 rounded-sm ${
              message.role === 'assistant' ? 'bg-[#10a37f]' : 'bg-[#5436DA]'
            } flex items-center justify-center text-white font-medium`}>
              {message.role === 'assistant' ? 'AI' : 'U'}
            </div>
            <div className="flex-1 whitespace-pre-wrap">{message.content}</div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
