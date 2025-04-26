
import React, { createContext, useState, useContext } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
};

type ChatContextType = {
  chats: Chat[];
  currentChatId: string | null;
  createNewChat: () => void;
  sendMessage: (content: string) => void;
  getCurrentChat: () => Chat | undefined;
  switchChat: (chatId: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>(() => {
    const savedChats = localStorage.getItem('chats');
    return savedChats ? JSON.parse(savedChats) : [];
  });
  const [currentChatId, setCurrentChatId] = useState<string | null>(() => {
    const savedCurrentChatId = localStorage.getItem('currentChatId');
    return savedCurrentChatId || null;
  });

  // Save chats to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  // Save currentChatId to localStorage whenever it changes
  React.useEffect(() => {
    if (currentChatId) {
      localStorage.setItem('currentChatId', currentChatId);
    }
  }, [currentChatId]);

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: Chat = {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
    };
    
    setChats(prevChats => [newChat, ...prevChats]);
    setCurrentChatId(newChatId);
  };

  const switchChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const sendMessage = async (content: string) => {
    if (!currentChatId) {
      createNewChat();
      setTimeout(() => sendMessage(content), 0);
      return;
    }
    const timestamp = Date.now();
    // Add user message immediately
    setChats(currentChats => {
      return currentChats.map(chat => {
        if (chat.id === currentChatId) {
          const userMessage: Message = {
            role: 'user',
            content,
            timestamp,
          };
          const updatedChat = {
            ...chat,
            messages: [...chat.messages, userMessage],
            title: chat.messages.length === 0 ? content.slice(0, 30) + (content.length > 30 ? '...' : '') : chat.title,
          };
          return updatedChat;
        }
        return chat;
      });
    });
    // Send to backend and add assistant message
    try {
      const response = await fetch('http://localhost:5001/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });
      const data = await response.json();
      const translation = data.translation || (data.error ? `Error: ${data.error}` : 'No response');
      setChats(currentChats => {
        return currentChats.map(chat => {
          if (chat.id === currentChatId) {
            const aiMessage: Message = {
              role: 'assistant',
              content: translation,
              timestamp: Date.now(),
            };
            return {
              ...chat,
              messages: [...chat.messages, aiMessage],
            };
          }
          return chat;
        });
      });
    } catch (err) {
      setChats(currentChats => {
        return currentChats.map(chat => {
          if (chat.id === currentChatId) {
            const aiMessage: Message = {
              role: 'assistant',
              content: `Error: ${err}`,
              timestamp: Date.now(),
            };
            return {
              ...chat,
              messages: [...chat.messages, aiMessage],
            };
          }
          return chat;
        });
      });
    }
  };


  // Removed addMessageToCurrentChat. All logic is now in sendMessage.

  const getCurrentChat = () => {
    return chats.find(chat => chat.id === currentChatId);
  };

  return (
    <ChatContext.Provider 
      value={{ 
        chats, 
        currentChatId, 
        createNewChat, 
        sendMessage,
        getCurrentChat,
        switchChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
