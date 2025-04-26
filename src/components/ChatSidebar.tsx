
import React from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useChat } from '@/context/ChatContext';
import { cn } from '@/lib/utils';

const ChatSidebar = () => {
  const { chats, createNewChat, currentChatId, switchChat } = useChat();
  
  return (
    <Sidebar className="bg-[#202123] border-r border-[#4d4d4f]">
      <SidebarContent className="p-2 flex flex-col">
        <Button 
          className="w-full bg-transparent border border-white/20 hover:bg-white/10 transition-colors mb-2"
          onClick={createNewChat}
        >
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          New chat
        </Button>
        
        <div className="mt-4 space-y-1 overflow-y-auto flex-1">
          <SidebarMenu>
            {chats.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton 
                  onClick={() => switchChat(chat.id)}
                  className={cn(
                    "w-full text-left text-sm text-white/80 hover:bg-white/10",
                    currentChatId === chat.id && "bg-white/10"
                  )}
                >
                  {chat.title}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarTrigger className="absolute left-full top-4 bg-[#202123] text-white" />
    </Sidebar>
  );
};

export default ChatSidebar;
