
import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatMain from './ChatMain';
import { SidebarProvider } from '@/components/ui/sidebar';

const ChatLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#343541] text-white">
        <ChatSidebar />
        <ChatMain />
      </div>
    </SidebarProvider>
  );
};

export default ChatLayout;
