
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { Textarea } from '@/components/ui/textarea';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [message]);

  return (
    <div className="border-t border-white/20 bg-[#343541] p-4">
      <form 
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto relative"
      >
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full resize-none bg-[#40414f] rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-primary text-white min-h-[52px] max-h-[200px]"
          placeholder="Send a message..."
          rows={1}
        />
        <Button 
          type="submit"
          className="absolute right-2 bottom-2 p-1 hover:bg-[#202123] bg-transparent text-gray-400 hover:text-white"
          disabled={!message.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
      <div className="text-center text-xs text-gray-400 mt-2">
        ChatGPT Clone. Messages are not processed by AI.
      </div>
    </div>
  );
};

export default ChatInput;
