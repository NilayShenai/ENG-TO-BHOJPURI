
export type Role = 'user' | 'assistant' | 'system';

export type Message = {
  role: Role;
  content: string;
  timestamp: number;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
};

export type ApiResponse = {
  content: string;
  error?: string;
};
